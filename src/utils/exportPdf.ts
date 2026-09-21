import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export type ExportPdfMode = 'smart' | 'single-page';

/**
 * Exports the resume element to a downloadable PDF with clickable links.
 *
 * Features:
 *  1. Smart Page Breaks: Scans the DOM for headings, cards, project/job entries,
 *     and paragraphs to pick natural break points between elements — NEVER
 *     slicing text lines or cards in half.
 *  2. Fit to 1 Page mode: Proportionally fits the entire resume onto a single
 *     A4 page without any page breaks.
 *  3. Clickable Link Annotations: Overlays invisible clickable links on each page
 *     with exact per-page coordinate mapping.
 *  4. High-resolution 3× pixel ratio for crisp text and graphics.
 */
export async function exportResumeToPdf(
  elementId: string,
  filename: string = 'Resume.pdf',
  mode: ExportPdfMode = 'smart'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[PDF Export] Element #${elementId} not found.`);
    alert('Resume preview not found. Please make sure the preview panel is visible.');
    return false;
  }

  // Find the zoom transform wrapper (parent of the element) to temporarily reset scale
  const zoomWrapper = element.parentElement;
  let savedTransform = '';
  if (zoomWrapper && zoomWrapper.style.transform) {
    savedTransform = zoomWrapper.style.transform;
    zoomWrapper.style.transform = 'none';
  }

  try {
    // ── 1. Measure dimensions at 100% scale ──────────────────────────────
    const captureWidth = element.scrollWidth;
    const captureHeight = element.scrollHeight;

    // Detect background color of the element
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)'
      ? computedStyle.backgroundColor
      : '#ffffff';

    // ── 2. Collect all link positions BEFORE snapshot ───────────────────
    const linkData = collectLinkPositions(element);

    // ── 3. Find smart break points in DOM if in smart mode ───────────────
    // A4 aspect ratio: height = width * (297 / 210) ≈ width * 1.4143
    const a4PageHeightPx = captureWidth * (297 / 210);

    let breakPoints: number[];
    if (mode === 'single-page' || captureHeight <= a4PageHeightPx * 1.05) {
      // Fit entirely on 1 page
      breakPoints = [0, captureHeight];
    } else {
      // Multi-page with smart boundary detection
      breakPoints = findSmartBreakPoints(element, a4PageHeightPx);
    }

    // ── 4. Snapshot the element as high-res PNG ─────────────────────────
    const dataUrl = await toPng(element, {
      pixelRatio: 3,
      backgroundColor: bgColor,
      width: captureWidth,
      height: captureHeight,
      style: {
        transform: 'none',
        borderRadius: '0',
        boxShadow: 'none',
        filter: 'none',
        backdropFilter: 'none',
      },
    });

    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('html-to-image returned an empty image.');
    }

    // Load full image into an HTML canvas for precision slicing
    const fullImg = await loadImage(dataUrl);
    const fullCanvas = document.createElement('canvas');
    fullCanvas.width = fullImg.naturalWidth;
    fullCanvas.height = fullImg.naturalHeight;
    const fullCtx = fullCanvas.getContext('2d');
    if (!fullCtx) throw new Error('Canvas 2D context unavailable.');
    fullCtx.drawImage(fullImg, 0, 0);

    const pxRatio = fullCanvas.width / captureWidth;

    // ── 5. Build PDF ────────────────────────────────────────────────────
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfH = pdf.internal.pageSize.getHeight();  // 297 mm
    const numPages = breakPoints.length - 1;

    // Margin for multi-page continuation pages (top padding in mm)
    const continuationTopMarginMm = 8;

    for (let i = 0; i < numPages; i++) {
      if (i > 0) pdf.addPage();

      const startY = breakPoints[i];
      const endY = breakPoints[i + 1];
      const sliceHeightPx = endY - startY;

      // Slice portion for this page
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = fullCanvas.width;
      pageCanvas.height = Math.max(1, Math.round(sliceHeightPx * pxRatio));
      const pageCtx = pageCanvas.getContext('2d');

      if (pageCtx) {
        pageCtx.fillStyle = bgColor;
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          fullCanvas,
          0, Math.round(startY * pxRatio),
          fullCanvas.width, Math.round(sliceHeightPx * pxRatio),
          0, 0,
          pageCanvas.width, pageCanvas.height
        );
      }

      const pageDataUrl = pageCanvas.toDataURL('image/png');

      // Calculate rendered dimensions on PDF
      let renderW = pdfW;
      let renderH = (sliceHeightPx / captureWidth) * pdfW;
      const topOffsetMm = (i === 0 || mode === 'single-page') ? 0 : continuationTopMarginMm;

      // In single-page mode: if taller than A4, scale down proportionally to fit
      if (mode === 'single-page' && renderH > pdfH) {
        const scale = pdfH / renderH;
        renderW = pdfW * scale;
        renderH = pdfH;
      }

      // Add image to page
      const offsetX = (pdfW - renderW) / 2;
      pdf.addImage(pageDataUrl, 'PNG', offsetX, topOffsetMm, renderW, renderH);

      // ── 6. Overlay clickable links for this page ─────────────────────
      const scaleX = renderW / captureWidth;
      const scaleY = renderH / sliceHeightPx;

      for (const link of linkData) {
        // Check if link falls inside this page slice
        if (link.y >= startY && link.y < endY) {
          const linkRelY = link.y - startY;
          const pdfX = offsetX + (link.x * scaleX);
          const pdfY = topOffsetMm + (linkRelY * scaleY);
          const linkW = link.width * scaleX;
          const linkH = link.height * scaleY;

          pdf.link(pdfX, pdfY, linkW, linkH, { url: link.href });
        }
      }
    }

    // ── 7. Download PDF file ────────────────────────────────────────────
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    return true;

  } catch (err) {
    console.error('[PDF Export] Error:', err);
    alert(`PDF export failed: ${(err as Error).message}`);
    return false;
  } finally {
    // Restore zoom transform
    if (zoomWrapper && savedTransform) {
      zoomWrapper.style.transform = savedTransform;
    }
  }
}

/**
 * Finds natural break points between sections, cards, and items
 * so that pages never cut through text lines or cards.
 */
function findSmartBreakPoints(
  container: HTMLElement,
  pageHeightPx: number
): number[] {
  const containerRect = container.getBoundingClientRect();
  const totalHeight = container.scrollHeight;

  // Single page if within 5% tolerance
  if (totalHeight <= pageHeightPx * 1.05) {
    return [0, totalHeight];
  }

  // Collect all elements and their vertical positions relative to container
  const allElements = Array.from(container.querySelectorAll('*')) as HTMLElement[];

  // Intervals [top, bottom] where cutting should be avoided (atomic text lines, small cards)
  const forbiddenIntervals: { top: number; bottom: number }[] = [];
  // Candidate split lines with weights
  const splitCandidates: { y: number; weight: number }[] = [];

  for (const el of allElements) {
    if (el.offsetHeight === 0) continue;

    const r = el.getBoundingClientRect();
    const top = r.top - containerRect.top;
    const bottom = r.bottom - containerRect.top;
    const height = bottom - top;

    const tag = el.tagName.toLowerCase();
    const isHeading = /^h[1-6]$/.test(tag);
    const isParagraph = tag === 'p' || tag === 'li';
    const isTextLeaf = el.children.length === 0 && (el.textContent?.trim().length || 0) > 0;

    // Check if element is a card or section block
    const isCard = (
      el.classList.contains('rounded-2xl') ||
      el.classList.contains('rounded-xl') ||
      el.classList.contains('shadow-sm') ||
      el.classList.contains('border-l-2') ||
      el.classList.contains('pro-card')
    );

    if (isHeading) {
      // High priority to break right before a heading
      splitCandidates.push({ y: Math.max(0, top - 6), weight: 100 });
      forbiddenIntervals.push({ top: top - 2, bottom: bottom + 4 });
    } else if (isCard && height < pageHeightPx * 0.8) {
      // Good place to break: before a card/item
      splitCandidates.push({ y: Math.max(0, top - 4), weight: 80 });
      // Protect small cards from being sliced if they fit on a single page
      if (height < 280) {
        forbiddenIntervals.push({ top: top - 2, bottom: bottom + 2 });
      }
    } else if (isParagraph || isTextLeaf) {
      // Protect individual lines of text from horizontal slicing
      forbiddenIntervals.push({ top: top - 1, bottom: bottom + 1 });
      splitCandidates.push({ y: Math.max(0, top - 2), weight: 40 });
    }
  }

  // Iteratively determine break points
  const breakPoints: number[] = [0];
  let currentY = 0;

  while (currentY < totalHeight) {
    const remaining = totalHeight - currentY;
    if (remaining <= pageHeightPx * 1.05) {
      breakPoints.push(totalHeight);
      break;
    }

    const idealEnd = currentY + pageHeightPx;
    // Allow page to be between 65% and 100% full
    const minAcceptable = currentY + (pageHeightPx * 0.65);

    // Filter candidate split points in acceptable range
    const validCandidates = splitCandidates.filter(
      (c) => c.y >= minAcceptable && c.y <= idealEnd
    );

    let bestY = -1;
    let bestScore = -Infinity;

    for (const cand of validCandidates) {
      // Check if candidate cuts inside any forbidden text interval
      const insideForbidden = forbiddenIntervals.some(
        (f) => cand.y > f.top && cand.y < f.bottom
      );
      if (insideForbidden) continue;

      // Score: weight + page fill ratio
      const fillRatio = (cand.y - currentY) / pageHeightPx;
      const score = cand.weight + (fillRatio * 35);

      if (score > bestScore) {
        bestScore = score;
        bestY = cand.y;
      }
    }

    // Fallback: search backwards from idealEnd for any clear gap
    if (bestY === -1) {
      for (let testY = idealEnd - 8; testY >= minAcceptable; testY -= 4) {
        const inside = forbiddenIntervals.some((f) => testY > f.top && testY < f.bottom);
        if (!inside) {
          bestY = testY;
          break;
        }
      }
    }

    // Secondary fallback: if still blocked, break before the element spanning the boundary
    if (bestY === -1) {
      const spanning = forbiddenIntervals.find((f) => f.top < idealEnd && f.bottom > idealEnd);
      if (spanning && spanning.top >= currentY + (pageHeightPx * 0.5)) {
        bestY = spanning.top;
      } else {
        bestY = idealEnd;
      }
    }

    breakPoints.push(bestY);
    currentY = bestY;
  }

  return breakPoints;
}

/**
 * Loads image from dataUrl into an HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Scans the resume element for all <a> tags and plain URLs/emails,
 * recording position relative to container.
 */
interface LinkPosition {
  href: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function collectLinkPositions(container: HTMLElement): LinkPosition[] {
  const links: LinkPosition[] = [];
  const containerRect = container.getBoundingClientRect();

  // Find all <a> elements
  const anchors = container.querySelectorAll('a[href]');
  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;

    const rect = anchor.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    links.push({
      href,
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    });
  });

  // Auto-detect text that looks like URLs or emails
  const textElements = container.querySelectorAll('span, p, div');
  textElements.forEach((el) => {
    if (el.querySelector('a')) return;

    const text = el.textContent?.trim() || '';
    if (!text) return;

    const autoHref = detectLinkableText(text);
    if (!autoHref) return;

    if (el.closest('a')) return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    links.push({
      href: autoHref,
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    });
  });

  return links;
}

function detectLinkableText(text: string): string | null {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    return `mailto:${text}`;
  }

  if (/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(text)) {
    return text.startsWith('http') ? text : `https://${text}`;
  }

  if (text.includes('linkedin.com') || text.includes('github.com')) {
    return text.startsWith('http') ? text : `https://${text}`;
  }

  return null;
}
