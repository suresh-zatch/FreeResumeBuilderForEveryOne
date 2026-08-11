import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportResumeToPdf(
  elementId: string,
  filename: string = 'Resume.pdf'
): Promise<boolean> {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`[PDF Export] Element #${elementId} not found.`);
    window.print();
    return false;
  }

  try {
    // Capture the live preview target element directly with high resolution
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas generation returned 0 dimensions.');
    }

    // Convert canvas to high-quality JPEG
    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Create A4 PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageW = pdf.internal.pageSize.getWidth();   // 210mm
    const pageH = pdf.internal.pageSize.getHeight();  // 297mm

    const imgHeightMm = (canvas.height * pageW) / canvas.width;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgHeightMm);

    // Handle multi-page overflow if resume spans beyond 1 A4 page
    let remaining = imgHeightMm - pageH;
    let yOffset = -pageH;
    while (remaining > 0.5) {
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, yOffset, pageW, imgHeightMm);
      yOffset -= pageH;
      remaining -= pageH;
    }

    // Trigger instant browser file download
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('[PDF Export] html2canvas error:', err);

    // Fallback: Browser native print to PDF
    const usePrint = window.confirm(
      'PDF Download Encountered an issue.\n\n' +
        'Click OK to open the browser Print dialog to Save as PDF.'
    );
    if (usePrint) {
      window.print();
    }
    return false;
  }
}
