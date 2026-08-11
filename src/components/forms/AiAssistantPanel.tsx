'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { Sparkles, CheckCircle2, AlertCircle, Zap, ShieldCheck, Copy, ArrowRight } from 'lucide-react';

interface Props {
  data: ResumeData;
  onApplyPreset: (presetData: Partial<ResumeData>) => void;
}

export const AiAssistantPanel: React.FC<Props> = ({ data, onApplyPreset }) => {
  // Calculate dynamic ATS Score
  const computeAtsScore = () => {
    let score = 0;
    const checks = [];

    // Personal Info (25 pts)
    if (data.personalInfo.fullName.trim()) score += 5;
    if (data.personalInfo.jobTitle.trim()) score += 5;
    if (data.personalInfo.email.trim()) score += 5;
    if (data.personalInfo.phone.trim()) score += 5;
    if (data.personalInfo.summary.length >= 80) {
      score += 5;
      checks.push({ text: 'Strong professional summary (>80 chars)', pass: true });
    } else {
      checks.push({ text: 'Summary should be detailed (>80 chars)', pass: false });
    }

    // Experience (35 pts)
    if (data.experience.length >= 2) {
      score += 20;
      checks.push({ text: 'Contains 2+ work experience entries', pass: true });
    } else if (data.experience.length === 1) {
      score += 10;
      checks.push({ text: 'Add at least 2 work experiences', pass: false });
    } else {
      checks.push({ text: 'No work experience added yet', pass: false });
    }

    const hasBulletMetrics = data.experience.some((exp) =>
      /\d+%|\$\d+|\d+\+|\d+k/i.test(exp.description)
    );
    if (hasBulletMetrics) {
      score += 15;
      checks.push({ text: 'Bullet points contain quantifiable metrics (%, $, numbers)', pass: true });
    } else {
      checks.push({ text: 'Add quantifiable results (e.g. boosted speed by 40%)', pass: false });
    }

    // Skills (20 pts)
    const totalSkills = data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
    if (totalSkills >= 8) {
      score += 20;
      checks.push({ text: 'Rich skill keyword coverage (8+ skills)', pass: true });
    } else {
      checks.push({ text: 'Add more relevant skill keywords (aim for 8+)', pass: false });
    }

    // Projects & Certs (20 pts)
    if (data.projects && data.projects.length >= 1) {
      score += 10;
      checks.push({ text: 'Featured projects section included', pass: true });
    } else {
      checks.push({ text: 'Add at least 1 featured project', pass: false });
    }

    if (data.certifications && data.certifications.length >= 1) {
      score += 10;
      checks.push({ text: 'Certifications / credentials section included', pass: true });
    } else {
      checks.push({ text: 'Add relevant certifications or credentials', pass: false });
    }

    return { score: Math.min(100, score), checks };
  };

  const { score, checks } = computeAtsScore();

  const ROLE_PRESETS = [
    {
      title: 'Senior AI & Full-Stack Architect',
      subtitle: 'Next.js 16, Python, LLMs, Distributed Systems',
      theme: 'ai_fusion_2026' as const,
      accentColor: '#2563eb',
      data: {
        personalInfo: {
          fullName: 'Alex Vance',
          jobTitle: 'Senior AI & Full-Stack Architect',
          email: 'alex.vance@example.com',
          phone: '+1 (555) 234-5678',
          location: 'San Francisco, CA',
          website: 'https://alexvance.dev',
          linkedin: 'linkedin.com/in/alexvance',
          github: 'github.com/alexvance',
          summary:
            'Passionate Senior AI & Full-Stack Architect with 8+ years of experience engineering scalable LLM agent systems, cloud microservices, and real-time distributed applications. Proven track record of boosting enterprise platform throughput by 45% and leading high-performing engineering teams.',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        },
        experience: [
          {
            id: 'exp-1',
            company: 'TechNova AI Systems',
            position: 'Lead AI & Full-Stack Engineer',
            location: 'San Francisco, CA',
            startDate: '2023-01',
            endDate: 'Present',
            current: true,
            description:
              '• Architected multi-agent AI automation pipeline using Next.js 16, Python, and Vector DBs, processing 2M+ daily requests.\n• Spearheaded high-throughput real-time collaboration engine using WebSockets and Redis, reducing p99 latency by 50%.\n• Mentored 8 engineers and implemented CI/CD automated test suites cutting release cycle times by 65%.',
          },
          {
            id: 'exp-2',
            company: 'CloudPulse Technologies',
            position: 'Senior Frontend Engineer',
            location: 'San Jose, CA',
            startDate: '2020-04',
            endDate: '2022-12',
            current: false,
            description:
              '• Engineered interactive analytics dashboards in React, TypeScript, and Tailwind CSS serving 350k daily active users.\n• Optimized Core Web Vitals across core product flows achieving 99+ Lighthouse scores for performance & accessibility.\n• Created reusable component design system adopted by 5 cross-functional product squads.',
          },
        ],
        skillCategories: [
          {
            id: 's1',
            categoryName: 'AI & Full-Stack Core',
            skills: ['TypeScript', 'React.js', 'Next.js 16', 'Node.js', 'Python', 'Tailwind CSS', 'GraphQL', 'REST APIs'],
          },
          {
            id: 's2',
            categoryName: 'Cloud & Infrastructure',
            skills: ['AWS / GCP', 'Docker & Kubernetes', 'PostgreSQL', 'Redis', 'Vector DBs', 'CI/CD Pipelines', 'Vercel'],
          },
        ],
        projects: [
          {
            id: 'p1',
            title: 'OmniAI - Autonomous Code Assistant',
            description: 'Built a real-time AI pair-programming workspace with instant AST analysis and automated unit test generation.',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vector Search'],
            link: 'https://omniai-demo.dev',
            githubUrl: 'https://github.com/alexvance/omniai',
          },
        ],
      },
    },
    {
      title: 'Cloud Infrastructure & DevOps Lead',
      subtitle: 'Kubernetes, Terraform, AWS, Site Reliability',
      theme: 'cyber_tech_2026' as const,
      accentColor: '#0d9488',
      data: {
        personalInfo: {
          fullName: 'Jordan Miller',
          jobTitle: 'Cloud Infrastructure & DevOps Lead',
          email: 'jordan.miller@cloudtech.io',
          phone: '+1 (555) 987-6543',
          location: 'Austin, TX',
          website: 'https://jordanmiller.io',
          linkedin: 'linkedin.com/in/jordanmiller-devops',
          github: 'github.com/jordanm-infra',
          summary:
            'Senior Cloud Infrastructure Engineer with 9+ years specializing in automated multi-cloud deployments, GitOps workflows, Kubernetes cluster orchestration, and 99.999% uptime SRE architecture.',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        },
        experience: [
          {
            id: 'exp-1',
            company: 'DataScale Cloud',
            position: 'Principal DevOps Architect',
            location: 'Austin, TX',
            startDate: '2022-06',
            endDate: 'Present',
            current: true,
            description:
              '• Automated multi-region AWS EKS Kubernetes deployments using Terraform and ArgoCD, achieving 99.99% system availability.\n• Reduced annual cloud infrastructure spend by $340k through automated autoscaling policies and spot instance spot allocation.\n• Implemented zero-trust network policy mesh with Istio, securing data in transit across 500+ microservices.',
          },
        ],
        skillCategories: [
          {
            id: 's1',
            categoryName: 'Cloud & Infrastructure',
            skills: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Helm', 'ArgoCD', 'Istio Mesh', 'Prometheus'],
          },
        ],
      },
    },
    {
      title: 'Executive Vice President of Technology',
      subtitle: 'Engineering Leadership, Strategy, Scaling 100+ Teams',
      theme: 'executive_prime_2026' as const,
      accentColor: '#4f46e5',
      data: {
        personalInfo: {
          fullName: 'Elena Rostova',
          jobTitle: 'VP of Engineering & Technology',
          email: 'elena.rostova@enterprise.com',
          phone: '+1 (555) 456-7890',
          location: 'New York, NY',
          website: 'https://elenarostova.executive',
          linkedin: 'linkedin.com/in/elena-rostova-vp',
          github: '',
          summary:
            'Visionary Technology Executive with 14+ years driving digital transformation, scaling engineering organizations from 15 to 120+ engineers, and delivering $50M+ ARR enterprise SaaS platforms.',
          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        },
        experience: [
          {
            id: 'exp-1',
            company: 'Global Horizon Enterprise',
            position: 'VP of Engineering',
            location: 'New York, NY',
            startDate: '2021-02',
            endDate: 'Present',
            current: true,
            description:
              '• Scaled product engineering organization from 20 to 110+ FTEs across 4 global tech hubs while reducing turnover to under 4%.\n• Spearheaded core platform re-architecture powering $65M annual recurring revenue with zero unplanned downtime.\n• Managed $18M annual technology budget spanning cloud operations, R&D, and security compliance (SOC 2, ISO 27001).',
          },
        ],
        skillCategories: [
          {
            id: 's1',
            categoryName: 'Executive Leadership',
            skills: ['Engineering Organization Scaling', 'Product Strategy', 'P&L / Budgeting ($20M+)', 'M&A Due Diligence', 'Executive Talent Development'],
          },
        ],
      },
    },
  ];

  const ACTION_VERBS = [
    'Architected', 'Engineered', 'Spearheaded', 'Optimized', 'Automated',
    'Scaled', 'Pioneered', 'Accelerated', 'Deployed', 'Transformed',
    'Implemented', 'Reduced', 'Increased', 'Mentored', 'Orchestrated'
  ];

  return (
    <div className="space-y-5">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
          AI Era Resume Optimizer & ATS Analyzer
        </h2>
        <p className="text-xs text-gray-500">Real-time ATS score, role presets, and impact bullet point recommendations.</p>
      </div>

      {/* ATS Score Gauge Card */}
      <div className="p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-lg border border-indigo-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">ATS Readability & Keyword Score</h3>
              <p className="text-[11px] text-gray-300">Targeted for 2026 AI-driven Applicant Tracking Systems</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-2xl font-extrabold text-emerald-400">{score}</span>
            <span className="text-xs text-gray-300 font-semibold">/100</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              score >= 80 ? 'bg-emerald-400' : score >= 50 ? 'bg-amber-400' : 'bg-rose-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Dynamic Checklist */}
        <div className="space-y-2 pt-1">
          {checks.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              {item.pass ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className={item.pass ? 'text-gray-200' : 'text-amber-200'}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Role Presets */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
          <Zap className="w-4 h-4 text-amber-500" />
          1-Click 2026 Role Samples (Instant Fill)
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {ROLE_PRESETS.map((preset, i) => (
            <div
              key={i}
              className="p-3.5 bg-white border border-gray-200 hover:border-indigo-400 rounded-xl shadow-2xs transition flex items-center justify-between gap-3 group"
            >
              <div>
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition">
                  {preset.title}
                </h4>
                <p className="text-[10.5px] text-gray-500">{preset.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onApplyPreset({
                    ...preset.data,
                    theme: preset.theme,
                    accentColor: preset.accentColor,
                  })
                }
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-600 hover:text-white rounded-lg transition shrink-0"
              >
                Apply Preset <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Power Action Verbs Cheat Sheet */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
        <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          High-Impact Action Verbs for Bullet Points
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ACTION_VERBS.map((verb) => (
            <button
              key={verb}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(verb);
                alert(`Copied "${verb}" to clipboard!`);
              }}
              className="px-2 py-1 text-[11px] font-mono font-medium bg-white text-gray-700 border border-gray-200 rounded-md hover:border-blue-400 hover:text-blue-600 transition shadow-2xs"
            >
              {verb}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
