'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { AiFusion2026Template } from '@/components/templates/AiFusion2026Template';
import { CyberTech2026Template } from '@/components/templates/CyberTech2026Template';
import { ExecutivePrime2026Template } from '@/components/templates/ExecutivePrime2026Template';
import { GlassModern2026Template } from '@/components/templates/GlassModern2026Template';
import { CreativePortfolio2026Template } from '@/components/templates/CreativePortfolio2026Template';
import { MinimalHorizon2026Template } from '@/components/templates/MinimalHorizon2026Template';

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
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  data: ResumeData;
  id?: string;
}

export const ResumePreview: React.FC<Props> = ({ data, id = 'resume-preview' }) => {
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
    <div className="flex flex-col h-full bg-slate-900/5 backdrop-blur rounded-2xl border border-gray-200/80 shadow-inner overflow-hidden">
      {/* Top Preview Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 border-b border-gray-200 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-gray-700">Live Preview</span>
          <span className="text-[11px] text-gray-400 font-mono">(A4 Canvas)</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.05))}
            className="p-1 hover:bg-gray-100 rounded text-gray-600 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 font-mono text-[11px] text-gray-700 min-w-[40px] text-center font-medium">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.2, z + 0.05))}
            className="p-1 hover:bg-gray-100 rounded text-gray-600 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(0.85)}
            className="p-1 hover:bg-gray-100 rounded text-gray-600 transition border-l border-gray-200 pl-1.5"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start bg-gray-200/60">
        <div
          className="transition-transform origin-top duration-150"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Target capturing element for PDF Export */}
          <div
            id={id}
            className="w-[210mm] min-h-[297mm] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-300"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
