'use client';

import React from 'react';
import { FileDown, Printer, RefreshCw, Trash2, Sparkles, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 shadow-xl text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 via-blue-600 to-teal-400 rounded-2xl text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center border border-white/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              MyResumeBuilder
              <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-2xs">
                2026 AI EDITION
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              15 ATS-Optimized 2026 Themes • 100% Free & Fast
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Reset Pre-fill Sample Data */}
          <button
            type="button"
            onClick={onResetSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-xl border border-slate-700/80 shadow-2xs transition"
            title="Reload realistic sample 2026 data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">2026 Sample</span>
          </button>

          {/* Clear Form */}
          <button
            type="button"
            onClick={onClearData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-800/60 transition"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Native Print / Save PDF */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition"
            title="Print or Save as PDF using Browser Print"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">Print / PDF</span>
          </button>

          {/* Direct PDF Download Button */}
          <button
            type="button"
            onClick={onExportPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 rounded-xl shadow-lg shadow-indigo-500/25 active:scale-95 transition-all border border-white/20"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
