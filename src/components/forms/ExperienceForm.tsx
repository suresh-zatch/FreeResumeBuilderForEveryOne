'use client';

import React from 'react';
import { ExperienceItem } from '@/types/resume';
import { Briefcase, Plus, Trash2, ChevronUp, ChevronDown, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

interface Props {
  experience: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experience, onChange }) => {
  const handleItemChange = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddExperience = () => {
    sfx.playClick();
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experience, newItem]);
  };

  const handleRemove = (index: number) => {
    sfx.playPurge();
    const updated = experience.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === experience.length - 1) return;
    sfx.playHover();

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...experience];
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
            // MODULE 02: EXPERIENCE_LOGS
          </h2>
          <p className="text-[11px] text-slate-400">Detail technical roles, leadership impact, and quantifiable accomplishments.</p>
        </div>
        <button
          type="button"
          onMouseEnter={() => sfx.playHover()}
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> ADD_EXPERIENCE
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-cyan-500/30 rounded-xl bg-slate-950/60">
          <p className="text-xs text-slate-400 mb-2">// NO_EXPERIENCE_LOGS_DETECTED</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Initialize first work log entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-950/90 border border-cyan-500/30 rounded-xl shadow-lg space-y-3 relative group hover:border-cyan-400 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  LOG_RECORD #{index + 1}
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
                    disabled={index === experience.length - 1}
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
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ company_name</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                    placeholder="e.g. TechNova AI"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ role_position</label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => handleItemChange(index, 'position', e.target.value)}
                    placeholder="e.g. Lead Engineer"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ location</label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-cyan-300 mb-1">$ start_date</label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                      placeholder="e.g. 2022-03"
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cyan-300 mb-1">$ end_date</label>
                    <input
                      type="text"
                      disabled={item.current}
                      value={item.current ? 'Present' : item.endDate}
                      onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                      placeholder="e.g. Present"
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none disabled:bg-slate-900/50 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${item.id}`}
                  checked={item.current}
                  onChange={(e) => {
                    handleItemChange(index, 'current', e.target.checked);
                    if (e.target.checked) handleItemChange(index, 'endDate', 'Present');
                  }}
                  className="rounded text-cyan-400 focus:ring-cyan-400 bg-slate-900 border-slate-700"
                />
                <label htmlFor={`current-${item.id}`} className="text-xs text-slate-300">
                  Currently active in this position
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 mb-1">
                  $ responsibilities_metrics_bullet_points
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="• Architected microservices migration using Next.js 16...&#10;• Reduced infrastructure latency by 45%..."
                  className="w-full p-2.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
