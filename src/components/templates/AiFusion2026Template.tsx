import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const AiFusion2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-slate-900 font-sans text-xs leading-relaxed min-h-[1050px]">
      {/* 2026 Hero Header Banner */}
      <div
        className="p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        style={{ backgroundColor: accentColor || '#2563eb' }}
      >
        <div className="space-y-1.5 z-10 max-w-xl">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/20">
            2026 AI Era Verified Profile
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-xs">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-semibold tracking-wide text-white/90">
            {personalInfo.jobTitle || 'Job Title'}
          </p>

          {contactItems.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2 text-[10.5px] text-white/80">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>•</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Profile Avatar if available */}
        {personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg shrink-0 bg-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="p-8 space-y-6">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <div className="p-4 bg-slate-50 border-l-4 rounded-r-xl border-slate-300" style={{ borderLeftColor: accentColor }}>
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
              Professional Brief
            </h3>
            <p className="text-slate-700 leading-relaxed text-[11.5px] font-medium">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                Work Experience & Achievements
              </h3>
            </div>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-white border-2" style={{ borderColor: accentColor }} />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{exp.position}</span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold" style={{ color: accentColor }}>
                    {exp.company} {exp.location ? `— ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-slate-600 text-[11px] whitespace-pre-line leading-relaxed pt-1">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                Key Projects & Key Initiatives
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    {proj.link && (
                      <span className="text-[9.5px] font-mono text-slate-400">{proj.link.replace(/^https?:\/\//, '')}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-slate-600 text-[10.5px] leading-relaxed">{proj.description}</p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9.5px] font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Certifications Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          {skillCategories.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Skills & Core Competencies
                </h3>
              </div>
              <div className="space-y-2">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-[10.5px] font-bold text-slate-700 uppercase tracking-wide">{cat.categoryName}</span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Certifications */}
          <div className="space-y-4">
            {education.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                    Education
                  </h3>
                </div>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                        <span>{edu.degree} in {edu.fieldOfStudy}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{edu.endDate}</span>
                      </div>
                      <div className="text-[10.5px] text-slate-600 font-medium">
                        {edu.institution} {edu.location ? `• ${edu.location}` : ''} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                    Certifications & Licenses
                  </h3>
                </div>
                <div className="space-y-1.5">
                  {certifications.map((c) => (
                    <div key={c.id} className="flex justify-between items-baseline text-[10.5px]">
                      <span className="font-bold text-slate-800">{c.name}</span>
                      <span className="text-slate-500">{c.issuer} ({c.date})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
