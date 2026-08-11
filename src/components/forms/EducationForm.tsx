'use client';

import React from 'react';
import { EducationItem } from '@/types/resume';
import { GraduationCap, Plus, Trash2, ChevronUp, ChevronDown, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

interface Props {
  education: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
}

export const EducationForm: React.FC<Props> = ({ education, onChange }) => {
  const handleItemChange = (index: number, field: keyof EducationItem, value: any) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddEducation = () => {
    sfx.playClick();
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      highlights: '',
    };
    onChange([...education, newItem]);
  };

  const handleRemove = (index: number) => {
    sfx.playPurge();
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === education.length - 1) return;
    sfx.playHover();

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...education];
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
            // MODULE 03: ACADEMIC_CREDENTIALS
          </h2>
          <p className="text-[11px] text-slate-400">List university degrees, diplomas, and academic achievements.</p>
        </div>
        <button
          type="button"
          onMouseEnter={() => sfx.playHover()}
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> ADD_EDUCATION
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-cyan-500/30 rounded-xl bg-slate-950/60">
          <p className="text-xs text-slate-400 mb-2">// NO_EDUCATION_RECORD_DETECTED</p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Initialize first academic record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-950/90 border border-cyan-500/30 rounded-xl shadow-lg space-y-3 relative group hover:border-cyan-400 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  ACADEMIC_RECORD #{index + 1}
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
                    disabled={index === education.length - 1}
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
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ institution_school *</label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => handleItemChange(index, 'institution', e.target.value)}
                    placeholder="e.g. UC Berkeley"
                    className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ degree_earned *</label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ field_of_study</label>
                  <input
                    type="text"
                    value={item.fieldOfStudy}
                    onChange={(e) => handleItemChange(index, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ location</label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                    placeholder="e.g. Berkeley, CA"
                    className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-cyan-300 mb-1">$ start_year</label>
                    <input
                      type="text"
                      value={item.startDate || ''}
                      onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                      placeholder="e.g. 2014"
                      className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-cyan-300 mb-1">$ end_year</label>
                    <input
                      type="text"
                      value={item.endDate}
                      onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                      placeholder="e.g. 2018"
                      className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ gpa_honors</label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => handleItemChange(index, 'gpa', e.target.value)}
                    placeholder="e.g. 3.9 / 4.0"
                    className="w-full px-3 py-1.5 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 mb-1">$ highlights_and_awards</label>
                <textarea
                  rows={2}
                  value={item.highlights || ''}
                  onChange={(e) => handleItemChange(index, 'highlights', e.target.value)}
                  placeholder="Dean's List for 6 semesters, Special honors research..."
                  className="w-full p-2 text-xs font-mono bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
