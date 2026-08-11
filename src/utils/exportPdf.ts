import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exports the resume to a downloadable PDF.
 *
 * Strategy:
 *  1. Clone the target element (strip all CSS transforms so html2canvas sees it at 1:1 scale).
 *  2. Mount the clone off-screen in a fixed-size A4 container.
 *  3. Capture with html2canvas at 3× scale for crisp output.
 *  4. Build the PDF and trigger a direct <a download> click.
 *  5. Clean up the clone immediately after capture.
 */
export async function exportResumeToPdf(
  elementId: string,
  filename: string = 'Resume.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[PDF Export] Element #${elementId} not found.`);
    alert('Resume preview not found. Please ensure the preview is visible.');
    return false;
  }

  // ── 1. Clone the element and strip transforms / backdrops ──────────────────
  const clone = element.cloneNode(true) as HTMLElement;

  // Reset any inline transforms on the clone and its children
  const resetTransform = (el: HTMLElement) => {
    const s = el.style as CSSStyleDeclaration & Record<string, string>;
    s.transform = 'none';
    s.webkitTransform = 'none';
    s.backdropFilter = 'none';
    s.webkitBackdropFilter = 'none';
    s.filter = 'none';
    s.boxShadow = 'none';
    Array.from(el.children).forEach((child) => resetTransform(child as HTMLElement));
  };
  resetTransform(clone);

  // A4 at 96 dpi = 794 × 1123 px  (210mm × 297mm)
  const A4_WIDTH_PX  = 794;
  const A4_HEIGHT_PX = 1123;

  // ── 2. Mount off-screen wrapper ────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: ${A4_WIDTH_PX}px;
    min-height: ${A4_HEIGHT_PX}px;
    background: #ffffff;
    z-index: -9999;
    overflow: hidden;
    font-family: inherit;
  `;

  clone.style.cssText += `
    width: ${A4_WIDTH_PX}px !important;
    min-height: ${A4_HEIGHT_PX}px !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    transform: none !important;
  `;

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Allow a single paint cycle so fonts/images settle
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

  try {
    // ── 3. Capture with html2canvas ──────────────────────────────────────────
    const canvas = await html2canvas(clone, {
      scale: 3,                  // 3× for crisp text
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas produced zero dimensions.');
    }

    // ── 4. Build PDF ─────────────────────────────────────────────────────────
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfH = pdf.internal.pageSize.getHeight();  // 297 mm

    // Fit captured image to A4 (may span multiple pages if resume is long)
    const imgAspect  = canvas.height / canvas.width;
    const imgHeightMm = pdfW * imgAspect;

    if (imgHeightMm <= pdfH) {
      // Single page
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, imgHeightMm);
    } else {
      // Multi-page: slice the image into A4-sized strips
      const pageCount = Math.ceil(imgHeightMm / pdfH);
      for (let i = 0; i < pageCount; i++) {
        if (i > 0) pdf.addPage();
        const srcY    = (i * pdfH * canvas.width) / pdfW;
        const srcH    = (pdfH * canvas.width) / pdfW;
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width  = canvas.width;
        pageCanvas.height = Math.min(srcH, canvas.height - srcY);
        const ctx = pageCanvas.getContext('2d')!;
        ctx.drawImage(canvas, 0, srcY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);
        const pageImg = pageCanvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(pageImg, 'JPEG', 0, 0, pdfW, pdfH);
      }
    }

    // ── 5. Trigger download ──────────────────────────────────────────────────
    const blob    = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href     = blobUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Revoke object URL after short delay to allow download to start
    setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);

    return true;
  } catch (err) {
    console.error('[PDF Export] Error:', err);
    alert(`PDF export failed: ${(err as Error).message}\n\nPlease try again.`);
    return false;
  } finally {
    // Always clean up the off-screen clone
    document.body.removeChild(wrapper);
  }
}
