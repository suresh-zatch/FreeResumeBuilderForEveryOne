import { ResumeData } from '@/types/resume';

export const initialResumeData: ResumeData = {
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
      'Passionate and results-driven Senior AI & Full-Stack Architect with 8+ years of experience engineering scalable LLM agent systems, cloud microservices, and real-time distributed applications. Proven track record of boosting enterprise platform throughput by 45% and leading high-performing engineering teams.',
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
    {
      id: 'exp-3',
      company: 'Apex Digital Labs',
      position: 'Full-Stack Developer',
      location: 'Oakland, CA',
      startDate: '2018-06',
      endDate: '2020-03',
      current: false,
      description:
        '• Built resilient client web portals using Node.js, Express, and PostgreSQL with zero downtime deployment.\n• Collaborated with design leads to translate complex Figma wireframes into responsive, accessible web applications.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Artificial Intelligence',
      location: 'Berkeley, CA',
      startDate: '2014-08',
      endDate: '2018-05',
      gpa: '3.92 / 4.0',
      highlights: 'Dean’s Honor List (All Semesters). Lead Researcher at Berkeley AI Research Lab.',
    },
  ],
  skillCategories: [
    {
      id: 'skill-1',
      categoryName: 'AI & Full-Stack Core',
      skills: ['TypeScript', 'React.js', 'Next.js 16', 'Node.js', 'Python', 'Tailwind CSS', 'GraphQL', 'REST APIs'],
    },
    {
      id: 'skill-2',
      categoryName: 'Cloud & Infrastructure',
      skills: ['AWS / GCP', 'Docker & Kubernetes', 'PostgreSQL', 'Redis', 'Vector DBs', 'CI/CD Pipelines', 'Vercel'],
    },
    {
      id: 'skill-3',
      categoryName: 'Architecture & Leadership',
      skills: ['System Design', 'Agile Leadership', 'Performance Optimization', 'Technical Mentorship', 'Web Security'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'OmniAI - Autonomous Code Assistant',
      description: 'Built a real-time AI pair-programming workspace with instant AST analysis and automated unit test generation.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vector Search'],
      link: 'https://omniai-demo.dev',
      githubUrl: 'https://github.com/alexvance/omniai',
    },
    {
      id: 'proj-2',
      title: 'PulseFlow - Distributed Queue Dashboard',
      description: 'Developed an open-source real-time event monitoring system handling 100k+ events/sec with live visualization.',
      technologies: ['React', 'Node.js', 'Redis', 'WebSockets', 'Chart.js'],
      link: 'https://pulseflow.io',
      githubUrl: 'https://github.com/alexvance/pulseflow',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2024',
      url: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'Linux Foundation',
      date: '2023',
      url: 'https://cncf.io/certification/ckad',
    },
  ],
  theme: 'ai_fusion_2026',
  accentColor: '#2563eb', // Royal Blue
};
