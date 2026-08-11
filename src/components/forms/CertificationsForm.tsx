'use client';

import React from 'react';
import { CertificationItem } from '@/types/resume';
import { Award, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

interface Props {
  certifications: CertificationItem[];
  onChange: (updated: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications = [], onChange }) => {
  const handleItemChange = (index: number, field: keyof CertificationItem, value: any) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddCert = () => {
    sfx.playClick();
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleRemove = (index: number) => {
    sfx.playPurge();
    const updated = certifications.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === certifications.length - 1) return;
    sfx.playHover();

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...certifications];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div>
          <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
            <Terminal className="w-5 h-5 text-cyan-400" />
            // MODULE 05: CERTIFICATIONS
          </h2>
          <p className="text-[11px] text-slate-400">List official licenses, AWS / Cloud certifications, or honors.</p>
        </div>
        <button
          type="button"
          onMouseEnter={() => sfx.playHover()}
          onClick={handleAddCert}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> ADD_CERTIFICATION
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-cyan-500/30 rounded-xl bg-slate-950/60">
          <p className="text-xs text-slate-400 mb-2">// NO_CERTIFICATIONS_DETECTED</p>
          <button
            type="button"
            onClick={handleAddCert}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Initialize first credential record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-950/90 border border-cyan-500/30 rounded-xl shadow-lg space-y-3 relative group hover:border-cyan-400 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  CREDENTIAL #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-slate-500 hover:text-cyan-400 disabled:opacity-20 transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === certifications.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-slate-500 hover:text-cyan-400 disabled:opacity-20 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-1 text-rose-400 hover:text-rose-300 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ cert_name *</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect Professional"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ issuing_organization *</label>
                  <input
                    type="text"
                    value={item.issuer}
                    onChange={(e) => handleItemChange(index, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ date_issued</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-cyan-400" /> $ verification_url
                  </label>
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                    placeholder="e.g. https://credly.com/badges/..."
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
