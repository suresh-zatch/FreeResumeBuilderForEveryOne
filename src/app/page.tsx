'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { initialResumeData } from '@/data/initialData';
import { exportResumeToPdf } from '@/utils/exportPdf';
import { Header } from '@/components/Header';
import { CyberParticleCanvas } from '@/components/CyberParticleCanvas';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { CertificationsForm } from '@/components/forms/CertificationsForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ThemeSelector } from '@/components/forms/ThemeSelector';
import { AiAssistantPanel } from '@/components/forms/AiAssistantPanel';
import { ResumePreview } from '@/components/ResumePreview';
import { User, Briefcase, GraduationCap, Rocket, Award, Code, Palette, Sparkles, Terminal } from 'lucide-react';
import { sfx } from '@/utils/audioSfx';

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

  const handleExportPdf = async () => {
    if (isExporting) return; // prevent double-click
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
    { id: 'personal', label: 'MOD_01: IDENTITY', icon: User },
    { id: 'experience', label: 'MOD_02: EXPERIENCE', icon: Briefcase },
    { id: 'education', label: 'MOD_03: EDUCATION', icon: GraduationCap },
    { id: 'projects', label: 'MOD_04: PROJECTS', icon: Rocket },
    { id: 'certifications', label: 'MOD_05: CERTS', icon: Award },
    { id: 'skills', label: 'MOD_06: SKILLS', icon: Code },
    { id: 'theme', label: 'MOD_07: THEMES', icon: Palette },
    { id: 'ai_assistant', label: 'MOD_08: AI_ATS', icon: Sparkles, badge: 'AI' },
  ];

  return (
    <div className="min-h-screen bg-[#05070b] text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500 selection:text-black">
      {/* 3D Particle Canvas Mesh Background */}
      <CyberParticleCanvas />

      {/* Top Cyber Command Center HUD Bar */}
      <Header
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
        onResetSampleData={handleResetSampleData}
        onClearData={handleClearData}
        isExporting={isExporting}
      />

      {/* Main Split-Screen Command Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start z-10 relative">
        {/* Left Column: Form Command Modules (5 Cols) */}
        <div className="lg:col-span-6 xl:col-span-5 cyber-glass rounded-2xl border border-cyan-500/30 overflow-hidden flex flex-col min-h-[730px] shadow-[0_0_30px_rgba(0,229,255,0.08)]">
          {/* Module Tab Navigation */}
          <div className="flex border-b border-cyan-500/20 bg-slate-950/80 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onMouseEnter={() => sfx.playHover()}
                  onClick={() => {
                    sfx.playClick();
                    setActiveTab(tab.id as ActiveTab);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-3 text-xs font-mono font-bold whitespace-nowrap transition border-b-2 outline-none ${
                    isActive
                      ? 'border-cyan-400 text-cyan-300 bg-slate-900 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-mono font-black uppercase tracking-wider px-1 rounded bg-emerald-500 text-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Module Form Content Area */}
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

        {/* Right Column: Floating 3D Holographic Resume Preview (7 Cols) */}
        <div className="lg:col-span-6 xl:col-span-7 sticky top-20 h-[calc(100vh-100px)] hidden lg:block">
          <ResumePreview
            data={resumeData}
            onThemeChange={(theme) => setResumeData({ ...resumeData, theme })}
          />
        </div>

        {/* Mobile Hologram Fallback */}
        <div className="block lg:hidden col-span-1 border-t border-cyan-500/20 pt-6">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase mb-3 flex items-center gap-1.5">
            <Terminal className="w-4 h-4" /> Live Holographic Canvas
          </h3>
          <div className="h-[600px] overflow-hidden rounded-xl border border-cyan-500/30">
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
