'use client';

import React from 'react';
import { ResumeTheme } from '@/types/resume';
import { Palette, Check } from 'lucide-react';

interface Props {
  currentTheme: ResumeTheme;
  accentColor: string;
  onThemeChange: (theme: ResumeTheme) => void;
  onColorChange: (color: string) => void;
}

const THEMES: { id: ResumeTheme; name: string; description: string; tag: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Dual-column layout with header banner, skill pills, and timeline design.',
    tag: 'Popular',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean single-column layout with bold typography, refined whitespace, and subtle lines.',
    tag: 'Clean',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional formal layout with serif typography, centered header, and classic dividers.',
    tag: 'Traditional',
  },
];

const ACCENT_COLORS = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Slate', hex: '#334155' },
  { name: 'Crimson', hex: '#dc2626' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Teal', hex: '#0d9488' },
];

export const ThemeSelector: React.FC<Props> = ({
  currentTheme,
  accentColor,
  onThemeChange,
  onColorChange,
}) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Template & Color Theme
        </h2>
        <p className="text-xs text-gray-500">Choose a layout style and accent color for your resume preview.</p>
      </div>

      {/* Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {THEMES.map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onThemeChange(t.id)}
              className={`text-left p-4 rounded-xl border transition-all relative ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{t.name}</span>
                <span
                  className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {t.tag}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
            </button>
          );
        })}
      </div>

      {/* Accent Color Palette */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Accent Color</label>
        <div className="flex flex-wrap items-center gap-3">
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
    </div>
  );
};
