import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Exports the resume element to a downloadable PDF.
 *
 * Uses `html-to-image` (SVG foreignObject approach) instead of html2canvas.
 * The browser handles all rendering — including modern CSS colors like
 * oklab() / oklch() from Tailwind v4 — so no color-parsing errors occur.
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
    // ── 1. Snapshot the element as a high-res PNG ──────────────────────────
    //    pixelRatio: 3  → 3× resolution for crisp print-quality output
    //    All modern CSS colors (oklab, oklch, color()) are handled natively
    //    by the browser's own rendering engine.
    const dataUrl = await toPng(element, {
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      // Ensure we capture the full A4 content, not just the visible viewport
      width: element.scrollWidth,
      height: element.scrollHeight,
      style: {
        // Strip any CSS transforms that would skew dimensions
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

    // ── 2. Build a single A4 page — scale image to fit exactly ────────────
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
      // Shrink proportionally so the whole resume fits on one A4 page
      const scale = pdfH / renderH;
      renderW = pdfW * scale;
      renderH = pdfH;
    }

    // Center horizontally if scaled down
    const offsetX = (pdfW - renderW) / 2;

    // Single page — always
    pdf.addImage(dataUrl, 'PNG', offsetX, 0, renderW, renderH);

    // ── 3. Trigger browser download ────────────────────────────────────────
    const blob    = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    const anchor         = document.createElement('a');
    anchor.href          = blobUrl;
    anchor.download      = filename;
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
