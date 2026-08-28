import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const MinimalHorizon2026Template: React.FC<Props> = ({ data }) => {
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
    <div className="w-full bg-white text-slate-900 font-sans text-xs leading-relaxed p-10 min-h-[1050px] space-y-6">
      {/* Editorial Header */}
      <div className="border-b-2 pb-5 space-y-2" style={{ borderColor: accentColor || '#111827' }}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest mt-1 text-slate-600">
              {personalInfo.jobTitle || 'Job Title'}
            </p>
          </div>

          {personalInfo.photoUrl && (
            <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-300 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 font-mono pt-1">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                <ContactLink value={item} type={getContactType(item, personalInfo)} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <p className="text-slate-800 text-[11px] leading-relaxed font-normal text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
            Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                  <span>{exp.position} — <span className="font-semibold" style={{ color: accentColor || '#111827' }}>{exp.company}</span></span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-slate-600 text-[10.5px] whitespace-pre-line leading-relaxed">
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
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
            Projects
          </h3>
          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p.id} className="flex justify-between items-baseline text-[10.5px]">
                <span className="font-bold text-slate-900">{p.title}</span>
                {p.description && <span className="text-slate-600 truncate max-w-xs">{p.description}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {skillCategories.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
              Skills
            </h3>
            <div className="space-y-1 text-[10.5px]">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex items-start">
                  <span className="font-bold text-slate-900 w-28 shrink-0">{cat.categoryName}:</span>
                  <span className="text-slate-600">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {education.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-[10.5px]">
                  <div className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-slate-500">{edu.institution} ({edu.endDate})</div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
                Certifications
              </h3>
              {certifications.map((c) => (
                <div key={c.id} className="text-[10px] text-slate-700">
                  <span className="font-bold text-slate-900">{c.name}</span> — {c.issuer}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
