'use client';

import React, { useState } from 'react';
import { FileDown, Printer, RefreshCw, Trash2, ShieldCheck, Terminal, Volume2, VolumeX, Cpu } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

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
  const [sfxActive, setSfxActive] = useState<boolean>(true);

  const handleToggleSound = () => {
    const newState = sfx.toggleSound();
    setSfxActive(newState);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/30 px-4 lg:px-8 py-3 shadow-2xl shadow-cyan-950/50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Command Center Brand Logo & HUD Status */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 border border-cyan-400/50 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center">
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black font-mono tracking-wider text-white uppercase flex items-center gap-2">
                CYBER_BUILDER<span className="text-cyan-400 text-xs">//v2026.4</span>
              </h1>
              <span className="hidden sm:inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,102,0.2)]">
                ● SYSTEM: ONLINE
              </span>
            </div>
            <p className="text-[10.5px] font-mono text-slate-400 hidden sm:flex items-center gap-2 pt-0.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>OFFENSIVE_RESUME_GENERATOR</span>
              <span className="text-slate-600">|</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-emerald-400">100% ATS_COMPLIANT</span>
            </p>
          </div>
        </div>

        {/* HUD Controls & Actions */}
        <div className="flex items-center gap-2">
          {/* Audio SFX Toggle */}
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={handleToggleSound}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-xl border transition-all ${
              sfxActive
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Sci-Fi SFX Audio"
          >
            {sfxActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{sfxActive ? 'SFX: ON' : 'SFX: OFF'}</span>
          </button>

          {/* Reset Pre-fill Sample Data */}
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playClick();
              onResetSampleData();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white rounded-xl border border-slate-700/80 transition"
            title="Reload realistic sample 2026 data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">SAMPLE_DATA</span>
          </button>

          {/* Clear Form */}
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playPurge();
              onClearData();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-800/60 transition"
            title="Purge all fields"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">PURGE</span>
          </button>

          {/* Native Print / Save PDF */}
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playClick();
              onPrint();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 transition"
            title="Print or Save as PDF using Browser Print"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">PRINT.exe</span>
          </button>

          {/* Direct PDF Download Button */}
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playSuccess();
              onExportPdf();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95 transition-all border border-cyan-200"
          >
            <FileDown className="w-4 h-4 text-slate-950" />
            <span>GENERATE_PDF.exe</span>
          </button>
        </div>
      </div>
    </header>
  );
};
