'use client';

import React from 'react';
import { ResumeTheme } from '@/types/resume';
import { Palette, Check, Sparkles } from 'lucide-react';

interface Props {
  currentTheme: ResumeTheme;
  accentColor: string;
  onThemeChange: (theme: ResumeTheme) => void;
  onColorChange: (color: string) => void;
}

interface ThemeMeta {
  id: ResumeTheme;
  name: string;
  description: string;
  tag: string;
  is2026?: boolean;
}

const THEMES_2026: ThemeMeta[] = [
  {
    id: 'ai_fusion_2026',
    name: 'AI Fusion 2026',
    description: 'Dynamic header banner, glassmorphic metric cards, tech stack badge pills & high-impact timeline.',
    tag: '⚡ 2026 Flagship',
    is2026: true,
  },
  {
    id: 'cyber_tech_2026',
    name: 'CyberTech 2026',
    description: 'Slick dark terminal header, code-comment section titles, repository project cards & dev layout.',
    tag: '🤖 AI / Tech',
    is2026: true,
  },
  {
    id: 'executive_prime_2026',
    name: 'Executive Prime 2026',
    description: 'Luxury corporate leadership design with top accent bar, executive italic summary & serif headers.',
    tag: '👑 C-Suite',
    is2026: true,
  },
  {
    id: 'glass_modern_2026',
    name: 'Glass Modern 2026',
    description: 'Soft container cards, split 8/4 grid, clean badge tags and high ATS readability.',
    tag: '✨ Ultra Clean',
    is2026: true,
  },
  {
    id: 'creative_portfolio_2026',
    name: 'Creative Portfolio 2026',
    description: 'Bold 35% colored sidebar with photo avatar slot, white pill badges & project showcase.',
    tag: '🎨 Portfolio',
    is2026: true,
  },
  {
    id: 'minimal_horizon_2026',
    name: 'Minimal Horizon 2026',
    description: 'Editorial light layout, wide letter spacing, horizontal rule accents & 100% ATS pass guarantee.',
    tag: '📄 Editorial',
    is2026: true,
  },
];

const THEMES_CLASSIC: ThemeMeta[] = [
  {
    id: 'modern',
    name: 'Modern Classic',
    description: 'Dual-column layout with header banner, skill pills, and timeline design.',
    tag: 'Popular',
  },
  {
    id: 'minimal',
    name: 'Minimal Pure',
    description: 'Clean single-column layout with bold typography, refined whitespace, and subtle lines.',
    tag: 'Clean',
  },
  {
    id: 'classic',
    name: 'Classic Standard',
    description: 'Traditional formal layout with serif typography, centered header, and classic dividers.',
    tag: 'Traditional',
  },
  {
    id: 'executive',
    name: 'Executive Standard',
    description: 'Authoritative dark banner header, serif headings, left border accents.',
    tag: 'Executive',
  },
  {
    id: 'creative',
    name: 'Creative Sidebar',
    description: 'Artistic 35% colored sidebar with white text, skill tags, and timeline markers.',
    tag: 'Creative',
  },
  {
    id: 'technical',
    name: 'Technical Code',
    description: 'Developer README aesthetic with code comments, inline badges, and monospace details.',
    tag: 'Tech',
  },
  {
    id: 'elegant',
    name: 'Elegant Serif',
    description: 'Refined centered layout with delicate tracking and luxury typography.',
    tag: 'Luxury',
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    description: 'High-impact full-width accent header, bold typography, and vibrant skill badges.',
    tag: 'Impact',
  },
  {
    id: 'compact',
    name: 'Compact Density',
    description: 'Dense 40/60 split layout maximizing content for senior roles.',
    tag: 'Dense',
  },
  {
    id: 'professional',
    name: 'Professional Grid',
    description: 'Polished corporate grid layout with subtle accent top border.',
    tag: 'Corporate',
  },
];

const ACCENT_COLORS = [
  { name: 'Royal Blue 2026', hex: '#2563eb' },
  { name: 'Cyber Teal', hex: '#0d9488' },
  { name: 'Indigo Prime', hex: '#4f46e5' },
  { name: 'Emerald AI', hex: '#059669' },
  { name: 'Slate Executive', hex: '#1e293b' },
  { name: 'Rose Quartz', hex: '#e11d48' },
  { name: 'Sunset Amber', hex: '#d97706' },
  { name: 'Violet Glow', hex: '#7c3aed' },
];

export const ThemeSelector: React.FC<Props> = ({
  currentTheme,
  accentColor,
  onThemeChange,
  onColorChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Template & Color Theme
        </h2>
        <p className="text-xs text-gray-500">Select a unique 2026-era design template and customizable color palette.</p>
      </div>

      {/* Accent Color Palette Selector */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Accent Color Theme
        </label>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {ACCENT_COLORS.map((c) => {
            const isSelected = accentColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => onColorChange(c.hex)}
                className="group relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-sm transition hover:scale-110"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2026 AI Era Featured Templates */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900">
            2026 AI Era Flagship Templates (Recommended)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {THEMES_2026.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onThemeChange(t.id)}
                className={`text-left p-4 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-indigo-100 hover:border-indigo-300 bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-900">{t.name}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{t.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Classic & Standard Templates */}
      <div className="space-y-3 pt-2 border-t border-gray-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Classic & Standard Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {THEMES_CLASSIC.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onThemeChange(t.id)}
                className={`text-left p-3.5 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">{t.name}</span>
                  <span
                    className={`text-[9.5px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{t.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
