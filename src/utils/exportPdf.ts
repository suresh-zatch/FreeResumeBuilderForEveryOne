import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Exports the resume element to a downloadable PDF with clickable links.
 *
 * Uses `html-to-image` (SVG foreignObject approach) to render the visual,
 * then overlays invisible clickable link annotations on the PDF so that
 * email, LinkedIn, GitHub, website URLs are all clickable in the downloaded PDF.
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

  try {
    // ── 1. Collect all link positions BEFORE rendering to image ─────────
    const linkData = collectLinkPositions(element);

    // ── 2. Snapshot the element as a high-res PNG ──────────────────────
    const dataUrl = await toPng(element, {
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
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

    // ── 3. Build PDF with A4 page ────────────────────────────────────────
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfH = pdf.internal.pageSize.getHeight();  // 297 mm

    // Measure the actual image dimensions
    const imgDims = await new Promise<{ w: number; h: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = dataUrl;
    });

    // Scale to fit A4 width; if still taller than A4 height, scale down further
    let renderW = pdfW;
    let renderH = pdfW * (imgDims.h / imgDims.w);

    if (renderH > pdfH) {
      const scale = pdfH / renderH;
      renderW = pdfW * scale;
      renderH = pdfH;
    }

    // Center horizontally if scaled down
    const offsetX = (pdfW - renderW) / 2;

    // Add the image
    pdf.addImage(dataUrl, 'PNG', offsetX, 0, renderW, renderH);

    // ── 4. Overlay clickable link annotations ────────────────────────────
    const elementRect = element.getBoundingClientRect();
    const scaleX = renderW / elementRect.width;
    const scaleY = renderH / elementRect.height;

    for (const link of linkData) {
      const x = offsetX + (link.x * scaleX);
      const y = link.y * scaleY;
      const w = link.width * scaleX;
      const h = link.height * scaleY;

      // Add an invisible clickable link region on the PDF
      pdf.link(x, y, w, h, { url: link.href });
    }

    // ── 5. Trigger browser download ────────────────────────────────────────
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
  }
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
  // This catches any templates that weren't updated yet
  const textElements = container.querySelectorAll('span, p, div');
  textElements.forEach((el) => {
    // Only check leaf text nodes (no child elements that are links)
    if (el.querySelector('a')) return;
    
    const text = el.textContent?.trim() || '';
    if (!text) return;

    // Check if the text content is a URL or email
    const autoHref = detectLinkableText(text);
    if (!autoHref) return;

    // Make sure this element isn't already inside an <a> tag
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
