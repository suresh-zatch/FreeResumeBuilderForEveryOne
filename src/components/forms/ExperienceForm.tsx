'use client';

import React from 'react';
import { ExperienceItem } from '@/types/resume';
import { Plus, Trash2, ChevronUp, ChevronDown, Briefcase } from 'lucide-react';

interface Props {
  experience: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experience = [], onChange }) => {
  const handleItemChange = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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
    const updated = experience.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === experience.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...experience];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            Experience
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Detail technical roles, leadership impact, and quantifiable accomplishments.</p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg px-3 py-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <p className="text-xs text-gray-400 mb-2">No experience added yet</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={item.id ? `${item.id}-${index}` : `exp-${index}`}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 hover:border-blue-200 transition"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  Experience #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === experience.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition"
                    title="Delete Experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={item.company || ''}
                    onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                    placeholder="e.g. TechNova AI"
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={item.position || ''}
                    onChange={(e) => handleItemChange(index, 'position', e.target.value)}
                    placeholder="e.g. Lead Engineer"
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location || ''}
                    onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={item.startDate || ''}
                      onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                      placeholder="e.g. Mar 2022"
                      className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={item.current}
                      value={item.current ? 'Present' : (item.endDate || '')}
                      onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                      placeholder="e.g. Present"
                      className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${item.id || index}`}
                  checked={!!item.current}
                  onChange={(e) => {
                    handleItemChange(index, 'current', e.target.checked);
                    if (e.target.checked) handleItemChange(index, 'endDate', 'Present');
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <label htmlFor={`current-${item.id || index}`} className="text-xs text-gray-700 cursor-pointer select-none">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={item.description || ''}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="• Architected microservices migration using Next.js 16...&#10;• Reduced infrastructure latency by 45%..."
                  className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400 resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
