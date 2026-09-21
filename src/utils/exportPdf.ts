import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Exports the resume element to a downloadable PDF with clickable links.
 *
 * Strategy:
 *  1. Temporarily reset any CSS transforms on the element so html-to-image
 *     captures at the true 210mm (≈794px) layout width.
 *  2. Render at 3× pixel ratio for crisp output.
 *  3. Scale the image to fill the full A4 width (210 mm).
 *  4. If the content is taller than one A4 page (297 mm), split across
 *     multiple pages — no squishing.
 *  5. Overlay invisible clickable link annotations on each page.
 */
export async function exportResumeToPdf(
  elementId: string,
  filename: string = 'Resume.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[PDF Export] Element #${elementId} not found.`);
    alert('Resume preview not found. Please make sure the preview panel is visible.');
    return false;
  }

  // Find the zoom transform wrapper (parent of the element)
  const zoomWrapper = element.parentElement;
  let savedTransform = '';
  if (zoomWrapper && zoomWrapper.style.transform) {
    savedTransform = zoomWrapper.style.transform;
    zoomWrapper.style.transform = 'none';
  }

  try {
    // ── 1. Collect all link positions BEFORE rendering to image ─────────
    const linkData = collectLinkPositions(element);

    // ── 2. Snapshot the element as a high-res PNG ──────────────────────
    //    Force the capture at the element's full scroll dimensions with
    //    no transform, so the image matches exactly what the user sees at 100%.
    const captureWidth = element.scrollWidth;
    const captureHeight = element.scrollHeight;

    const dataUrl = await toPng(element, {
      pixelRatio: 3,
      backgroundColor: '#ffffff',
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

    // ── 3. Build PDF with A4 pages ────────────────────────────────────
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfH = pdf.internal.pageSize.getHeight();  // 297 mm

    // Measure the actual image dimensions (in px at 3× pixel ratio)
    const imgDims = await new Promise<{ w: number; h: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = dataUrl;
    });

    // Scale image to fill full A4 width
    const renderW = pdfW;
    const renderH = pdfW * (imgDims.h / imgDims.w);

    // ── 4. Multi-page: split the tall image across pages ───────────────
    if (renderH <= pdfH) {
      // Content fits on one page — render at the top, full width
      pdf.addImage(dataUrl, 'PNG', 0, 0, renderW, renderH);
    } else {
      // Content is taller than one page — slice across pages
      const totalPages = Math.ceil(renderH / pdfH);

      // We need to use canvas-based slicing for multi-page
      const fullCanvas = await loadImageToCanvas(dataUrl, imgDims.w, imgDims.h);

      // How many source px per page?
      const srcPxPerPage = imgDims.h / totalPages;
      // Corrected: calculate exact source height per PDF page
      const pxPerMm = imgDims.h / renderH;
      const srcHeightPerPage = pdfH * pxPerMm;

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        const srcY = page * srcHeightPerPage;
        const srcH = Math.min(srcHeightPerPage, imgDims.h - srcY);
        const destH = (srcH / pxPerMm);

        // Slice this page's portion from the full image
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgDims.w;
        pageCanvas.height = Math.round(srcH);
        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            fullCanvas,
            0, Math.round(srcY),         // source x, y
            imgDims.w, Math.round(srcH), // source w, h
            0, 0,                         // dest x, y
            imgDims.w, Math.round(srcH)  // dest w, h
          );
        }

        const pageDataUrl = pageCanvas.toDataURL('image/png');
        pdf.addImage(pageDataUrl, 'PNG', 0, 0, renderW, destH);
      }
    }

    // ── 5. Overlay clickable link annotations ────────────────────────────
    const elementRect = element.getBoundingClientRect();
    const scaleX = renderW / elementRect.width;
    const scaleY = renderH / elementRect.height;

    for (const link of linkData) {
      const pdfX = link.x * scaleX;
      const pdfY = link.y * scaleY;
      const w = link.width * scaleX;
      const h = link.height * scaleY;

      // Determine which page this link falls on
      const pageIndex = Math.floor(pdfY / pdfH);
      const yOnPage = pdfY - (pageIndex * pdfH);

      // jsPDF pages are 1-indexed
      if (pageIndex + 1 <= pdf.getNumberOfPages()) {
        pdf.setPage(pageIndex + 1);
        pdf.link(pdfX, yOnPage, w, h, { url: link.href });
      }
    }

    // ── 6. Trigger browser download ────────────────────────────────────
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
    // Restore the zoom transform
    if (zoomWrapper && savedTransform) {
      zoomWrapper.style.transform = savedTransform;
    }
  }
}

/**
 * Loads a data URL into an HTMLCanvasElement for pixel-level slicing.
 */
function loadImageToCanvas(
  dataUrl: string,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Failed to get 2d context'));
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Scans the resume element for all <a> tags with valid hrefs,
 * and records their position relative to the container element.
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

  // Find all <a> elements with href attributes
  const anchors = container.querySelectorAll('a[href]');

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;

    const rect = anchor.getBoundingClientRect();
    
    // Skip elements that are invisible or have zero dimensions
    if (rect.width === 0 || rect.height === 0) return;

    links.push({
      href,
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    });
  });

  // Also scan for text that looks like URLs/emails but aren't wrapped in <a> tags
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

/**
 * Detects if a text string is a linkable URL or email address.
 * Returns the proper href or null.
 */
function detectLinkableText(text: string): string | null {
  // Email pattern
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    return `mailto:${text}`;
  }

  // URL pattern (with or without protocol)
  if (/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(text)) {
    return text.startsWith('http') ? text : `https://${text}`;
  }

  // LinkedIn/GitHub specific patterns
  if (text.includes('linkedin.com') || text.includes('github.com')) {
    return text.startsWith('http') ? text : `https://${text}`;
  }

  return null;
}
