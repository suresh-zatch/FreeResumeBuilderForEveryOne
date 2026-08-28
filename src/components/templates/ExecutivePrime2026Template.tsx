import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const ExecutivePrime2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  const contactItems = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-slate-900 font-serif text-xs leading-normal p-10 min-h-[1050px] space-y-6">
      {/* Top Accent Line */}
      <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: accentColor || '#4f46e5' }} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-sans font-bold uppercase tracking-widest mt-1" style={{ color: accentColor || '#4f46e5' }}>
            {personalInfo.jobTitle || 'Executive Vice President'}
          </p>
          {contactItems.length > 0 && (
            <p className="text-[10px] font-sans text-slate-500 tracking-tight pt-2">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && '   |   '}
                  <ContactLink value={item} type={getContactType(item, personalInfo)} />
                </React.Fragment>
              ))}
            </p>
          )}
        </div>

        {personalInfo.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm shrink-0 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">
            Executive Summary & Vision
          </h3>
          <p className="text-slate-800 text-[11.5px] leading-relaxed text-justify italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-3">
          <h3
            className="text-xs font-sans font-bold uppercase tracking-widest pb-1 border-b-2"
            style={{ color: accentColor || '#4f46e5', borderColor: accentColor || '#4f46e5' }}
          >
            Professional Experience & Leadership
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                  <span>
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ''}
                  </span>
                  <span className="font-sans text-[10px] text-slate-500 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="italic text-slate-700 text-[11px] font-semibold">{exp.position}</div>
                {exp.description && (
                  <div className="text-slate-800 font-sans text-[10.5px] whitespace-pre-line leading-relaxed pl-3 border-l-2 border-slate-200">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects / Key Accomplishments */}
      {projects && projects.length > 0 && (
        <div className="space-y-3">
          <h3
            className="text-xs font-sans font-bold uppercase tracking-widest pb-1 border-b-2"
            style={{ color: accentColor || '#4f46e5', borderColor: accentColor || '#4f46e5' }}
          >
            Strategic Projects & Corporate Initiatives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((p) => (
              <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 font-sans">
                <span className="font-bold text-slate-900 text-xs">{p.title}</span>
                {p.description && <p className="text-slate-600 text-[10.5px] leading-relaxed">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {skillCategories.length > 0 && (
          <div className="space-y-2">
            <h3
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2"
              style={{ color: accentColor || '#4f46e5', borderColor: accentColor || '#4f46e5' }}
            >
              Core Competencies & Capabilities
            </h3>
            <div className="space-y-1 text-[10.5px]">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex items-baseline">
                  <span className="font-bold text-slate-900 w-32 shrink-0">{cat.categoryName}:</span>
                  <span className="text-slate-700">{cat.skills.join(' • ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {education.length > 0 && (
            <div className="space-y-2">
              <h3
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2"
                style={{ color: accentColor || '#4f46e5', borderColor: accentColor || '#4f46e5' }}
              >
                Education & Qualifications
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-[10.5px]">
                  <div className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-slate-600">{edu.institution} ({edu.endDate})</div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="space-y-2">
              <h3
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2"
                style={{ color: accentColor || '#4f46e5', borderColor: accentColor || '#4f46e5' }}
              >
                Executive Credentials
              </h3>
              {certifications.map((c) => (
                <div key={c.id} className="text-[10px] text-slate-700">
                  <span className="font-bold text-slate-900">{c.name}</span> — {c.issuer} ({c.date})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
