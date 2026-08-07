'use client';

import React from 'react';
import { FileDown, Printer, RefreshCw, Trash2, FileSpreadsheet } from 'lucide-react';

interface Props {
  onExportPdf: () => void;
  onPrint: () => void;
  onResetSampleData: () => void;
  onClearData: () => void;
}

export const Header: React.FC<Props> = ({
  onExportPdf,
  onPrint,
  onResetSampleData,
  onClearData,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-md shadow-blue-500/20">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
              Resume Crafted
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-gray-500 hidden sm:block">Build & export professional resumes instantly</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Reset Pre-fill Sample Data */}
          <button
            type="button"
            onClick={onResetSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 shadow-2xs transition"
            title="Reload realistic sample data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            <span className="hidden sm:inline">Load Sample</span>
          </button>

          {/* Clear Form */}
          <button
            type="button"
            onClick={onClearData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Native Print / Save PDF */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition"
            title="Print or Save as PDF using Browser Print"
          >
            <Printer className="w-3.5 h-3.5 text-gray-700" />
            <span className="hidden md:inline">Print / PDF</span>
          </button>

          {/* Direct PDF Download Button */}
          <button
            type="button"
            onClick={onExportPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
