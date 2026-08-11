'use client';

import React from 'react';
import { EducationItem } from '@/types/resume';
import { GraduationCap, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

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
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === education.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...education];
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
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Education & Degrees
          </h2>
          <p className="text-xs text-gray-500">List your academic qualifications and degrees earned.</p>
        </div>
        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-sm text-gray-500 mb-2">No education details added yet.</p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add education details
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Education #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === education.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-1 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Institution / School *</label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => handleItemChange(index, 'institution', e.target.value)}
                    placeholder="e.g. UC Berkeley"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Degree *</label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Field of Study / Major</label>
                  <input
                    type="text"
                    value={item.fieldOfStudy}
                    onChange={(e) => handleItemChange(index, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                    placeholder="e.g. Berkeley, CA"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Year / Date</label>
                    <input
                      type="text"
                      value={item.startDate || ''}
                      onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                      placeholder="e.g. 2014"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Graduation Year / End Date</label>
                    <input
                      type="text"
                      value={item.endDate}
                      onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                      placeholder="e.g. 2018"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">GPA / Honors (Optional)</label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => handleItemChange(index, 'gpa', e.target.value)}
                    placeholder="e.g. 3.9 / 4.0"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Highlights / Academic Honors (Optional)</label>
                <textarea
                  rows={2}
                  value={item.highlights || ''}
                  onChange={(e) => handleItemChange(index, 'highlights', e.target.value)}
                  placeholder="Dean's List for 6 semesters, Special honors research..."
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
