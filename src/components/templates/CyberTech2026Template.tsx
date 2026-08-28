import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const CyberTech2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  const contactItems = [
    personalInfo.email && { label: `EMAIL: ${personalInfo.email}`, value: personalInfo.email, type: 'email' as const },
    personalInfo.phone && { label: `TEL: ${personalInfo.phone}`, value: personalInfo.phone, type: 'phone' as const },
    personalInfo.location && { label: `LOC: ${personalInfo.location}`, value: personalInfo.location, type: 'location' as const },
    personalInfo.website && { label: `WEB: ${personalInfo.website}`, value: personalInfo.website, type: 'website' as const },
    personalInfo.linkedin && { label: `LINKEDIN: ${personalInfo.linkedin}`, value: personalInfo.linkedin, type: 'linkedin' as const },
    personalInfo.github && { label: `GITHUB: ${personalInfo.github}`, value: personalInfo.github, type: 'github' as const },
  ].filter(Boolean) as { label: string; value: string; type: 'email' | 'phone' | 'location' | 'website' | 'linkedin' | 'github' }[];

  return (
    <div className="w-full bg-white text-slate-900 font-sans text-xs leading-relaxed min-h-[1050px] p-8 space-y-6">
      {/* Dark Slate Terminal Header */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-[10px] font-mono text-slate-400 ml-2">system://profile.env</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">
            STATUS: ACTIVE
          </span>
        </div>

        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-black font-mono tracking-tight text-white uppercase">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-mono font-bold uppercase tracking-wider mt-0.5" style={{ color: accentColor || '#0d9488' }}>
              &gt; {personalInfo.jobTitle || 'SOFTWARE ARCHITECT'}
            </p>
          </div>

          {personalInfo.photoUrl && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-slate-300 pt-1 border-t border-slate-900">
            {contactItems.map((item, idx) => (
              <ContactLink key={idx} value={item.value} type={item.type}>
                {item.label}
              </ContactLink>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="space-y-1">
          <h3 className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400">
            // EXECUTIVE STATEMENT
          </h3>
          <p className="text-slate-700 text-[11px] leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-200">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
            // EXPERIENCE LOGS
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1 pl-3 border-l-2" style={{ borderColor: accentColor || '#0d9488' }}>
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-slate-900">{exp.position}</span>
                  <span className="text-[10px] text-slate-400">
                    [{exp.startDate} :: {exp.current ? 'PRESENT' : exp.endDate}]
                  </span>
                </div>
                <div className="text-[11px] font-mono font-semibold" style={{ color: accentColor || '#0d9488' }}>
                  @ {exp.company} {exp.location ? `(${exp.location})` : ''}
                </div>
                {exp.description && (
                  <div className="text-slate-700 text-[10.5px] whitespace-pre-line leading-relaxed pt-0.5">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
            // REPOSITORIES & PROJECTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-900 text-white rounded-xl space-y-1 font-mono text-[10.5px]">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>./{proj.title.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>
                {proj.description && <p className="text-slate-300 text-[10px]">{proj.description}</p>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-800 rounded text-[9px] text-slate-300 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
              // TECH STACK & TOOLS
            </h3>
            <div className="space-y-2 font-mono text-[10.5px]">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="font-bold text-slate-700 text-[10px] uppercase">&gt; {cat.categoryName}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[10px] border border-slate-200 font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {education.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
                // EDUCATION & DEGREES
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="font-mono text-[10.5px]">
                  <div className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-slate-600">{edu.institution} ({edu.endDate})</div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
                // CREDENTIALS
              </h3>
              {certifications.map((c) => (
                <div key={c.id} className="font-mono text-[10px] text-slate-700">
                  • <span className="font-bold text-slate-900">{c.name}</span> — {c.issuer} ({c.date})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
