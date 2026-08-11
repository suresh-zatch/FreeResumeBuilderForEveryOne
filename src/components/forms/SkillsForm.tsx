'use client';

import React, { useState } from 'react';
import { SkillCategory } from '@/types/resume';
import { Code, Plus, Trash2, X, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

interface Props {
  skillCategories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ skillCategories, onChange }) => {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  const handleCategoryNameChange = (catIndex: number, newName: string) => {
    const updated = [...skillCategories];
    updated[catIndex] = { ...updated[catIndex], categoryName: newName };
    onChange(updated);
  };

  const handleAddCategory = () => {
    sfx.playClick();
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: 'New Category',
      skills: [],
    };
    onChange([...skillCategories, newCat]);
  };

  const handleRemoveCategory = (catIndex: number) => {
    sfx.playPurge();
    const updated = skillCategories.filter((_, i) => i !== catIndex);
    onChange(updated);
  };

  const handleAddSkillTag = (catIndex: number) => {
    const catId = skillCategories[catIndex].id;
    const value = (newSkillInput[catId] || '').trim();
    if (!value) return;

    sfx.playClick();
    const updated = [...skillCategories];
    if (!updated[catIndex].skills.includes(value)) {
      updated[catIndex] = {
        ...updated[catIndex],
        skills: [...updated[catIndex].skills, value],
      };
      onChange(updated);
    }
    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const handleRemoveSkillTag = (catIndex: number, skillIndex: number) => {
    sfx.playHover();
    const updated = [...skillCategories];
    const newSkills = updated[catIndex].skills.filter((_, i) => i !== skillIndex);
    updated[catIndex] = { ...updated[catIndex], skills: newSkills };
    onChange(updated);
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div>
          <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
            <Terminal className="w-5 h-5 text-cyan-400" />
            // MODULE 06: SKILLS_MATRIX
          </h2>
          <p className="text-[11px] text-slate-400">Group technical skills into categories like AI/ML, Cloud, Frontend, etc.</p>
        </div>
        <button
          type="button"
          onMouseEnter={() => sfx.playHover()}
          onClick={handleAddCategory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> ADD_CATEGORY
        </button>
      </div>

      {skillCategories.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-cyan-500/30 rounded-xl bg-slate-950/60">
          <p className="text-xs text-slate-400 mb-2">// NO_SKILL_CATEGORIES_DETECTED</p>
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Initialize first skill category
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skillCategories.map((category, catIndex) => (
            <div key={category.id} className="p-4 bg-slate-950/90 border border-cyan-500/30 rounded-xl shadow-lg space-y-3">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={category.categoryName}
                  onChange={(e) => handleCategoryNameChange(catIndex, e.target.value)}
                  placeholder="Category Name (e.g. Technical Skills)"
                  className="font-bold text-xs text-cyan-300 bg-slate-900 px-3 py-1.5 border border-slate-800 focus:border-cyan-400 rounded-lg outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(catIndex)}
                  className="p-1 text-rose-400 hover:text-rose-300 transition"
                  title="Remove Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-slate-900 border border-slate-800 rounded-lg">
                {category.skills.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">// No skills added yet. Type below and press Enter.</span>
                ) : (
                  category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillTag(catIndex, skillIndex)}
                        className="hover:text-white transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Add Skill Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillInput[category.id] || ''}
                  onChange={(e) => setNewSkillInput({ ...newSkillInput, [category.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkillTag(catIndex);
                    }
                  }}
                  placeholder="Type skill tag (e.g. TypeScript, PyTorch) and press Enter"
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none font-mono"
                />
                <button
                  type="button"
                  onMouseEnter={() => sfx.playHover()}
                  onClick={() => handleAddSkillTag(catIndex)}
                  className="px-3 py-1.5 text-xs font-bold text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
                >
                  + TAG
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
