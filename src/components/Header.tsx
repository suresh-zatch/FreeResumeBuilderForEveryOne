'use client';

import React from 'react';
import { FileDown, Printer, RefreshCw, Trash2, FileText, Loader2 } from 'lucide-react';

interface Props {
  onExportPdf: () => void;
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

          {/* Download PDF */}
          <button
            type="button"
            disabled={isExporting}
            onClick={() => {
              if (!isExporting) onExportPdf();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all ${
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
        </div>
      </div>
    </header>
  );
};
