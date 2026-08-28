'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/types/resume';
import { Plus, Trash2, ChevronUp, ChevronDown, ExternalLink, X, FolderKanban } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
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
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: '',
      description: '',
      technologies: [],
      link: '',
      githubUrl: '',
    };
    onChange([...projects, newItem]);
  };

  const handleRemove = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleAddTechTag = (projIndex: number) => {
    const item = projects[projIndex];
    const keyId = item.id || `proj-${projIndex}`;
    const value = (techInput[keyId] || '').trim();
    if (!value) return;

    const updated = [...projects];
    const currentTechs = updated[projIndex].technologies || [];
    if (!currentTechs.includes(value)) {
      updated[projIndex] = {
        ...updated[projIndex],
        technologies: [...currentTechs, value],
      };
      onChange(updated);
    }
    setTechInput({ ...techInput, [keyId]: '' });
  };

  const handleRemoveTechTag = (projIndex: number, techIndex: number) => {
    const updated = [...projects];
    const newTechs = (updated[projIndex].technologies || []).filter((_, i) => i !== techIndex);
    updated[projIndex] = { ...updated[projIndex], technologies: newTechs };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-blue-600" />
            Projects
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Showcase software, web apps, AI models, or technical repositories.</p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg px-3 py-1.5 shadow-sm transition inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <p className="text-xs text-gray-400 mb-2">No projects added yet</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((item, index) => {
            const keyId = item.id || `proj-${index}`;
            return (
              <div
                key={`${keyId}-${index}`}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 hover:border-blue-200 transition relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">
                    Project #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20 transition"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === projects.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20 transition"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Project Title</label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      placeholder="e.g. OmniAI Assistant"
                      className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3 text-gray-500" /> Live Demo URL
                    </label>
                    <input
                      type="text"
                      value={item.link || ''}
                      onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                      placeholder="e.g. https://omniai.dev"
                      className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <GithubIcon /> Repository URL
                    </label>
                    <input
                      type="text"
                      value={item.githubUrl || ''}
                      onChange={(e) => handleItemChange(index, 'githubUrl', e.target.value)}
                      placeholder="e.g. https://github.com/username/project"
                      className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Technologies Used</label>
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-gray-50 border border-gray-200 rounded-lg mb-2">
                    {(item.technologies || []).length === 0 ? (
                      <span className="text-xs text-gray-500 italic">No technologies added yet. Type below and click Add.</span>
                    ) : (
                      item.technologies.map((tech, techIdx) => (
                        <span
                          key={`${tech}-${techIdx}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTechTag(index, techIdx)}
                            className="hover:text-blue-900 transition"
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
                      value={techInput[keyId] || ''}
                      onChange={(e) => setTechInput({ ...techInput, [keyId]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTechTag(index);
                        }
                      }}
                      placeholder="Add tech (e.g. Next.js, Python) and press Enter"
                      className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTechTag(index)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg px-3 py-2 transition whitespace-nowrap"
                    >
                      Add Tech
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Impact & Description</label>
                  <textarea
                    rows={3}
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Describe architecture, user base, key metrics..."
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400 resize-y"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
