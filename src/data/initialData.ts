import { ResumeData } from '@/types/resume';

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Vance',
    jobTitle: 'Senior Full-Stack Engineer',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance',
    github: 'github.com/alexvance',
    summary:
      'Passionate and results-driven Senior Full-Stack Engineer with 7+ years of experience architecting scalable web applications, cloud infrastructure, and real-time distributed systems. Proven track record of boosting system performance by 40% and leading cross-functional teams from ideation to deployment.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'TechNova Solutions',
      position: 'Senior Full-Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description:
        '• Architected microservices migration using Next.js 14, React Server Components, and GraphQL, reducing latency by 45%.\n• Spearheaded the design of high-throughput real-time collaboration features using WebSocket and Redis.\n• Mentored 6 junior/mid-level engineers and implemented automated CI/CD pipelines reducing deployment time by 60%.',
    },
    {
      id: 'exp-2',
      company: 'CloudPulse Systems',
      position: 'Frontend Engineer',
      location: 'San Jose, CA',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description:
        '• Engineered interactive web dashboards utilizing React, TypeScript, and Tailwind CSS serving 250k daily active users.\n• Optimized Web Vitals across core product pages achieving a 98+ Lighthouse score for performance and accessibility.\n• Developed reusable design system component library adopted across 4 major product engineering teams.',
    },
    {
      id: 'exp-3',
      company: 'Apex Digital Agency',
      position: 'Web Developer',
      location: 'Oakland, CA',
      startDate: '2017-08',
      endDate: '2019-05',
      current: false,
      description:
        '• Built custom full-stack web applications using Node.js, Express, and PostgreSQL for client portfolios.\n• Collaborated closely with UI/UX designers to translate Figma prototypes into pixel-perfect responsive web pages.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Engineering',
      location: 'Berkeley, CA',
      startDate: '2013-08',
      endDate: '2017-05',
      gpa: '3.88 / 4.0',
      highlights: 'Dean’s Honor List for 6 semesters. President of ACM Student Chapter.',
    },
  ],
  skillCategories: [
    {
      id: 'skill-1',
      categoryName: 'Frontend & UI',
      skills: ['TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Vue.js', 'HTML5/CSS3', 'Redux Toolkit'],
    },
    {
      id: 'skill-2',
      categoryName: 'Backend & Cloud',
      skills: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    },
    {
      id: 'skill-3',
      categoryName: 'Tools & DevOps',
      skills: ['Git/GitHub', 'CI/CD Pipelines', 'Jest / React Testing Library', 'Webpack / Vite', 'Vercel'],
    },
  ],
  theme: 'modern',
  accentColor: '#2563eb', // Royal Blue
};
