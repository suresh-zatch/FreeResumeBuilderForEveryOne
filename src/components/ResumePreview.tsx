'use client';

import React, { useState } from 'react';
import { ResumeData, ResumeTheme } from '@/types/resume';
import { AiFusion2026Template } from '@/components/templates/AiFusion2026Template';
import { CyberTech2026Template } from '@/components/templates/CyberTech2026Template';
import { ExecutivePrime2026Template } from '@/components/templates/ExecutivePrime2026Template';
import { GlassModern2026Template } from '@/components/templates/GlassModern2026Template';
import { CreativePortfolio2026Template } from '@/components/templates/CreativePortfolio2026Template';
import { MinimalHorizon2026Template } from '@/components/templates/MinimalHorizon2026Template';
import { SiliconValley2026Template } from '@/components/templates/SiliconValley2026Template';
import { HyperGrid2026Template } from '@/components/templates/HyperGrid2026Template';
import { QuantumClean2026Template } from '@/components/templates/QuantumClean2026Template';
import { NeonFuturistic2026Template } from '@/components/templates/NeonFuturistic2026Template';
import { MetroCompact2026Template } from '@/components/templates/MetroCompact2026Template';
import { MonochromeChic2026Template } from '@/components/templates/MonochromeChic2026Template';
import { GradientPulse2026Template } from '@/components/templates/GradientPulse2026Template';
import { NordicMinimal2026Template } from '@/components/templates/NordicMinimal2026Template';
import { ApexLeadership2026Template } from '@/components/templates/ApexLeadership2026Template';

import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { TechnicalTemplate } from '@/components/templates/TechnicalTemplate';
import { ElegantTemplate } from '@/components/templates/ElegantTemplate';
import { BoldTemplate } from '@/components/templates/BoldTemplate';
import { CompactTemplate } from '@/components/templates/CompactTemplate';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Palette } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

interface Props {
  data: ResumeData;
  id?: string;
  onThemeChange?: (theme: ResumeTheme) => void;
}

const THEME_OPTIONS: { id: ResumeTheme; name: string }[] = [
  { id: 'ai_fusion_2026', name: '⚡ AI Fusion 2026' },
  { id: 'cyber_tech_2026', name: '🤖 CyberTech 2026' },
  { id: 'executive_prime_2026', name: '👑 Executive Prime 2026' },
  { id: 'glass_modern_2026', name: '✨ Glass Modern 2026' },
  { id: 'creative_portfolio_2026', name: '🎨 Creative Portfolio 2026' },
  { id: 'minimal_horizon_2026', name: '📄 Minimal Horizon 2026' },
  { id: 'silicon_valley_2026', name: '🚀 Silicon Valley Tech 2026' },
  { id: 'hyper_grid_2026', name: '📐 HyperGrid Asymmetric 2026' },
  { id: 'quantum_clean_2026', name: '🇨🇭 Quantum Clean 2026' },
  { id: 'neon_futuristic_2026', name: '🌌 Futuristic Cyber 2026' },
  { id: 'metro_compact_2026', name: '📊 Metro Compact 2026' },
  { id: 'monochrome_chic_2026', name: '💎 Monochrome Chic 2026' },
  { id: 'gradient_pulse_2026', name: '🌈 Gradient Pulse 2026' },
  { id: 'nordic_minimal_2026', name: '🌿 Nordic Minimal 2026' },
  { id: 'apex_leadership_2026', name: '🏢 Apex Leadership 2026' },
  { id: 'modern', name: 'Modern Classic' },
  { id: 'minimal', name: 'Minimal Pure' },
  { id: 'classic', name: 'Classic Standard' },
  { id: 'executive', name: 'Executive Standard' },
  { id: 'creative', name: 'Creative Sidebar' },
  { id: 'technical', name: 'Technical Code' },
  { id: 'elegant', name: 'Elegant Serif' },
  { id: 'bold', name: 'Bold Impact' },
  { id: 'compact', name: 'Compact Density' },
  { id: 'professional', name: 'Professional Grid' },
];

export const ResumePreview: React.FC<Props> = ({ data, id = 'resume-preview', onThemeChange }) => {
  const [zoom, setZoom] = useState<number>(0.85);

  const renderTemplate = () => {
    switch (data.theme) {
      case 'ai_fusion_2026':
        return <AiFusion2026Template data={data} />;
      case 'cyber_tech_2026':
        return <CyberTech2026Template data={data} />;
      case 'executive_prime_2026':
        return <ExecutivePrime2026Template data={data} />;
      case 'glass_modern_2026':
        return <GlassModern2026Template data={data} />;
      case 'creative_portfolio_2026':
        return <CreativePortfolio2026Template data={data} />;
      case 'minimal_horizon_2026':
        return <MinimalHorizon2026Template data={data} />;
      case 'silicon_valley_2026':
        return <SiliconValley2026Template data={data} />;
      case 'hyper_grid_2026':
        return <HyperGrid2026Template data={data} />;
      case 'quantum_clean_2026':
        return <QuantumClean2026Template data={data} />;
      case 'neon_futuristic_2026':
        return <NeonFuturistic2026Template data={data} />;
      case 'metro_compact_2026':
        return <MetroCompact2026Template data={data} />;
      case 'monochrome_chic_2026':
        return <MonochromeChic2026Template data={data} />;
      case 'gradient_pulse_2026':
        return <GradientPulse2026Template data={data} />;
      case 'nordic_minimal_2026':
        return <NordicMinimal2026Template data={data} />;
      case 'apex_leadership_2026':
        return <ApexLeadership2026Template data={data} />;

      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'technical':
        return <TechnicalTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'bold':
        return <BoldTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-cyan-500/30 shadow-[0_0_35px_rgba(0,229,255,0.15)] overflow-hidden">
      {/* Hologram Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-900 border-b border-cyan-500/30 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold text-cyan-300 tracking-wider">HOLOGRAM_PREVIEW</span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">(A4 CRISP CANVAS)</span>
        </div>

        {/* Instant Theme Dropdown Selector */}
        {onThemeChange && (
          <div className="flex items-center gap-1.5 bg-slate-950 border border-cyan-400/50 rounded-xl px-2.5 py-1 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <Palette className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={data.theme}
              onChange={(e) => {
                sfx.playClick();
                onThemeChange(e.target.value as ResumeTheme);
              }}
              className="text-xs font-mono font-bold text-cyan-300 bg-transparent outline-none cursor-pointer py-0.5"
            >
              {THEME_OPTIONS.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white font-mono">
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-0.5">
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playClick();
              setZoom((z) => Math.max(0.5, z - 0.05));
            }}
            className="p-1 hover:bg-slate-800 rounded text-cyan-400 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1 font-mono text-[11px] text-cyan-300 min-w-[36px] text-center font-bold">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playClick();
              setZoom((z) => Math.min(1.2, z + 0.05));
            }}
            className="p-1 hover:bg-slate-800 rounded text-cyan-400 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => {
              sfx.playClick();
              setZoom(0.85);
            }}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 transition border-l border-slate-800 pl-1.5"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Crystal Clear Viewport Canvas */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start bg-slate-950/80">
        <div
          className="transition-transform duration-150 origin-top"
          style={{
            transform: `scale(${zoom})`,
            WebkitFontSmoothing: 'subpixel-antialiased',
          }}
        >
          {/* Target capturing element for PDF Export - 100% Crisp White A4 Paper */}
          <div
            id={id}
            className="w-[210mm] min-h-[297mm] bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden border border-cyan-400/40 relative antialiased"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
