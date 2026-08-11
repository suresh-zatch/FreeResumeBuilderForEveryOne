'use client';

import React from 'react';
import { CertificationItem } from '@/types/resume';
import { Award, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

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
      id: `cert-${Date.now()}`,
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
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Certifications & Credentials
          </h2>
          <p className="text-xs text-gray-500">List official licenses, AWS / Cloud certifications, or honors.</p>
        </div>
        <button
          type="button"
          onClick={handleAddCert}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-sm text-gray-500 mb-2">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAddCert}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add a certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Certification #{index + 1}
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
                    disabled={index === certifications.length - 1}
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">Certification Name *</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect Professional"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    value={item.issuer}
                    onChange={(e) => handleItemChange(index, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date Earned / Year</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                    placeholder="e.g. 2024 or May 2024"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-gray-400" /> Verification URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                    placeholder="e.g. https://credly.com/badges/..."
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
