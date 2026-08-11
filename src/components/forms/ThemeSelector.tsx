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
}

const THEMES_2026: ThemeMeta[] = [
  {
    id: 'ai_fusion_2026',
    name: 'AI Fusion 2026',
    description: 'Dynamic header banner, glassmorphic metric cards, tech stack badge pills & high-impact timeline.',
    tag: '⚡ 2026 Flagship',
  },
  {
    id: 'cyber_tech_2026',
    name: 'CyberTech & Dev 2026',
    description: 'Slick dark terminal header, code-comment section titles, repository project cards & dev layout.',
    tag: '🤖 AI / Tech',
  },
  {
    id: 'executive_prime_2026',
    name: 'Executive Prime 2026',
    description: 'Luxury corporate leadership design with top accent bar, executive italic summary & serif headers.',
    tag: '👑 C-Suite',
  },
  {
    id: 'glass_modern_2026',
    name: 'Glass Modern 2026',
    description: 'Soft container cards, split 8/4 grid, clean badge tags and high ATS scanner readability.',
    tag: '✨ Glassmorphic',
  },
  {
    id: 'creative_portfolio_2026',
    name: 'Creative Portfolio 2026',
    description: 'Bold 35% colored sidebar with photo avatar slot, white pill badges & project showcase.',
    tag: '🎨 Portfolio',
  },
  {
    id: 'minimal_horizon_2026',
    name: 'Minimal Horizon 2026',
    description: 'Editorial light layout, wide letter spacing, horizontal rule accents & 100% ATS pass guarantee.',
    tag: '📄 Editorial',
  },
  {
    id: 'silicon_valley_2026',
    name: 'Silicon Valley Tech 2026',
    description: 'Clean minimalist tech layout with job title accent badge, 70/30 split grid, and bullet connectors.',
    tag: '🚀 SV Tech',
  },
  {
    id: 'hyper_grid_2026',
    name: 'HyperGrid Asymmetric 2026',
    description: 'Asymmetrical grid container cards, high contrast summary callouts, and metric tags.',
    tag: '📐 Asymmetric',
  },
  {
    id: 'quantum_clean_2026',
    name: 'Quantum Clean 2026',
    description: 'Swiss typography aesthetic, heavy accent rule dividers, clean sans-serif font hierarchy.',
    tag: '🇨🇭 Swiss Modern',
  },
  {
    id: 'neon_futuristic_2026',
    name: 'Futuristic Cyber 2026',
    description: 'Dark slate high-tech theme with glowing accent pill badges, tech stack tags, and timeline nodes.',
    tag: '🌌 Dark Cyber',
  },
  {
    id: 'metro_compact_2026',
    name: 'Metro Compact 2026',
    description: 'Two-column dense layout for senior roles with maximum space efficiency and category borders.',
    tag: '📊 High Density',
  },
  {
    id: 'monochrome_chic_2026',
    name: 'Monochrome Chic 2026',
    description: 'High-fashion luxury brand aesthetic with wide tracking, thin borders, and elegant serif headings.',
    tag: '💎 Luxury Chic',
  },
  {
    id: 'gradient_pulse_2026',
    name: 'Gradient Pulse 2026',
    description: 'Vibrant accent gradient header card, rounded tag pills, visual section dividers, and clean cards.',
    tag: '🌈 Gradient',
  },
  {
    id: 'nordic_minimal_2026',
    name: 'Nordic Minimal 2026',
    description: 'Scandinavian minimalism with generous whitespace, light gray backgrounds, and clean spacing.',
    tag: '🌿 Scandinavian',
  },
  {
    id: 'apex_leadership_2026',
    name: 'Apex Leadership 2026',
    description: 'Strategic VP/Director layout with prominent header summary box & 2-column skills alignment.',
    tag: '🏢 Corporate Lead',
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
        <p className="text-xs text-gray-500">Choose from 15 brand-new, ultra-modern 2026 AI Era resume themes.</p>
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

      {/* 15 2026 AI Era Featured Templates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900">
              15 Newly Designed 2026 AI Era Themes
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
            15 Themes Live
          </span>
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
                    : 'border-gray-200 hover:border-indigo-300 bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-900">{t.name}</span>
                  <span
                    className={`text-[9.5px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
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
    </div>
  );
};
