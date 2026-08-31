'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ResumeTheme } from '@/types/resume';
import { Palette, Check, Sparkles, Pipette } from 'lucide-react';

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

const PRESET_COLORS = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Cyber Teal', hex: '#0d9488' },
  { name: 'Indigo Prime', hex: '#4f46e5' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Slate Executive', hex: '#1e293b' },
  { name: 'Rose Crimson', hex: '#e11d48' },
  { name: 'Sunset Amber', hex: '#d97706' },
  { name: 'Violet Glow', hex: '#7c3aed' },
  { name: 'Hot Pink', hex: '#ec4899' },
  { name: 'Sky Blue', hex: '#0ea5e9' },
  { name: 'Lime', hex: '#65a30d' },
  { name: 'Orange', hex: '#ea580c' },
];

// ── HSV/RGB/Hex conversion utilities ─────────────────────────────────────────
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r1 = 0, g1 = 0, b1 = 0;
  if (h < 60) { r1 = c; g1 = x; }
  else if (h < 120) { r1 = x; g1 = c; }
  else if (h < 180) { g1 = c; b1 = x; }
  else if (h < 240) { g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; b1 = c; }
  else { r1 = c; b1 = x; }
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  const s = max === 0 ? 0 : d / max;
  return [h, s, max];
}

// ── ColorPicker subcomponent ─────────────────────────────────────────────────
function ColorPicker({ color, onChange }: { color: string; onChange: (hex: string) => void }) {
  const rgb = hexToRgb(color) || [37, 99, 235];
  const [h, s, v] = rgbToHsv(...rgb);

  const [hue, setHue] = useState(h);
  const [sat, setSat] = useState(s);
  const [val, setVal] = useState(v);
  const [hexInput, setHexInput] = useState(color);

  const canvasRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const draggingSV = useRef(false);
  const draggingHue = useRef(false);

  // Sync from external color changes (e.g. preset click)
  useEffect(() => {
    const newRgb = hexToRgb(color);
    if (newRgb) {
      const [nh, ns, nv] = rgbToHsv(...newRgb);
      setHue(nh);
      setSat(ns);
      setVal(nv);
      setHexInput(color);
    }
  }, [color]);

  const emitColor = useCallback((h: number, s: number, v: number) => {
    const [r, g, b] = hsvToRgb(h, s, v);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    onChange(hex);
  }, [onChange]);

  // ── Saturation/Value canvas drag ─────────────────────────────────────────
  const handleSVMove = useCallback((clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const newSat = x / rect.width;
    const newVal = 1 - y / rect.height;
    setSat(newSat);
    setVal(newVal);
    emitColor(hue, newSat, newVal);
  }, [hue, emitColor]);

  const onSVPointerDown = useCallback((e: React.PointerEvent) => {
    draggingSV.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleSVMove(e.clientX, e.clientY);
  }, [handleSVMove]);

  const onSVPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingSV.current) return;
    handleSVMove(e.clientX, e.clientY);
  }, [handleSVMove]);

  const onSVPointerUp = useCallback(() => {
    draggingSV.current = false;
  }, []);

  // ── Hue slider drag ─────────────────────────────────────────────────────
  const handleHueMove = useCallback((clientX: number) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newHue = (x / rect.width) * 360;
    setHue(newHue);
    emitColor(newHue, sat, val);
  }, [sat, val, emitColor]);

  const onHuePointerDown = useCallback((e: React.PointerEvent) => {
    draggingHue.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleHueMove(e.clientX);
  }, [handleHueMove]);

  const onHuePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingHue.current) return;
    handleHueMove(e.clientX);
  }, [handleHueMove]);

  const onHuePointerUp = useCallback(() => {
    draggingHue.current = false;
  }, []);

  // ── Hex input handler ──────────────────────────────────────────────────
  const handleHexInputChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9a-f]{6}$/i.test(value)) {
      onChange(value);
      const newRgb = hexToRgb(value);
      if (newRgb) {
        const [nh, ns, nv] = rgbToHsv(...newRgb);
        setHue(nh);
        setSat(ns);
        setVal(nv);
      }
    }
  };

  const hueColor = rgbToHex(...hsvToRgb(hue, 1, 1));

  return (
    <div className="space-y-3">
      {/* Saturation/Value Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full h-40 rounded-lg cursor-crosshair border border-gray-200 overflow-hidden touch-none select-none"
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
        }}
        onPointerDown={onSVPointerDown}
        onPointerMove={onSVPointerMove}
        onPointerUp={onSVPointerUp}
      >
        {/* Picker thumb */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${sat * 100}%`,
            top: `${(1 - val) * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Hue Slider */}
      <div
        ref={hueRef}
        className="relative w-full h-3.5 rounded-full cursor-pointer border border-gray-200 overflow-hidden touch-none select-none"
        style={{
          background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
        }}
        onPointerDown={onHuePointerDown}
        onPointerMove={onHuePointerMove}
        onPointerUp={onHuePointerUp}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2"
          style={{
            left: `${(hue / 360) * 100}%`,
            backgroundColor: hueColor,
          }}
        />
      </div>

      {/* Hex input + color preview */}
      <div className="flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-lg border border-gray-200 shadow-inner shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1 relative">
          <Pipette className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInputChange(e.target.value)}
            placeholder="#2563eb"
            maxLength={7}
            className="w-full pl-8 pr-3 py-2 text-sm font-mono bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition uppercase"
          />
        </div>
        {/* Native color picker fallback */}
        <label className="relative cursor-pointer shrink-0" title="System color picker">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition">
            <Palette className="w-4 h-4 text-gray-500" />
          </div>
        </label>
      </div>
    </div>
  );
}

// ── Main ThemeSelector component ─────────────────────────────────────────────
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
        <p className="text-xs text-gray-500 mt-0.5">Choose from 15 resume themes and pick any accent color you want.</p>
      </div>

      {/* Full Color Picker */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
        <label className="block text-xs font-semibold text-gray-700">
          Accent Color
        </label>
        <ColorPicker color={accentColor} onChange={onColorChange} />

        {/* Preset Quick Swatches */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-[11px] text-gray-500 mb-2">Quick presets</p>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_COLORS.map((c) => {
              const isSelected = accentColor.toLowerCase() === c.hex.toLowerCase();
              return (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => onColorChange(c.hex)}
                  className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-sm transition hover:scale-110 ${isSelected ? 'ring-2 ring-offset-1 ring-blue-600' : 'border border-gray-200'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {isSelected && <Check className="w-3 h-3 text-white drop-shadow-md" />}
                </button>
              );
            })}
          </div>
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
