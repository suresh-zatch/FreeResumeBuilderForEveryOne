'use client';

import React, { useRef } from 'react';
import { PersonalInfo } from '@/types/resume';
import { User, Mail, Phone, MapPin, Globe, FileText, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

const LinkedinIcon = () => (
  <svg className="w-4 h-4 text-blue-500 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 text-gray-600 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface Props {
  personalInfo: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ personalInfo, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        handleChange('photoUrl', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const inputClass = "w-full pl-9 pr-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400";
  const inputClassNoIcon = "w-full px-3 py-2 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-gray-400";

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          Personal Information
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Add your contact details and professional summary.</p>
      </div>

      {/* Profile Photo Uploader */}
      <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200 bg-blue-50 shrink-0 flex items-center justify-center">
          {personalInfo.photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-blue-300" />
          )}
        </div>
        <div className="flex-1 space-y-1.5 min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-700">Profile Photo</label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" /> Upload Image
            </button>
            {personalInfo.photoUrl && (
              <button
                type="button"
                onClick={() => handleChange('photoUrl', '')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
          <p className="text-[10px] text-gray-400">Max size 5MB (JPG, PNG, WebP)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Vance"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Job Title *</label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className={inputClassNoIcon}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. alex@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +1 (555) 000-0000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Website</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="e.g. https://alexvance.dev"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn</label>
          <div className="relative">
            <LinkedinIcon />
            <input
              type="text"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="e.g. linkedin.com/in/alexvance"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">GitHub</label>
          <div className="relative">
            <GithubIcon />
            <input
              type="text"
              value={personalInfo.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="e.g. github.com/alexvance"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
          <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
          Photo URL (optional)
        </label>
        <input
          type="text"
          value={personalInfo.photoUrl || ''}
          onChange={(e) => handleChange('photoUrl', e.target.value)}
          placeholder="e.g. https://images.unsplash.com/photo-..."
          className={inputClassNoIcon}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
          <FileText className="w-3.5 h-3.5 text-gray-400" />
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
          className="w-full p-3 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-y placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};
