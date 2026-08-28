'use client';

import React, { useState } from 'react';
import { SkillCategory } from '@/types/resume';
import { Code, Plus, Trash2, X } from 'lucide-react';

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
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: 'New Category',
      skills: [],
    };
    onChange([...skillCategories, newCat]);
  };

  const handleRemoveCategory = (catIndex: number) => {
    const updated = skillCategories.filter((_, i) => i !== catIndex);
    onChange(updated);
  };

  const handleAddSkillTag = (catIndex: number) => {
    const catId = skillCategories[catIndex].id;
    const value = (newSkillInput[catId] || '').trim();
    if (!value) return;

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
    const updated = [...skillCategories];
    const newSkills = updated[catIndex].skills.filter((_, i) => i !== skillIndex);
    updated[catIndex] = { ...updated[catIndex], skills: newSkills };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-600" />
            Skills Matrix
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Group technical skills into categories like AI/ML, Cloud, Frontend, etc.</p>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg px-3 py-1.5 shadow-sm transition inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {skillCategories.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <p className="text-xs text-gray-400 mb-2">No skill categories added yet</p>
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first skill category
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skillCategories.map((category, catIndex) => (
            <div key={category.id} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 hover:border-blue-200 transition">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={category.categoryName}
                  onChange={(e) => handleCategoryNameChange(catIndex, e.target.value)}
                  placeholder="Category Name (e.g. Technical Skills)"
                  className="font-semibold text-sm text-gray-900 bg-white px-3 py-1.5 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg outline-none transition placeholder:text-gray-400 w-1/2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(catIndex)}
                  className="p-1 text-gray-400 hover:text-red-500 transition"
                  title="Remove Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-gray-50 border border-gray-200 rounded-lg">
                {category.skills.length === 0 ? (
                  <span className="text-xs text-gray-500 italic">No skills added yet. Type below and press Enter.</span>
                ) : (
                  category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillTag(catIndex, skillIndex)}
                        className="hover:text-blue-900 transition"
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
                  className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400 flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkillTag(catIndex)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg px-3 py-2 transition whitespace-nowrap"
                >
                  Add Tag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
