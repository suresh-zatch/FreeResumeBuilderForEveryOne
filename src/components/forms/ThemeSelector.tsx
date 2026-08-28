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
    tag: '⚡ Flagship',
  },
  {
    id: 'cyber_tech_2026',
    name: 'CyberTech & Dev',
    description: 'Slick dark terminal header, code-comment section titles, repository project cards & dev layout.',
    tag: '🤖 Tech Stack',
  },
  {
    id: 'executive_prime_2026',
    name: 'Executive Prime',
    description: 'Luxury corporate leadership design with top accent bar, executive italic summary & serif headers.',
    tag: '👑 C-Suite',
  },
  {
    id: 'glass_modern_2026',
    name: 'Glass Modern',
    description: 'Soft container cards, split 8/4 grid, clean badge tags and high ATS scanner readability.',
    tag: '✨ Glassmorphic',
  },
  {
    id: 'creative_portfolio_2026',
    name: 'Creative Portfolio',
    description: 'Bold 35% colored sidebar with photo avatar slot, white pill badges & project showcase.',
    tag: '🎨 Portfolio',
  },
  {
    id: 'minimal_horizon_2026',
    name: 'Minimal Horizon',
    description: 'Editorial light layout, wide letter spacing, horizontal rule accents & 100% ATS pass guarantee.',
    tag: '📄 Editorial',
  },
  {
    id: 'silicon_valley_2026',
    name: 'Silicon Valley Tech',
    description: 'Clean minimalist tech layout with job title accent badge, 70/30 split grid, and bullet connectors.',
    tag: '🚀 SV Tech',
  },
  {
    id: 'hyper_grid_2026',
    name: 'HyperGrid Asymmetric',
    description: 'Asymmetrical grid container cards, high contrast summary callouts, and metric tags.',
    tag: '📐 Asymmetric',
  },
  {
    id: 'quantum_clean_2026',
    name: 'Quantum Clean',
    description: 'Swiss typography aesthetic, heavy accent rule dividers, clean sans-serif font hierarchy.',
    tag: '🇨🇭 Swiss Modern',
  },
  {
    id: 'neon_futuristic_2026',
    name: 'Futuristic Cyber',
    description: 'Dark slate high-tech theme with glowing accent pill badges, tech stack tags, and timeline nodes.',
    tag: '🌌 Dark Cyber',
  },
  {
    id: 'metro_compact_2026',
    name: 'Metro Compact',
    description: 'Two-column dense layout for senior roles with maximum space efficiency and category borders.',
    tag: '📊 High Density',
  },
  {
    id: 'monochrome_chic_2026',
    name: 'Monochrome Chic',
    description: 'High-fashion luxury brand aesthetic with wide tracking, thin borders, and elegant serif headings.',
    tag: '💎 Luxury Chic',
  },
  {
    id: 'gradient_pulse_2026',
    name: 'Gradient Pulse',
    description: 'Vibrant accent gradient header card, rounded tag pills, visual section dividers, and clean cards.',
    tag: '🌈 Gradient',
  },
  {
    id: 'nordic_minimal_2026',
    name: 'Nordic Minimal',
    description: 'Scandinavian minimalism with generous whitespace, light gray backgrounds, and clean spacing.',
    tag: '🌿 Scandinavian',
  },
  {
    id: 'apex_leadership_2026',
    name: 'Apex Leadership',
    description: 'Strategic VP/Director layout with prominent header summary box & 2-column skills alignment.',
    tag: '🏢 Corporate Lead',
  },
];

const ACCENT_COLORS = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Cyber Teal', hex: '#0d9488' },
  { name: 'Indigo Prime', hex: '#4f46e5' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Slate Executive', hex: '#1e293b' },
  { name: 'Rose Crimson', hex: '#e11d48' },
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
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-600" />
          Template & Color Themes
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Choose from 15 newly designed resume themes and custom accent palettes.</p>
      </div>

      {/* Accent Color Palette Selector */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
        <label className="block text-xs font-semibold text-gray-700">
          Select Accent Color
        </label>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {ACCENT_COLORS.map((c) => {
            const isSelected = accentColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => onColorChange(c.hex)}
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full shadow-sm transition hover:scale-110 ${isSelected ? 'ring-2 ring-offset-2 ring-blue-600' : 'border border-gray-200'}`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 15 Featured Templates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-gray-900">
              15 Newly Designed Themes
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {THEMES_2026.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onThemeChange(t.id)}
                className={`text-left p-3.5 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-900">{t.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">{t.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
