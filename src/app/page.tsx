'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { initialResumeData } from '@/data/initialData';
import { exportResumeToPdf } from '@/utils/exportPdf';
import { Header } from '@/components/Header';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { CertificationsForm } from '@/components/forms/CertificationsForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ThemeSelector } from '@/components/forms/ThemeSelector';
import { AiAssistantPanel } from '@/components/forms/AiAssistantPanel';
import { ResumePreview } from '@/components/ResumePreview';
import { User, Briefcase, GraduationCap, Rocket, Award, Code, Palette, Sparkles } from 'lucide-react';

type ActiveTab =
  | 'personal'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'skills'
  | 'theme'
  | 'ai_assistant';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<ActiveTab>('personal');
  const [isExporting, setIsExporting] = useState(false);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resume_builder_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setResumeData({ ...initialResumeData, ...parsed });
      }
    } catch (err) {
      console.error('Failed to parse saved resume data:', err);
    }
  }, []);

  // Persist state to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
    } catch (err) {
      console.error('Failed to save resume data:', err);
    }
  }, [resumeData]);

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const name = resumeData.personalInfo.fullName.trim() || 'Resume';
      await exportResumeToPdf('resume-preview', `${name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (e) {
      console.error('[Page] PDF export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetSampleData = () => {
    if (window.confirm('Reset all fields to sample 2026 data?')) {
      setResumeData(initialResumeData);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all form entries?')) {
      setResumeData({
        personalInfo: {
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          summary: '',
          photoUrl: '',
        },
        experience: [],
        education: [],
        skillCategories: [],
        projects: [],
        certifications: [],
        theme: 'ai_fusion_2026',
        accentColor: '#2563eb',
      });
    }
  };

  const TABS = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'theme', label: '2026 Templates', icon: Palette },
    { id: 'ai_assistant', label: 'AI & ATS Score', icon: Sparkles, badge: 'NEW' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
        onResetSampleData={handleResetSampleData}
        onClearData={handleClearData}
      />

      {/* Main Split-Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Forms & Controls (5 Cols) */}
        <div className="lg:col-span-6 xl:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[720px]">
          {/* Tab Bar */}
          <div className="flex border-b border-slate-200 bg-slate-100/70 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-1.5 px-3.5 py-3 text-xs font-semibold whitespace-nowrap transition border-b-2 outline-none ${
                    isActive
                      ? 'border-blue-600 text-blue-600 bg-white shadow-2xs'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-600 text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="p-5 flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {activeTab === 'personal' && (
              <PersonalInfoForm
                personalInfo={resumeData.personalInfo}
                onChange={(updated) => setResumeData({ ...resumeData, personalInfo: updated })}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceForm
                experience={resumeData.experience}
                onChange={(updated) => setResumeData({ ...resumeData, experience: updated })}
              />
            )}

            {activeTab === 'education' && (
              <EducationForm
                education={resumeData.education}
                onChange={(updated) => setResumeData({ ...resumeData, education: updated })}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsForm
                projects={resumeData.projects || []}
                onChange={(updated) => setResumeData({ ...resumeData, projects: updated })}
              />
            )}

            {activeTab === 'certifications' && (
              <CertificationsForm
                certifications={resumeData.certifications || []}
                onChange={(updated) => setResumeData({ ...resumeData, certifications: updated })}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsForm
                skillCategories={resumeData.skillCategories}
                onChange={(updated) => setResumeData({ ...resumeData, skillCategories: updated })}
              />
            )}

            {activeTab === 'theme' && (
              <ThemeSelector
                currentTheme={resumeData.theme}
                accentColor={resumeData.accentColor}
                onThemeChange={(theme) => setResumeData({ ...resumeData, theme })}
                onColorChange={(accentColor) => setResumeData({ ...resumeData, accentColor })}
              />
            )}

            {activeTab === 'ai_assistant' && (
              <AiAssistantPanel
                data={resumeData}
                onApplyPreset={(presetData) => setResumeData({ ...resumeData, ...presetData })}
              />
            )}
          </div>
        </div>

        {/* Right Column: Live Resume Preview (7 Cols) */}
        <div className="lg:col-span-6 xl:col-span-7 sticky top-20 h-[calc(100vh-100px)] hidden lg:block">
          <ResumePreview data={resumeData} />
        </div>

        {/* Mobile Preview Fallback */}
        <div className="block lg:hidden col-span-1 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Live Resume Preview</h3>
          <div className="h-[600px] overflow-hidden rounded-xl border border-slate-200">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>

      {/* Export Overlay Spinner */}
      {isExporting && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center text-white">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold">Generating your high-res 2026 A4 PDF...</p>
          </div>
        </div>
      )}
    </div>
  );
}
