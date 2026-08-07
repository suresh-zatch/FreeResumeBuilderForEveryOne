import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Tailwind v4 uses oklch() color functions which html2canvas cannot parse.
 * This injects a <style> override into the clone that maps all Tailwind CSS
 * custom properties to plain RGB/hex fallbacks before capture.
 */
function injectColorFix(cloneDoc: HTMLElement): HTMLStyleElement {
  const style = document.createElement('style');
  // Override all CSS custom properties that might use oklch() with safe hex equivalents.
  // Also force all elements to avoid oklch by resetting color-scheme.
  style.textContent = `
    *, *::before, *::after {
      --tw-color-white: #ffffff !important;
      --tw-color-black: #000000 !important;
    }
    /* Tailwind v4 color scale overrides with plain hex */
    :root, * {
      color-scheme: light only !important;
    }
    /* Neutralize any oklch() that leaked through by catching the most common patterns */
    [class*="bg-gray-50"]  { background-color: #f9fafb !important; }
    [class*="bg-gray-100"] { background-color: #f3f4f6 !important; }
    [class*="bg-gray-200"] { background-color: #e5e7eb !important; }
    [class*="bg-white"]    { background-color: #ffffff !important; }
    [class*="text-gray-900"]{ color: #111827 !important; }
    [class*="text-gray-800"]{ color: #1f2937 !important; }
    [class*="text-gray-700"]{ color: #374151 !important; }
    [class*="text-gray-600"]{ color: #4b5563 !important; }
    [class*="text-gray-500"]{ color: #6b7280 !important; }
    [class*="text-gray-400"]{ color: #9ca3af !important; }
    [class*="text-gray-300"]{ color: #d1d5db !important; }
    [class*="border-gray-100"]{ border-color: #f3f4f6 !important; }
    [class*="border-gray-200"]{ border-color: #e5e7eb !important; }
    [class*="border-gray-300"]{ border-color: #d1d5db !important; }
    [class*="bg-blue-50"]  { background-color: #eff6ff !important; }
    [class*="text-blue-700"]{ color: #1d4ed8 !important; }
    [class*="border-blue-100"]{ border-color: #dbeafe !important; }
  `;
  cloneDoc.appendChild(style);
  return style;
}

/**
 * Walk all elements in the clone and replace computed oklch() colors
 * with their RGB equivalents using getComputedStyle on the *original* element.
 */
function replaceOklchColors(
  cloneRoot: HTMLElement,
  sourceRoot: HTMLElement
): void {
  const cloneEls = Array.from(cloneRoot.querySelectorAll('*')) as HTMLElement[];
  const sourceEls = Array.from(sourceRoot.querySelectorAll('*')) as HTMLElement[];

  const properties: (keyof CSSStyleDeclaration)[] = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderBottomColor',
    'borderLeftColor',
    'borderRightColor',
    'fill',
    'stroke',
  ];

  const oklchPattern = /oklch\(/i;

  cloneEls.forEach((cloneEl, i) => {
    const sourceEl = sourceEls[i];
    if (!sourceEl) return;

    const computed = window.getComputedStyle(sourceEl);

    properties.forEach((prop) => {
      const val = computed[prop] as string;
      if (val && oklchPattern.test(val)) {
        // getComputedStyle on supported browsers resolves oklch → rgb()
        // Apply the resolved rgb() to the clone's inline style
        (cloneEl.style as any)[prop] = val;
      }
    });
  });
}

export async function exportResumeToPdf(
  elementId: string,
  filename: string = 'Resume.pdf'
): Promise<boolean> {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    console.error(`[PDF Export] Element #${elementId} not found.`);
    window.print();
    return false;
  }

  // ------------------------------------------------------------------
  // 1. Deep-clone the source element into an offscreen container
  // ------------------------------------------------------------------
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    left: '-99999px',
    top: '0px',
    width: '794px',      // 210mm @ 96dpi
    minHeight: '1123px', // 297mm @ 96dpi
    background: '#ffffff',
    zIndex: '-9999',
    overflow: 'visible',
  });

  const clone = sourceElement.cloneNode(true) as HTMLElement;
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

  // ------------------------------------------------------------------
  // 2. Resolve oklch() computed colors from the live DOM onto the clone
  // ------------------------------------------------------------------
  replaceOklchColors(clone, sourceElement);

  // ------------------------------------------------------------------
  // 3. Inject a CSS override block to catch remaining oklch occurrences
  // ------------------------------------------------------------------
  injectColorFix(clone);

  // ------------------------------------------------------------------
  // 4. Make all img elements CORS-safe
  // ------------------------------------------------------------------
  const imgs = Array.from(clone.querySelectorAll('img')) as HTMLImageElement[];
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (!img.src || img.src.startsWith('data:')) {
            resolve();
            return;
          }
          img.crossOrigin = 'anonymous';
          const src = img.src;
          img.src = '';
          img.onload = () => resolve();
          img.onerror = () => {
            // If image fails CORS, remove it so canvas isn't tainted
            img.src = '';
            resolve();
          };
          img.src = src;
        })
    )
  );

  // Allow a frame for the browser to render all styles/images
  await new Promise((r) => setTimeout(r, 250));

  try {
    // ----------------------------------------------------------------
    // 5. Capture with html2canvas
    // ----------------------------------------------------------------
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      height: container.scrollHeight,
      windowWidth: 1200,
    });

    document.body.removeChild(container);

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has zero dimensions.');
    }

    // ----------------------------------------------------------------
    // 6. Build A4 PDF with jsPDF
    // ----------------------------------------------------------------
    const imgData = canvas.toDataURL('image/jpeg', 0.97);

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

    // ----------------------------------------------------------------
    // 7. Fallback: browser native Print → Save as PDF
    // ----------------------------------------------------------------
    const usePrint = window.confirm(
      'Direct PDF export failed.\n\n' +
        'Click OK to open the browser Print dialog.\n' +
        'Then select "Save as PDF" as the destination.\n\n' +
        'Tip: removing the profile photo URL avoids CORS issues.'
    );
    if (usePrint) window.print();
    return false;
  }
}
