'use client';

import React, { useState, useRef } from 'react';
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
import { ZoomIn, ZoomOut, RotateCcw, Palette, Maximize2, X } from 'lucide-react';

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
  const [zoom, setZoom] = useState<number>(0.95);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <>
      <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Preview Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-semibold text-gray-700">Live Preview</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Selector Dropdown */}
            {onThemeChange && (
              <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-2.5 py-1 shadow-sm">
                <Palette className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <select
                  value={data.theme}
                  onChange={(e) => onThemeChange(e.target.value as ResumeTheme)}
                  className="text-xs font-medium text-gray-700 bg-transparent outline-none cursor-pointer py-0.5"
                >
                  {THEME_OPTIONS.map((t) => (
                    <option key={t.id} value={t.id} className="bg-white text-gray-900">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Fullscreen */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 bg-white text-gray-500 hover:text-blue-600 border border-gray-300 rounded-lg transition shadow-sm"
              title="Fullscreen View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 bg-white border border-gray-300 rounded-lg p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.05))}
                className="p-1 hover:bg-gray-100 rounded text-gray-500 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] text-gray-600 min-w-[36px] text-center font-medium">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.3, z + 0.05))}
                className="p-1 hover:bg-gray-100 rounded text-gray-500 transition"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(0.95)}
                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition border-l border-gray-200 pl-1"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Canvas */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto p-4 flex justify-center items-start bg-gray-100"
        >
          <div
            className="transition-transform duration-100 ease-out origin-top"
            style={{
              transform: `scale(${zoom})`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale' as never,
            }}
          >
            {/* A4 Paper for PDF Export */}
            <div
              id={id}
              className="w-[210mm] min-h-[297mm] bg-white text-slate-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 antialiased"
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex flex-col p-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-700 text-white">
            <span className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Fullscreen Preview
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 bg-gray-800 border border-gray-600 hover:border-gray-400 rounded-lg text-gray-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-6 flex justify-center items-start">
            <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden border border-gray-300 antialiased">
              {renderTemplate()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
