'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import {
  Sparkles, CheckCircle2, AlertCircle, Zap, ShieldCheck, ArrowRight,
  Code2, Cloud, Briefcase, Database, BarChart2, Palette,
  HeartPulse, DollarSign, Megaphone, Shield, FlaskConical,
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onApplyPreset: (presetData: Partial<ResumeData>) => void;
}

const CATEGORIES = [
  { id: 'all',         label: 'All Roles',    icon: Sparkles    },
  { id: 'engineering', label: 'Engineering',  icon: Code2       },
  { id: 'cloud',       label: 'Cloud/DevOps', icon: Cloud       },
  { id: 'data',        label: 'Data & AI',    icon: Database    },
  { id: 'design',      label: 'Design',       icon: Palette     },
  { id: 'product',     label: 'Product',      icon: BarChart2   },
  { id: 'leadership',  label: 'Leadership',   icon: Briefcase   },
  { id: 'finance',     label: 'Finance',      icon: DollarSign  },
  { id: 'marketing',   label: 'Marketing',    icon: Megaphone   },
  { id: 'healthcare',  label: 'Healthcare',   icon: HeartPulse  },
  { id: 'security',    label: 'Security',     icon: Shield      },
  { id: 'science',     label: 'Science',      icon: FlaskConical},
];

const ROLE_PRESETS = [
  // ── Engineering ───────────────────────────────────────────────────────────
  {
    category: 'engineering', emoji: '⚡',
    title: 'Senior AI & Full-Stack Architect',
    subtitle: 'Next.js 16, Python, LLMs, Distributed Systems',
    theme: 'ai_fusion_2026' as const, accentColor: '#2563eb',
    data: {
      personalInfo: { fullName: 'Alex Vance', jobTitle: 'Senior AI & Full-Stack Architect', email: 'alex.vance@example.com', phone: '+1 (555) 234-5678', location: 'San Francisco, CA', website: 'https://alexvance.dev', linkedin: 'linkedin.com/in/alexvance', github: 'github.com/alexvance', summary: 'Passionate Senior AI & Full-Stack Architect with 8+ years of experience engineering scalable LLM agent systems, cloud microservices, and real-time distributed applications. Proven track record of boosting enterprise platform throughput by 45% and leading high-performing engineering teams.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'TechNova AI Systems', position: 'Lead AI & Full-Stack Engineer', location: 'San Francisco, CA', startDate: '2023-01', endDate: 'Present', current: true, description: '• Architected multi-agent AI automation pipeline using Next.js 16, Python, and Vector DBs, processing 2M+ daily requests.\n• Spearheaded real-time collaboration engine using WebSockets and Redis, reducing p99 latency by 50%.\n• Mentored 8 engineers and implemented CI/CD test suites cutting release cycle times by 65%.' },
        { id: 'e2', company: 'CloudPulse Technologies', position: 'Senior Frontend Engineer', location: 'San Jose, CA', startDate: '2020-04', endDate: '2022-12', current: false, description: '• Engineered analytics dashboards in React, TypeScript, and Tailwind CSS serving 350k daily active users.\n• Optimized Core Web Vitals achieving 99+ Lighthouse scores.\n• Created reusable component design system adopted by 5 product squads.' },
      ],
      education: [{ id: 'ed1', institution: 'MIT', degree: 'B.S. Computer Science', fieldOfStudy: 'CS & AI', location: 'Cambridge, MA', startDate: '2014-09', endDate: '2018-06', gpa: '3.9', highlights: 'Focused on distributed systems and machine learning.' }],
      skillCategories: [
        { id: 's1', categoryName: 'AI & Full-Stack Core', skills: ['TypeScript', 'React.js', 'Next.js 16', 'Node.js', 'Python', 'Tailwind CSS', 'GraphQL', 'REST APIs'] },
        { id: 's2', categoryName: 'Cloud & Infrastructure', skills: ['AWS / GCP', 'Docker & Kubernetes', 'PostgreSQL', 'Redis', 'Vector DBs', 'CI/CD Pipelines', 'Vercel'] },
      ],
      projects: [{ id: 'p1', title: 'OmniAI - Autonomous Code Assistant', description: 'Real-time AI pair-programming workspace with AST analysis and automated unit test generation.', technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Vector Search'], link: 'https://omniai-demo.dev', githubUrl: 'https://github.com/alexvance/omniai' }],
      certifications: [{ id: 'c1', name: 'AWS Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2024-01', url: 'https://aws.amazon.com/certification' }],
    },
  },
  {
    category: 'engineering', emoji: '📱',
    title: 'Senior Mobile Engineer (iOS/Android)',
    subtitle: 'React Native, Swift, Kotlin, Flutter',
    theme: 'silicon_valley_2026' as const, accentColor: '#7c3aed',
    data: {
      personalInfo: { fullName: 'Ryan Chen', jobTitle: 'Senior Mobile Engineer', email: 'ryan.chen@mobilepro.io', phone: '+1 (555) 312-4987', location: 'Seattle, WA', website: 'https://ryanchen.dev', linkedin: 'linkedin.com/in/ryanchenmobile', github: 'github.com/rchen-mobile', summary: 'Senior Mobile Engineer with 7+ years delivering 5-star iOS and Android applications to 10M+ users. Expert in React Native, Swift, Kotlin, and Flutter with deep expertise in performance profiling, push notifications, and App Store optimization.', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'AppVault Inc.', position: 'Senior Mobile Engineer', location: 'Seattle, WA', startDate: '2022-03', endDate: 'Present', current: true, description: '• Led React Native rewrite of flagship app, reducing bundle size by 42% and achieving 4.9★ App Store rating with 2M+ downloads.\n• Built real-time in-app messaging with offline-first caching, reducing crash rate by 85%.\n• Integrated Stripe in-app purchases generating $3.2M additional annual revenue.' },
        { id: 'e2', company: 'SwiftWave Studio', position: 'iOS Developer', location: 'Portland, OR', startDate: '2019-06', endDate: '2022-02', current: false, description: '• Shipped 6 Swift/SwiftUI applications with combined 1.5M+ downloads.\n• Optimized Core Data persistence cutting app launch time by 38%.' },
      ],
      education: [{ id: 'ed1', institution: 'University of Washington', degree: 'B.S. Computer Science', fieldOfStudy: 'Mobile & Software Engineering', location: 'Seattle, WA', startDate: '2015-09', endDate: '2019-06', gpa: '3.8' }],
      skillCategories: [
        { id: 's1', categoryName: 'Mobile Development', skills: ['React Native', 'Swift / SwiftUI', 'Kotlin / Jetpack Compose', 'Flutter', 'Expo', 'Xcode', 'Android Studio'] },
        { id: 's2', categoryName: 'Backend & Tools', skills: ['Node.js', 'Firebase', 'REST APIs', 'GraphQL', 'Push Notifications', 'CI/CD (Fastlane)', 'TestFlight'] },
      ],
      projects: [{ id: 'p1', title: 'FitSync – AI Health Tracker', description: 'Cross-platform fitness app with AI workout recommendations and Apple Health integration.', technologies: ['React Native', 'TensorFlow Lite', 'HealthKit', 'Firebase'], link: '', githubUrl: '' }],
      certifications: [{ id: 'c1', name: 'Google Associate Android Developer', issuer: 'Google', date: '2023-05', url: '' }],
    },
  },
  {
    category: 'engineering', emoji: '🦀',
    title: 'Backend Engineer (Rust / Go)',
    subtitle: 'Systems Programming, High-Performance APIs',
    theme: 'hyper_grid_2026' as const, accentColor: '#dc2626',
    data: {
      personalInfo: { fullName: 'Kai Nakamura', jobTitle: 'Senior Backend Engineer – Systems', email: 'kai.nakamura@lowlatency.dev', phone: '+1 (555) 718-2341', location: 'Austin, TX', website: 'https://kainakamura.dev', linkedin: 'linkedin.com/in/kai-nakamura-rust', github: 'github.com/kai-nakamura', summary: 'Systems-level Backend Engineer with 6+ years building mission-critical high-throughput APIs, real-time data pipelines, and low-latency trading infrastructure in Rust and Go. Achieved sub-5ms p99 latency at 500k RPS.', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'QuantumEdge Trading Systems', position: 'Principal Backend Engineer', location: 'Austin, TX', startDate: '2022-08', endDate: 'Present', current: true, description: '• Designed ultra-low-latency order matching engine in Rust achieving sub-3ms p99 at 500k transactions/sec.\n• Migrated core payment microservices from Python to Go, reducing memory footprint by 70% and AWS costs by $280k/year.\n• Built distributed in-memory cache layer using Tokio achieving 12M cache hits/day with 99.98% hit rate.' },
      ],
      education: [{ id: 'ed1', institution: 'Carnegie Mellon University', degree: 'M.S. Computer Science', fieldOfStudy: 'Systems & Programming Languages', location: 'Pittsburgh, PA', startDate: '2016-08', endDate: '2018-05', gpa: '4.0' }],
      skillCategories: [
        { id: 's1', categoryName: 'Systems Engineering', skills: ['Rust (Tokio, Actix-Web)', 'Go (Gin, gRPC)', 'C++', 'WebAssembly', 'SIMD Optimization', 'Lock-free Data Structures'] },
        { id: 's2', categoryName: 'Infrastructure', skills: ['Kafka', 'Redis Cluster', 'PostgreSQL', 'ClickHouse', 'Prometheus + Grafana', 'Linux Kernel Tuning', 'AWS'] },
      ],
      projects: [{ id: 'p1', title: 'RapidMQ – Zero-Copy Message Broker', description: 'Open-source Rust-based message broker achieving 10M msg/sec throughput with zero-copy I/O via io_uring.', technologies: ['Rust', 'io_uring', 'Tokio'], link: '', githubUrl: 'https://github.com/kai-nakamura/rapidmq' }],
      certifications: [],
    },
  },

  // ── Cloud / DevOps ────────────────────────────────────────────────────────
  {
    category: 'cloud', emoji: '☁️',
    title: 'Cloud Infrastructure & DevOps Lead',
    subtitle: 'Kubernetes, Terraform, AWS, Site Reliability',
    theme: 'cyber_tech_2026' as const, accentColor: '#0d9488',
    data: {
      personalInfo: { fullName: 'Jordan Miller', jobTitle: 'Cloud Infrastructure & DevOps Lead', email: 'jordan.miller@cloudtech.io', phone: '+1 (555) 987-6543', location: 'Austin, TX', website: 'https://jordanmiller.io', linkedin: 'linkedin.com/in/jordanmiller-devops', github: 'github.com/jordanm-infra', summary: 'Senior Cloud Infrastructure Engineer with 9+ years specializing in automated multi-cloud deployments, GitOps workflows, Kubernetes cluster orchestration, and 99.999% uptime SRE architecture.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'DataScale Cloud', position: 'Principal DevOps Architect', location: 'Austin, TX', startDate: '2022-06', endDate: 'Present', current: true, description: '• Automated multi-region AWS EKS Kubernetes deployments using Terraform and ArgoCD, achieving 99.99% system availability.\n• Reduced annual cloud infrastructure spend by $340k through automated autoscaling policies.\n• Implemented zero-trust network policy mesh with Istio across 500+ microservices.' },
        { id: 'e2', company: 'Nexus Platform', position: 'Senior DevOps Engineer', location: 'Remote', startDate: '2019-01', endDate: '2022-05', current: false, description: '• Built CI/CD GitOps pipelines with GitHub Actions, reducing deployment lead time from 4 hours to 8 minutes.\n• Containerized 40+ legacy services using Docker, reducing MTTR by 60%.' },
      ],
      education: [{ id: 'ed1', institution: 'Texas A&M University', degree: 'B.S. Information Technology', fieldOfStudy: 'Network & Systems Administration', location: 'College Station, TX', startDate: '2011-09', endDate: '2015-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'Cloud & Infrastructure', skills: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Helm', 'ArgoCD', 'Istio', 'Prometheus'] },
        { id: 's2', categoryName: 'DevOps & SRE', skills: ['GitHub Actions', 'Jenkins', 'Ansible', 'Datadog', 'PagerDuty', 'Linux', 'Bash / Python', 'SLO/SLA Design'] },
      ],
      projects: [{ id: 'p1', title: 'K8s AutoScale Framework', description: 'Custom Kubernetes operator for predictive autoscaling based on ML traffic forecasting, cutting compute costs by 35%.', technologies: ['Go', 'Kubernetes Operator SDK', 'Prometheus'], link: '', githubUrl: 'https://github.com/jordanm-infra/k8s-autoscale' }],
      certifications: [
        { id: 'c1', name: 'AWS Certified DevOps Engineer – Professional', issuer: 'Amazon Web Services', date: '2023-03', url: '' },
        { id: 'c2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2022-11', url: '' },
      ],
    },
  },
  {
    category: 'cloud', emoji: '🔧',
    title: 'Site Reliability Engineer (SRE)',
    subtitle: 'Google SRE, Observability, Chaos Engineering',
    theme: 'neon_futuristic_2026' as const, accentColor: '#059669',
    data: {
      personalInfo: { fullName: 'Sam Rivera', jobTitle: 'Senior Site Reliability Engineer', email: 'sam.rivera@sre.tech', phone: '+1 (555) 432-8976', location: 'Mountain View, CA', website: '', linkedin: 'linkedin.com/in/sam-rivera-sre', github: 'github.com/srivera-sre', summary: 'Senior SRE with 7+ years maintaining 99.99% uptime for hyperscale distributed systems serving 500M+ daily active users. Expert in chaos engineering, observability stacks, and SLO-driven reliability practices.', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'HyperScale Corp', position: 'Senior SRE', location: 'Mountain View, CA', startDate: '2021-04', endDate: 'Present', current: true, description: '• Maintained 99.997% SLA across 12 globally distributed microservices processing 8B requests/day.\n• Designed chaos engineering framework (GameDay) that surfaced 23 critical failure modes pre-production.\n• Built unified observability platform (OpenTelemetry + Grafana + Loki), reducing MTTR from 42 min to 6 min.' },
      ],
      education: [{ id: 'ed1', institution: 'Stanford University', degree: 'B.S. Computer Science', fieldOfStudy: 'Systems & Networking', location: 'Stanford, CA', startDate: '2013-09', endDate: '2017-06' }],
      skillCategories: [
        { id: 's1', categoryName: 'SRE & Observability', skills: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Datadog', 'Jaeger', 'SLO/SLA Design', 'Chaos Monkey', 'PagerDuty'] },
        { id: 's2', categoryName: 'Infrastructure', skills: ['GCP / AWS', 'Kubernetes', 'Terraform', 'Spanner', 'BigQuery', 'Pub/Sub', 'Go', 'Python'] },
      ],
      projects: [],
      certifications: [{ id: 'c1', name: 'Google Professional Cloud DevOps Engineer', issuer: 'Google Cloud', date: '2023-09', url: '' }],
    },
  },

  // ── Data & AI ─────────────────────────────────────────────────────────────
  {
    category: 'data', emoji: '🤖',
    title: 'Machine Learning Engineer',
    subtitle: 'PyTorch, LLMs, MLOps, Transformers',
    theme: 'quantum_clean_2026' as const, accentColor: '#7c3aed',
    data: {
      personalInfo: { fullName: 'Priya Sharma', jobTitle: 'Senior Machine Learning Engineer', email: 'priya.sharma@mlpro.ai', phone: '+91 98765 43210', location: 'Bengaluru, India', website: 'https://priyasharma.ai', linkedin: 'linkedin.com/in/priyasharma-ml', github: 'github.com/priya-ml', summary: 'Senior ML Engineer with 6+ years building and deploying large-scale machine learning systems. Specialized in fine-tuning LLMs, building RAG pipelines, and production MLOps infrastructure. Published 3 NeurIPS papers on efficient transformer architectures.', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'DeepMind Labs India', position: 'Senior ML Engineer', location: 'Bengaluru, India', startDate: '2022-07', endDate: 'Present', current: true, description: '• Fine-tuned 70B parameter LLaMA-3 model achieving 23% improvement in domain-specific BLEU score.\n• Built end-to-end MLOps pipeline (Kubeflow + MLflow + Seldon) reducing model deployment time from 2 weeks to 4 hours.\n• Designed RAG system with FAISS vector store serving 50k daily queries with sub-200ms P99 latency.' },
        { id: 'e2', company: 'Infosys AI Lab', position: 'ML Engineer', location: 'Pune, India', startDate: '2019-07', endDate: '2022-06', current: false, description: '• Trained computer vision models for manufacturing defect detection achieving 96.4% precision.\n• Reduced model inference latency by 68% through TensorRT quantization and ONNX export.' },
      ],
      education: [{ id: 'ed1', institution: 'IIT Bombay', degree: 'M.Tech Computer Science', fieldOfStudy: 'Artificial Intelligence & Machine Learning', location: 'Mumbai, India', startDate: '2017-07', endDate: '2019-06', gpa: '9.2/10' }],
      skillCategories: [
        { id: 's1', categoryName: 'ML & AI', skills: ['PyTorch', 'TensorFlow', 'Transformers (HuggingFace)', 'LLM Fine-tuning', 'RAG Systems', 'LangChain', 'Scikit-learn', 'OpenCV'] },
        { id: 's2', categoryName: 'MLOps & Data', skills: ['Kubeflow', 'MLflow', 'Seldon', 'FAISS', 'Pinecone', 'Apache Spark', 'Python', 'CUDA', 'Docker'] },
      ],
      projects: [{ id: 'p1', title: 'DocuGenius – Enterprise Document Intelligence', description: 'Production RAG system parsing 10M+ enterprise documents with 97% accurate Q&A using GPT-4o.', technologies: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'GPT-4o'], link: '', githubUrl: 'https://github.com/priya-ml/docugenius' }],
      certifications: [{ id: 'c1', name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2023-01', url: '' }],
    },
  },
  {
    category: 'data', emoji: '📊',
    title: 'Senior Data Analyst / BI Engineer',
    subtitle: 'SQL, Tableau, Power BI, dbt, Snowflake',
    theme: 'metro_compact_2026' as const, accentColor: '#0369a1',
    data: {
      personalInfo: { fullName: 'Maya Thompson', jobTitle: 'Senior Data Analyst & BI Engineer', email: 'maya.thompson@datainsights.co', phone: '+1 (555) 612-3890', location: 'Chicago, IL', website: '', linkedin: 'linkedin.com/in/maya-thompson-bi', github: '', summary: 'Senior Data Analyst with 6+ years transforming raw data into strategic business intelligence. Expert in executive dashboards, self-service analytics platforms, and ELT pipelines that drive $20M+ in data-informed revenue decisions annually.', photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'RetailNova Group', position: 'Senior BI & Analytics Engineer', location: 'Chicago, IL', startDate: '2021-09', endDate: 'Present', current: true, description: '• Built executive KPI dashboard suite in Power BI tracking $180M revenue pipeline, reducing reporting time from 3 days to real-time.\n• Designed Snowflake data warehouse with dbt transformation models processing 15TB daily, cutting query times by 75%.\n• Conducted A/B test analysis driving 22% increase in customer retention.' },
      ],
      education: [{ id: 'ed1', institution: 'University of Chicago', degree: 'M.S. Analytics', fieldOfStudy: 'Applied Analytics & Statistics', location: 'Chicago, IL', startDate: '2017-09', endDate: '2019-06', gpa: '3.9' }],
      skillCategories: [
        { id: 's1', categoryName: 'Analytics & BI', skills: ['SQL (Advanced)', 'Tableau', 'Power BI', 'Looker', 'Excel / Google Sheets', 'Python (Pandas)', 'R', 'Statistics'] },
        { id: 's2', categoryName: 'Data Engineering', skills: ['Snowflake', 'dbt', 'BigQuery', 'Redshift', 'Apache Airflow', 'Fivetran', 'Spark (PySpark)', 'Databricks'] },
      ],
      projects: [],
      certifications: [{ id: 'c1', name: 'dbt Analytics Engineer Certification', issuer: 'dbt Labs', date: '2024-02', url: '' }],
    },
  },

  // ── Design ────────────────────────────────────────────────────────────────
  {
    category: 'design', emoji: '🎨',
    title: 'Senior UX/UI Product Designer',
    subtitle: 'Figma, Design Systems, User Research',
    theme: 'creative_portfolio_2026' as const, accentColor: '#db2777',
    data: {
      personalInfo: { fullName: 'Sofia Martinez', jobTitle: 'Senior UX/UI Product Designer', email: 'sofia.m@designcraft.io', phone: '+1 (555) 876-5432', location: 'Los Angeles, CA', website: 'https://sofiadesigns.co', linkedin: 'linkedin.com/in/sofia-martinez-ux', github: '', summary: 'Senior UX/UI Designer with 7+ years crafting intuitive digital experiences for B2B SaaS and consumer apps. Led design system creation used by 40+ product teams and contributed to $12M ARR growth through conversion rate optimization.', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'Luminary SaaS', position: 'Senior Product Designer', location: 'Los Angeles, CA', startDate: '2021-05', endDate: 'Present', current: true, description: '• Led end-to-end redesign of core onboarding flow, reducing drop-off by 58% and increasing trial-to-paid conversion by 34%.\n• Built "Aurora" design system with 240+ components in Figma, adopted by 42 cross-functional engineering squads.\n• Conducted 60+ user research sessions that informed 3 major product roadmap pivots.' },
      ],
      education: [{ id: 'ed1', institution: 'ArtCenter College of Design', degree: 'B.F.A. Interaction Design', fieldOfStudy: 'UX/UI & Interaction Design', location: 'Pasadena, CA', startDate: '2014-09', endDate: '2018-06' }],
      skillCategories: [
        { id: 's1', categoryName: 'Design Tools', skills: ['Figma (Expert)', 'Adobe XD', 'Principle', 'Framer', 'Zeplin', 'InVision', 'Maze', 'Hotjar'] },
        { id: 's2', categoryName: 'Design Skills', skills: ['UX Research', 'Usability Testing', 'Design Systems', 'Information Architecture', 'Motion Design', 'Accessibility (WCAG 2.2)', 'HTML/CSS'] },
      ],
      projects: [{ id: 'p1', title: 'Aurora Design System', description: '240+ component library used across 42 product squads, built in Figma with Token Studio for multi-brand theming.', technologies: ['Figma', 'Token Studio', 'Storybook', 'React'], link: 'https://aurora.design', githubUrl: '' }],
      certifications: [{ id: 'c1', name: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera', date: '2021-01', url: '' }],
    },
  },

  // ── Product ───────────────────────────────────────────────────────────────
  {
    category: 'product', emoji: '🚀',
    title: 'Senior Product Manager (Tech)',
    subtitle: 'SaaS, OKRs, Go-to-Market, 0-to-1 Products',
    theme: 'glass_modern_2026' as const, accentColor: '#0f766e',
    data: {
      personalInfo: { fullName: 'Ethan Park', jobTitle: 'Senior Product Manager', email: 'ethan.park@productops.io', phone: '+1 (555) 543-2198', location: 'New York, NY', website: 'https://ethanpark.pm', linkedin: 'linkedin.com/in/ethanpark-pm', github: '', summary: 'Senior Product Manager with 8+ years building 0-to-1 SaaS products and scaling them to $30M+ ARR. Expert in discovery-led product development, A/B experimentation, and cross-functional alignment across engineering, design, and go-to-market teams.', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'GrowthLens SaaS', position: 'Senior Product Manager', location: 'New York, NY', startDate: '2021-03', endDate: 'Present', current: true, description: '• Owned end-to-end roadmap for core analytics product growing from $2M to $28M ARR in 24 months.\n• Ran 180+ A/B experiments driving 41% improvement in 30-day retention.\n• Launched AI-powered tier, contributing 35% of new ARR in Q4 2025.' },
      ],
      education: [{ id: 'ed1', institution: 'Wharton School – University of Pennsylvania', degree: 'MBA', fieldOfStudy: 'Product & Technology Management', location: 'Philadelphia, PA', startDate: '2016-08', endDate: '2018-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'Product Management', skills: ['Product Strategy', 'OKR Frameworks', 'A/B Experimentation', 'User Research', 'Roadmapping', 'PRD Writing'] },
        { id: 's2', categoryName: 'Tools & Analytics', skills: ['Jira / Linear', 'Amplitude', 'Mixpanel', 'Figma', 'SQL', 'Looker', 'Intercom', 'Notion'] },
      ],
      projects: [],
      certifications: [{ id: 'c1', name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', date: '2022-04', url: '' }],
    },
  },

  // ── Leadership ────────────────────────────────────────────────────────────
  {
    category: 'leadership', emoji: '👑',
    title: 'VP of Engineering & Technology',
    subtitle: 'Engineering Leadership, Strategy, 100+ Teams',
    theme: 'executive_prime_2026' as const, accentColor: '#4f46e5',
    data: {
      personalInfo: { fullName: 'Elena Rostova', jobTitle: 'VP of Engineering & Technology', email: 'elena.rostova@enterprise.com', phone: '+1 (555) 456-7890', location: 'New York, NY', website: 'https://elenarostova.executive', linkedin: 'linkedin.com/in/elena-rostova-vp', github: '', summary: 'Visionary Technology Executive with 14+ years driving digital transformation, scaling engineering organizations from 15 to 120+ engineers, and delivering $50M+ ARR enterprise SaaS platforms.', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'Global Horizon Enterprise', position: 'VP of Engineering', location: 'New York, NY', startDate: '2021-02', endDate: 'Present', current: true, description: '• Scaled product engineering organization from 20 to 110+ FTEs across 4 global tech hubs while reducing turnover to under 4%.\n• Spearheaded core platform re-architecture powering $65M ARR with zero unplanned downtime.\n• Managed $18M annual technology budget spanning cloud operations, R&D, and security compliance (SOC 2, ISO 27001).' },
      ],
      education: [{ id: 'ed1', institution: 'Columbia University', degree: 'M.S. Computer Science', fieldOfStudy: 'Distributed Systems', location: 'New York, NY', startDate: '2008-09', endDate: '2010-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'Executive Leadership', skills: ['Engineering Org Scaling', 'Product Strategy', 'P&L / Budgeting ($20M+)', 'M&A Due Diligence', 'Executive Talent Development', 'Board-Level Reporting'] },
        { id: 's2', categoryName: 'Technical Oversight', skills: ['Enterprise Architecture', 'SOC 2 / ISO 27001', 'Cloud-Native Platforms', 'Data Strategy', 'OKR Frameworks', 'Agile at Scale'] },
      ],
      projects: [],
      certifications: [],
    },
  },
  {
    category: 'leadership', emoji: '🏢',
    title: 'Chief Technology Officer (CTO)',
    subtitle: 'Startup CTO, Technical Vision, Board Advisor',
    theme: 'apex_leadership_2026' as const, accentColor: '#1d4ed8',
    data: {
      personalInfo: { fullName: 'Marcus Webb', jobTitle: 'Chief Technology Officer', email: 'marcus.webb@cto.ventures', phone: '+1 (555) 190-4455', location: 'San Francisco, CA', website: 'https://marcuswebb.cto', linkedin: 'linkedin.com/in/marcus-webb-cto', github: 'github.com/mwebb-cto', summary: 'Serial CTO and technology co-founder with 3 successful exits ($15M, $80M, $220M). Proven expertise in building technical teams from 0 to 200+, architecting enterprise-grade platforms, and guiding Series A–D fundraising rounds.', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'Vertex AI Ventures', position: 'Chief Technology Officer & Co-Founder', location: 'San Francisco, CA', startDate: '2022-01', endDate: 'Present', current: true, description: '• Co-founded AI infrastructure startup, raising $45M Series B; grew engineering team from 3 to 85 engineers in 18 months.\n• Defined technical vision and microservices architecture processing 1B+ API calls/month for Fortune 500 clients.\n• Established ML platform and data flywheel reducing model training costs by 60% while improving accuracy by 18%.' },
      ],
      education: [{ id: 'ed1', institution: 'UC Berkeley', degree: 'B.S. Electrical Engineering & Computer Science', fieldOfStudy: 'EECS', location: 'Berkeley, CA', startDate: '2004-09', endDate: '2008-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'CTO Skills', skills: ['Technical Vision & Strategy', 'Team Building (0→200)', 'Fundraising (Series A-D)', 'M&A & Integrations', 'Board & Investor Relations'] },
        { id: 's2', categoryName: 'Architecture & Tech', skills: ['Cloud-Native Architecture', 'AI/ML Platforms', 'API-First Design', 'Data Infrastructure', 'Security & Compliance', 'Go / Python / TypeScript'] },
      ],
      projects: [],
      certifications: [],
    },
  },

  // ── Finance ───────────────────────────────────────────────────────────────
  {
    category: 'finance', emoji: '💹',
    title: 'Senior Financial Analyst (FP&A)',
    subtitle: 'Financial Modeling, M&A, SaaS Metrics, Excel/Python',
    theme: 'nordic_minimal_2026' as const, accentColor: '#1e40af',
    data: {
      personalInfo: { fullName: 'James Kim', jobTitle: 'Senior Financial Analyst – FP&A', email: 'james.kim@finops.com', phone: '+1 (555) 345-6789', location: 'New York, NY', website: '', linkedin: 'linkedin.com/in/james-kim-fpa', github: '', summary: 'Senior FP&A Analyst with 6+ years at Fortune 500 companies building complex financial models, driving M&A analysis, and delivering strategic insights that influenced $200M+ in capital allocation decisions.', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'BlackRock Strategic Finance', position: 'Senior Financial Analyst', location: 'New York, NY', startDate: '2021-07', endDate: 'Present', current: true, description: '• Built 5-year integrated DCF / LBO financial models supporting $350M acquisition due diligence process.\n• Automated monthly board reporting package using Python + Pandas, reducing preparation time by 80%.\n• Developed SaaS cohort analysis and CAC/LTV attribution model that increased marketing ROI by 28%.' },
      ],
      education: [{ id: 'ed1', institution: 'NYU Stern School of Business', degree: 'B.S. Finance', fieldOfStudy: 'Corporate Finance & Investments', location: 'New York, NY', startDate: '2015-09', endDate: '2019-05', gpa: '3.85' }],
      skillCategories: [
        { id: 's1', categoryName: 'Finance Skills', skills: ['Financial Modeling (DCF, LBO, M&A)', 'FP&A / Budgeting', 'Valuation', 'SaaS Metrics (ARR, NRR, CAC/LTV)', 'Capital Markets', 'Risk Analysis'] },
        { id: 's2', categoryName: 'Tools', skills: ['Excel (VBA, Power Query)', 'Python (Pandas, NumPy)', 'SQL', 'Tableau', 'Bloomberg Terminal', 'Anaplan', 'NetSuite'] },
      ],
      projects: [],
      certifications: [{ id: 'c1', name: 'CFA Level II', issuer: 'CFA Institute', date: '2023-08', url: '' }],
    },
  },

  // ── Marketing ─────────────────────────────────────────────────────────────
  {
    category: 'marketing', emoji: '📈',
    title: 'Head of Growth & Performance Marketing',
    subtitle: 'Paid Ads, SEO, Funnel Optimization, B2B SaaS',
    theme: 'gradient_pulse_2026' as const, accentColor: '#ea580c',
    data: {
      personalInfo: { fullName: 'Zoe Anderson', jobTitle: 'Head of Growth & Performance Marketing', email: 'zoe.anderson@growthops.io', phone: '+1 (555) 213-7654', location: 'Austin, TX', website: 'https://zoeanderson.growth', linkedin: 'linkedin.com/in/zoe-anderson-growth', github: '', summary: 'Performance Marketing Leader with 8+ years scaling B2B SaaS from 0 to $25M ARR through full-funnel demand generation, paid acquisition, and data-driven growth experimentation. Drove 3× pipeline in 12 months with 40% lower CAC.', photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'ScaleIQ SaaS', position: 'Head of Growth Marketing', location: 'Austin, TX', startDate: '2022-01', endDate: 'Present', current: true, description: '• Scaled paid acquisition across Google, LinkedIn, and Meta from $200k to $2.4M monthly spend while maintaining 4.2× ROAS.\n• Launched content-led SEO strategy growing organic pipeline from $0 to $8M ARR in 18 months.\n• Built and led growth team of 12, reducing overall CAC by 40%.' },
      ],
      education: [{ id: 'ed1', institution: 'University of Texas at Austin', degree: 'B.B.A. Marketing', fieldOfStudy: 'Digital Marketing & Analytics', location: 'Austin, TX', startDate: '2012-09', endDate: '2016-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'Growth Marketing', skills: ['Paid Ads (Google, Meta, LinkedIn)', 'SEO / Content Strategy', 'Account-Based Marketing (ABM)', 'CRO', 'Email / Lifecycle Marketing', 'Product-Led Growth (PLG)'] },
        { id: 's2', categoryName: 'Analytics & Tools', skills: ['HubSpot', 'Salesforce', 'Google Analytics 4', 'Amplitude', 'Semrush', 'Marketo', 'SQL', 'Looker'] },
      ],
      projects: [],
      certifications: [{ id: 'c1', name: 'Google Ads Certified', issuer: 'Google', date: '2023-06', url: '' }],
    },
  },

  // ── Security ──────────────────────────────────────────────────────────────
  {
    category: 'security', emoji: '🛡️',
    title: 'Senior Cybersecurity Engineer',
    subtitle: 'Penetration Testing, Zero Trust, SIEM, SOC',
    theme: 'cyber_tech_2026' as const, accentColor: '#16a34a',
    data: {
      personalInfo: { fullName: 'Liam Torres', jobTitle: 'Senior Cybersecurity Engineer', email: 'liam.torres@secops.io', phone: '+1 (555) 822-4499', location: 'Washington, D.C.', website: 'https://liamtorres.sec', linkedin: 'linkedin.com/in/liam-torres-cybersec', github: 'github.com/liam-secops', summary: 'Senior Cybersecurity Engineer with 7+ years in offensive & defensive security, red team operations, and enterprise zero-trust architecture. OSCP certified with proven track record securing critical infrastructure for Fortune 100 companies.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'FortifyNet Security', position: 'Senior Cybersecurity Engineer', location: 'Washington, D.C.', startDate: '2021-09', endDate: 'Present', current: true, description: '• Led 24 red team engagements identifying 340+ critical vulnerabilities across 18 enterprise clients, preventing $180M in estimated breach losses.\n• Designed and deployed zero-trust network segmentation for 12,000-seat enterprise achieving NIST CSF 2.0 compliance.\n• Built SIEM correlation rules in Splunk detecting insider threats with 94% precision and 98% recall.' },
      ],
      education: [{ id: 'ed1', institution: 'George Mason University', degree: 'B.S. Cybersecurity', fieldOfStudy: 'Information Security', location: 'Fairfax, VA', startDate: '2013-09', endDate: '2017-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'Security Engineering', skills: ['Penetration Testing (PTES)', 'Red Team Operations', 'Zero Trust Architecture', 'SIEM (Splunk, Sentinel)', 'Threat Modeling', 'OWASP Top 10', 'SOC Tier 2/3'] },
        { id: 's2', categoryName: 'Tools & Frameworks', skills: ['Metasploit', 'Burp Suite Pro', 'Nessus', 'Wireshark', 'NIST CSF', 'ISO 27001', 'Python', 'PowerShell', 'Linux'] },
      ],
      projects: [],
      certifications: [
        { id: 'c1', name: 'OSCP – Offensive Security Certified Professional', issuer: 'Offensive Security', date: '2022-07', url: '' },
        { id: 'c2', name: 'CISSP', issuer: 'ISC²', date: '2023-11', url: '' },
      ],
    },
  },

  // ── Healthcare ────────────────────────────────────────────────────────────
  {
    category: 'healthcare', emoji: '⚕️',
    title: 'Healthcare IT / Clinical Informatics Engineer',
    subtitle: 'HL7 FHIR, EHR Systems, HIPAA Compliance',
    theme: 'minimal_horizon_2026' as const, accentColor: '#0891b2',
    data: {
      personalInfo: { fullName: 'Dr. Anita Patel', jobTitle: 'Clinical Informatics Engineer', email: 'anita.patel@healthtech.med', phone: '+1 (555) 777-3322', location: 'Boston, MA', website: '', linkedin: 'linkedin.com/in/anita-patel-healthit', github: '', summary: 'Clinical Informatics Engineer with dual background in medicine (MD) and software engineering. 7+ years implementing HL7 FHIR APIs, Epic/Cerner EHR integrations, and AI-powered clinical decision support systems in large hospital networks.', photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'Partners Healthcare System', position: 'Senior Clinical Informatics Engineer', location: 'Boston, MA', startDate: '2020-04', endDate: 'Present', current: true, description: '• Implemented HL7 FHIR R4 API integration between Epic EHR and 14 third-party clinical apps, reducing data reconciliation errors by 78%.\n• Built ML-powered sepsis early-warning system deployed to 8 ICUs, contributing to 12% reduction in sepsis mortality.\n• Ensured HIPAA-compliant data architecture for 4.2M patient record warehouse with full audit trail.' },
      ],
      education: [{ id: 'ed1', institution: 'Harvard Medical School', degree: 'MD', fieldOfStudy: 'Medicine & Clinical Informatics', location: 'Boston, MA', startDate: '2012-08', endDate: '2016-05' }],
      skillCategories: [
        { id: 's1', categoryName: 'Healthcare IT', skills: ['HL7 FHIR R4', 'Epic EHR', 'Cerner / Oracle Health', 'ICD-10 / SNOMED CT', 'HIPAA Compliance', 'Clinical Decision Support'] },
        { id: 's2', categoryName: 'Technical Skills', skills: ['Python', 'SQL', 'Azure Health Data Services', 'SMART on FHIR', 'Node.js', 'PostgreSQL', 'REST APIs', 'Docker'] },
      ],
      projects: [],
      certifications: [{ id: 'c1', name: 'CPHIMS – Certified Professional in Health Informatics', issuer: 'HIMSS', date: '2021-09', url: '' }],
    },
  },

  // ── Science ───────────────────────────────────────────────────────────────
  {
    category: 'science', emoji: '🔬',
    title: 'Bioinformatics / Computational Biology Scientist',
    subtitle: 'Genomics, Single-cell RNA-seq, Python, R',
    theme: 'monochrome_chic_2026' as const, accentColor: '#059669',
    data: {
      personalInfo: { fullName: 'Dr. Lucas Fernandez', jobTitle: 'Senior Computational Biologist', email: 'lucas.fernandez@genomicslab.edu', phone: '+1 (617) 555-9988', location: 'Cambridge, MA', website: 'https://lucasfernandez.science', linkedin: 'linkedin.com/in/lucas-fernandez-bioinformatics', github: 'github.com/lfernandez-bio', summary: 'PhD Computational Biologist with 8+ years analyzing multi-omics datasets, building scalable bioinformatics pipelines, and developing ML models for drug target discovery. Published 14 peer-reviewed papers with 1,200+ citations.', photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400' },
      experience: [
        { id: 'e1', company: 'Broad Institute of MIT & Harvard', position: 'Senior Computational Biology Scientist', location: 'Cambridge, MA', startDate: '2020-09', endDate: 'Present', current: true, description: '• Developed Nextflow WDL pipeline for single-cell RNA-seq analysis processing 2M+ cells across 400 patient samples.\n• Built variational autoencoder model identifying novel cell subtypes in tumor microenvironment, published in Nature Methods.\n• Led cross-institutional collaboration analyzing 10TB+ TCGA multi-omics data revealing 5 novel oncogenic gene networks.' },
      ],
      education: [{ id: 'ed1', institution: 'MIT', degree: 'Ph.D. Computational Biology', fieldOfStudy: 'Genomics & Bioinformatics', location: 'Cambridge, MA', startDate: '2014-09', endDate: '2020-06' }],
      skillCategories: [
        { id: 's1', categoryName: 'Bioinformatics', skills: ['Single-cell RNA-seq (Seurat, Scanpy)', 'Bulk RNA-seq', 'WGS / Variant Calling', 'ATAC-seq', 'Pathway Analysis (GSEA)', 'Drug Target Discovery'] },
        { id: 's2', categoryName: 'Programming & Tools', skills: ['Python (NumPy, Pandas, scikit-learn)', 'R / Bioconductor', 'Nextflow / Snakemake', 'GATK', 'Docker / Singularity', 'AWS / Terra', 'SQL'] },
      ],
      projects: [{ id: 'p1', title: 'CancerAtlas – Open Multi-Omics Pipeline', description: 'Open-source Nextflow pipeline for integrated multi-omics analysis used by 120+ labs globally.', technologies: ['Nextflow', 'Python', 'R', 'Docker', 'AWS'], link: '', githubUrl: 'https://github.com/lfernandez-bio/canceratlas' }],
      certifications: [],
    },
  },
];

const ACTION_VERBS = [
  'Architected', 'Engineered', 'Spearheaded', 'Optimized', 'Automated',
  'Scaled', 'Pioneered', 'Accelerated', 'Deployed', 'Transformed',
  'Implemented', 'Reduced', 'Increased', 'Mentored', 'Orchestrated',
  'Delivered', 'Launched', 'Drove', 'Designed', 'Negotiated',
  'Streamlined', 'Revamped', 'Secured', 'Formulated', 'Achieved',
];

export const AiAssistantPanel: React.FC<Props> = ({ data, onApplyPreset }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [appliedIdx, setAppliedIdx] = useState<number | null>(null);

  const computeAtsScore = () => {
    let score = 0;
    const checks = [];

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

    if (data.experience.length >= 2) {
      score += 20;
      checks.push({ text: 'Contains 2+ work experience entries', pass: true });
    } else if (data.experience.length === 1) {
      score += 10;
      checks.push({ text: 'Add at least 2 work experiences', pass: false });
    } else {
      checks.push({ text: 'No work experience added yet', pass: false });
    }

    const hasMetrics = data.experience.some((e) => /\d+%|\$\d+|\d+\+|\d+k/i.test(e.description));
    if (hasMetrics) {
      score += 15;
      checks.push({ text: 'Bullet points contain quantifiable metrics', pass: true });
    } else {
      checks.push({ text: 'Add quantifiable results (e.g. boosted speed by 40%)', pass: false });
    }

    const totalSkills = data.skillCategories.reduce((a, c) => a + c.skills.length, 0);
    if (totalSkills >= 8) {
      score += 20;
      checks.push({ text: 'Rich skill keyword coverage (8+ skills)', pass: true });
    } else {
      checks.push({ text: 'Add more skill keywords (aim for 8+)', pass: false });
    }

    if (data.projects && data.projects.length >= 1) {
      score += 10;
      checks.push({ text: 'Featured projects section included', pass: true });
    } else {
      checks.push({ text: 'Add at least 1 featured project', pass: false });
    }

    if (data.certifications && data.certifications.length >= 1) {
      score += 10;
      checks.push({ text: 'Certifications / credentials included', pass: true });
    } else {
      checks.push({ text: 'Add relevant certifications or credentials', pass: false });
    }

    return { score: Math.min(100, score), checks };
  };

  const { score, checks } = computeAtsScore();
  const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600';
  const barColor   = score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';

  const filtered = activeCategory === 'all'
    ? ROLE_PRESETS
    : ROLE_PRESETS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <div>
          <h2 className="text-sm font-bold text-gray-900">AI & ATS Optimization</h2>
          <p className="text-xs text-gray-500">Real-time ATS score & {ROLE_PRESETS.length} professional 1-click role presets</p>
        </div>
      </div>

      {/* ATS Score Card */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-xs font-bold text-gray-900">ATS Readability Score</h3>
              <p className="text-[11px] text-gray-500">AI-driven ATS Compatibility Analysis</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
            <span className={`text-2xl font-extrabold ${scoreColor}`}>{score}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-700 ${barColor}`} style={{ width: `${score}%` }} />
        </div>
        <div className="space-y-1.5 pt-1">
          {checks.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              {item.pass
                ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                : <AlertCircle  className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
              <span className={item.pass ? 'text-gray-700' : 'text-amber-700'}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Role Presets */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
          <Zap className="w-4 h-4 text-amber-500" />
          Role Presets ({ROLE_PRESETS.length} Profiles)
        </div>

        {/* Category filter pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setActiveCategory(cat.id); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border shrink-0 ${
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Role cards — 2-column compact grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {filtered.map((preset, i) => {
            const globalIdx = ROLE_PRESETS.indexOf(preset);
            const isApplied = appliedIdx === globalIdx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onApplyPreset({ ...preset.data, theme: preset.theme, accentColor: preset.accentColor });
                  setAppliedIdx(globalIdx);
                  setTimeout(() => setAppliedIdx(null), 2000);
                }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition group w-full ${
                  isApplied
                    ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 shadow-xs'
                }`}
              >
                <span className="text-2xl">{preset.emoji}</span>
                <span className="text-xs font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition line-clamp-2">
                  {preset.title}
                </span>
                <span className={`mt-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold border ${
                  isApplied
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600'
                }`}>
                  {isApplied ? <CheckCircle2 className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  {isApplied ? 'Applied' : 'Apply Preset'}
                </span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="col-span-2 text-center text-gray-400 text-xs py-4">No presets in this category yet.</p>
          )}
        </div>
      </div>

      {/* Power Action Verbs */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
        <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          High-Impact Action Verbs (Click to copy)
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ACTION_VERBS.map((verb) => (
            <button
              key={verb}
              type="button"
              onClick={() => { navigator.clipboard.writeText(verb); }}
              className="px-2.5 py-1 text-xs font-medium bg-white text-gray-700 border border-gray-200 rounded-md hover:border-blue-400 hover:text-blue-600 transition shadow-2xs"
            >
              {verb}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
