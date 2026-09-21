'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileDown, Printer, RefreshCw, Trash2, FileText, Loader2, ChevronDown, Check } from 'lucide-react';
import { ExportPdfMode } from '@/utils/exportPdf';

interface Props {
  onExportPdf: (mode?: ExportPdfMode) => void;
  onPrint: () => void;
  onResetSampleData: () => void;
  onClearData: () => void;
  isExporting?: boolean;
}

export const Header: React.FC<Props> = ({
  onExportPdf,
  onPrint,
  onResetSampleData,
  onClearData,
  isExporting = false,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportMode, setExportMode] = useState<ExportPdfMode>('smart');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = (mode: ExportPdfMode) => {
    setExportMode(mode);
    setShowExportMenu(false);
    onExportPdf(mode);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-gray-900 tracking-tight">
                Resume Builder
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                Pro
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:flex items-center gap-1.5">
              <span>Professional Resume Generator</span>
              <span className="text-gray-300">•</span>
              <span className="text-green-600 font-medium">ATS Optimized</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Reset Sample Data */}
          <button
            type="button"
            onClick={onResetSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            title="Load sample data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Sample Data</span>
          </button>

          {/* Clear Form */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Clear all form data?')) onClearData();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
            title="Clear all data"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            title="Print resume"
          >
            <Printer className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden md:inline">Print</span>
          </button>

          {/* Download PDF Split Button */}
          <div ref={menuRef} className="relative inline-flex rounded-lg shadow-sm">
            <button
              type="button"
              disabled={isExporting}
              onClick={() => {
                if (!isExporting) onExportPdf(exportMode);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-l-lg transition-all ${
                isExporting
                  ? 'text-white bg-blue-400 cursor-not-allowed'
                  : 'text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
              }`}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              disabled={isExporting}
              onClick={() => setShowExportMenu((prev) => !prev)}
              className="px-2 py-2 text-xs text-white bg-blue-700 hover:bg-blue-800 border-l border-blue-500 rounded-r-lg transition"
              title="PDF export options"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Menu */}
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                  Export Options
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload('smart')}
                  className="w-full px-3 py-2.5 flex items-start justify-between gap-2 hover:bg-blue-50 transition text-left"
                >
                  <div>
                    <div className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                      <span>Smart Multi-Page</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-blue-100 text-blue-700">Recommended</span>
                    </div>
                    <p className="text-[10.5px] text-gray-500 mt-0.5 leading-snug">
                      Splits cleanly at sections — never cuts text or cards in half.
                    </p>
                  </div>
                  {exportMode === 'smart' && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload('single-page')}
                  className="w-full px-3 py-2.5 flex items-start justify-between gap-2 hover:bg-blue-50 transition text-left border-t border-gray-100"
                >
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      Fit to 1 Page
                    </div>
                    <p className="text-[10.5px] text-gray-500 mt-0.5 leading-snug">
                      Auto-scales all content onto a single A4 sheet.
                    </p>
                  </div>
                  {exportMode === 'single-page' && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
