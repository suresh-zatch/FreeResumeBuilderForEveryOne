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
  const [isExporting, setIsExporting] = useState<boolean>(false);

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

  const handleExportPdf = async (mode: 'smart' | 'single-page' = 'smart') => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const name = resumeData.personalInfo.fullName.trim() || 'Resume';
      await exportResumeToPdf('resume-preview', `${name.replace(/\s+/g, '_')}_Resume.pdf`, mode);
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
    if (window.confirm('Reset all fields to sample data?')) {
      setResumeData(initialResumeData);
    }
  };

  const handleClearData = () => {
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
      accentColor: '#1877f2',
    });
  };

  const TABS = [
    { id: 'personal',       label: 'Personal',       icon: User },
    { id: 'experience',     label: 'Experience',     icon: Briefcase },
    { id: 'education',      label: 'Education',      icon: GraduationCap },
    { id: 'projects',       label: 'Projects',       icon: Rocket },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills',         label: 'Skills',         icon: Code },
    { id: 'theme',          label: 'Templates',      icon: Palette },
    { id: 'ai_assistant',   label: 'AI Assistant',   icon: Sparkles, badge: 'AI' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 flex flex-col font-sans">
      {/* Professional Header Bar */}
      <Header
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
        onResetSampleData={handleResetSampleData}
        onClearData={handleClearData}
        isExporting={isExporting}
      />

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Form Panel */}
        <div className="lg:col-span-6 xl:col-span-5 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col min-h-[730px] shadow-sm">
          {/* Tab Navigation */}
          <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1 text-[10px] font-semibold transition border-b-2 outline-none ${
                    isActive
                      ? 'border-blue-600 text-blue-600 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    {tab.badge && (
                      <span className="absolute -top-1.5 -right-2.5 text-[8px] font-bold uppercase px-1 rounded-full bg-blue-600 text-white leading-tight">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="truncate w-full text-center leading-none">{tab.label}</span>
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

        {/* Right Column: Resume Preview */}
        <div className="lg:col-span-6 xl:col-span-7 sticky top-20 h-[calc(100vh-100px)] hidden lg:block">
          <ResumePreview
            data={resumeData}
            onThemeChange={(theme) => setResumeData({ ...resumeData, theme })}
          />
        </div>

        {/* Mobile Preview Fallback */}
        <div className="block lg:hidden col-span-1 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            📄 Live Preview
          </h3>
          <div className="h-[600px] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <ResumePreview
              data={resumeData}
              onThemeChange={(theme) => setResumeData({ ...resumeData, theme })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
