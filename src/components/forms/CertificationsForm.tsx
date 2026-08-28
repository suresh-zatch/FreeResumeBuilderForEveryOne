'use client';

import React from 'react';
import { CertificationItem } from '@/types/resume';
import { Plus, Trash2, ChevronUp, ChevronDown, Award, ExternalLink } from 'lucide-react';

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
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleRemove = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === certifications.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...certifications];
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
            <Award className="w-4 h-4 text-blue-600" />
            Certifications
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">List official licenses, AWS / Cloud certifications, or honors.</p>
        </div>
        <button
          type="button"
          onClick={handleAddCert}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg px-3 py-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <p className="text-xs text-gray-400 mb-2">No certifications added yet</p>
          <button
            type="button"
            onClick={handleAddCert}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((item, index) => (
            <div
              key={item.id ? `${item.id}-${index}` : `cert-${index}`}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 hover:border-blue-200 transition"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  Certification #{index + 1}
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
                    disabled={index === certifications.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition"
                    title="Delete Certification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Certification Name</label>
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect Professional"
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    value={item.issuer || ''}
                    onChange={(e) => handleItemChange(index, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date Issued</label>
                  <input
                    type="text"
                    value={item.date || ''}
                    onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-1">
                    <ExternalLink className="w-3 h-3 text-gray-400" /> URL
                  </label>
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                    placeholder="e.g. https://credly.com/badges/..."
                    className="w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400"
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
