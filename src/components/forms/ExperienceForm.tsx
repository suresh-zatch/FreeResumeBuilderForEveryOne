'use client';

import React from 'react';
import { ExperienceItem } from '@/types/resume';
import { Briefcase, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

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
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Work Experience
          </h2>
          <p className="text-xs text-gray-500">Detail your past employment, responsibilities, and achievements.</p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-sm text-gray-500 mb-2">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first work experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Experience #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === experience.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-1 text-red-500 hover:text-red-700 transition"
                    title="Delete experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Position / Job Title</label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => handleItemChange(index, 'position', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                    placeholder="e.g. Mountain View, CA"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                      placeholder="e.g. 2021-01 or Jan 2021"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={item.current}
                      value={item.current ? 'Present' : item.endDate}
                      onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                      placeholder="e.g. 2023-05 or Present"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-500"
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
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`current-${item.id}`} className="text-xs text-gray-700">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description & Key Accomplishments (bullet points)
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="• Developed features using React and TypeScript...&#10;• Reduced infrastructure latency by 30%..."
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
