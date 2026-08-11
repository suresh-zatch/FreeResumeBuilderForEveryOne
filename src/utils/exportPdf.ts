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

  // 1. Create clean un-transformed offscreen clone container
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'absolute',
    left: '-9999px',
    top: '0px',
    width: '794px',
    minHeight: '1123px',
    background: '#ffffff',
    color: '#0f172a',
    zIndex: '-9999',
    overflow: 'visible',
  });

  const clone = targetElement.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    width: '794px',
    transform: 'none',
    boxShadow: 'none',
    border: 'none',
    margin: '0',
    padding: '0',
    background: '#ffffff',
    overflow: 'visible',
  });

  container.appendChild(clone);
  document.body.appendChild(container);

  // 2. Safely handle image CORS
  const imgs = Array.from(clone.querySelectorAll('img')) as HTMLImageElement[];
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (!img.src || img.src.startsWith('data:')) {
            resolve();
            return;
          }
          const temp = new Image();
          temp.crossOrigin = 'anonymous';
          temp.onload = () => {
            try {
              const cvs = document.createElement('canvas');
              cvs.width = temp.naturalWidth || 200;
              cvs.height = temp.naturalHeight || 200;
              const ctx = cvs.getContext('2d');
              if (ctx) {
                ctx.drawImage(temp, 0, 0);
                img.src = cvs.toDataURL('image/png');
              }
            } catch (e) {
              console.warn('[PDF Export] Failed to convert image to Data URL:', e);
            }
            resolve();
          };
          temp.onerror = () => {
            img.style.display = 'none';
            resolve();
          };
          temp.src = img.src;
        })
    )
  );

  // Give DOM 150ms to lay out
  await new Promise((r) => setTimeout(r, 150));

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      height: container.scrollHeight,
    });

    document.body.removeChild(container);

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas rendering failed with zero dimensions.');
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageW = pdf.internal.pageSize.getWidth();   // 210mm
    const pageH = pdf.internal.pageSize.getHeight();  // 297mm
    const imgHeightMm = (canvas.height * pageW) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, imgHeightMm);

    let remaining = imgHeightMm - pageH;
    let yOffset = -pageH;
    while (remaining > 0.5) {
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, yOffset, pageW, imgHeightMm);
      yOffset -= pageH;
      remaining -= pageH;
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('[PDF Export] Failed:', err);

    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }

    const usePrint = window.confirm(
      'Direct PDF Export was blocked by browser security.\n\n' +
        'Click OK to open the Print window and select "Save as PDF".'
    );
    if (usePrint) {
      window.print();
    }
    return false;
  }
}
