'use client';

import React from 'react';
import { ResumeTheme } from '@/types/resume';
import { Palette, Check, Sparkles, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

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
    <div className="space-y-6 font-mono">
      <div className="border-b border-cyan-500/20 pb-3">
        <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
          <Terminal className="w-5 h-5 text-cyan-400" />
          // MODULE 07: TEMPLATE_&_COLOR_THEMES
        </h2>
        <p className="text-[11px] text-slate-400">Choose from 15 newly designed resume themes and custom accent palettes.</p>
      </div>

      {/* Accent Color Palette Selector */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-cyan-500/30 space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300">
          $ select_accent_color
        </label>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {ACCENT_COLORS.map((c) => {
            const isSelected = accentColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                type="button"
                onMouseEnter={() => sfx.playHover()}
                onClick={() => {
                  sfx.playClick();
                  onColorChange(c.hex);
                }}
                className="group relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-700 shadow-md transition hover:scale-110"
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
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
              15 Newly Designed Themes
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            15 THEMES READY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {THEMES_2026.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onMouseEnter={() => sfx.playHover()}
                onClick={() => {
                  sfx.playClick();
                  onThemeChange(t.id);
                }}
                className={`text-left p-3.5 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'border-slate-800 hover:border-cyan-500/50 bg-slate-950/80 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{t.name}</span>
                  <span
                    className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-slate-900 text-cyan-400 border border-slate-800'
                    }`}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{t.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
