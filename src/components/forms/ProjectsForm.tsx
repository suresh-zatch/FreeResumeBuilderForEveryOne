'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/types/resume';
import { Rocket, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink, X, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 text-cyan-400/70" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface Props {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects = [], onChange }) => {
  const [techInput, setTechInput] = useState<{ [projId: string]: string }>({});

  const handleItemChange = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddProject = () => {
    sfx.playClick();
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: [],
      link: '',
      githubUrl: '',
    };
    onChange([...projects, newItem]);
  };

  const handleRemove = (index: number) => {
    sfx.playPurge();
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;
    sfx.playHover();

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleAddTechTag = (projIndex: number) => {
    const projId = projects[projIndex].id;
    const value = (techInput[projId] || '').trim();
    if (!value) return;

    sfx.playClick();
    const updated = [...projects];
    const currentTechs = updated[projIndex].technologies || [];
    if (!currentTechs.includes(value)) {
      updated[projIndex] = {
        ...updated[projIndex],
        technologies: [...currentTechs, value],
      };
      onChange(updated);
    }
    setTechInput({ ...techInput, [projId]: '' });
  };

  const handleRemoveTechTag = (projIndex: number, techIndex: number) => {
    sfx.playHover();
    const updated = [...projects];
    const newTechs = (updated[projIndex].technologies || []).filter((_, i) => i !== techIndex);
    updated[projIndex] = { ...updated[projIndex], technologies: newTechs };
    onChange(updated);
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div>
          <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 uppercase tracking-wider">
            <Terminal className="w-5 h-5 text-cyan-400" />
            // MODULE 04: FEATURED_PROJECTS
          </h2>
          <p className="text-[11px] text-slate-400">Showcase software, web apps, AI models, or technical repositories.</p>
        </div>
        <button
          type="button"
          onMouseEnter={() => sfx.playHover()}
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> ADD_PROJECT
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-cyan-500/30 rounded-xl bg-slate-950/60">
          <p className="text-xs text-slate-400 mb-2">// NO_PROJECT_ENTRIES_DETECTED</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Initialize first project record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-950/90 border border-cyan-500/30 rounded-xl shadow-lg space-y-3 relative group hover:border-cyan-400 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  PROJECT #{index + 1}
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
                    disabled={index === projects.length - 1}
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
                  <label className="block text-xs font-bold text-cyan-300 mb-1">$ project_title *</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    placeholder="e.g. OmniAI Assistant"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-300 mb-1 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-cyan-400" /> $ live_demo_url
                  </label>
                  <input
                    type="text"
                    value={item.link || ''}
                    onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                    placeholder="e.g. https://omniai.dev"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-cyan-300 mb-1 flex items-center gap-1">
                    <GithubIcon /> $ repository_url
                  </label>
                  <input
                    type="text"
                    value={item.githubUrl || ''}
                    onChange={(e) => handleItemChange(index, 'githubUrl', e.target.value)}
                    placeholder="e.g. https://github.com/username/project"
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 mb-1">$ technologies_used</label>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-900 border border-slate-800 rounded-lg mb-2">
                  {(item.technologies || []).length === 0 ? (
                    <span className="text-xs text-slate-500 italic">// No tech tags added yet. Type below and click Add.</span>
                  ) : (
                    item.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechTag(index, techIdx)}
                          className="hover:text-white transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={techInput[item.id] || ''}
                    onChange={(e) => setTechInput({ ...techInput, [item.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechTag(index);
                      }
                    }}
                    placeholder="Add tech (e.g. Next.js, Python) and press Enter"
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-900 text-white border border-slate-800 rounded-lg focus:border-cyan-400 outline-none"
                  />
                  <button
                    type="button"
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => handleAddTechTag(index)}
                    className="px-3 py-1.5 text-xs font-bold text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
                  >
                    + TECH
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 mb-1">$ project_impact_description</label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Describe architecture, user base, key metrics..."
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
