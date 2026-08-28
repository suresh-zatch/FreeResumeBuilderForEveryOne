import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const GlassModern2026Template: React.FC<Props> = ({ data }) => {
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
    <div className="w-full bg-slate-50 text-slate-900 font-sans text-xs leading-relaxed p-8 min-h-[1050px] space-y-5">
      {/* Header Container */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor || '#2563eb' }}>
            {personalInfo.jobTitle || 'Senior Software Engineer'}
          </p>

          {contactItems.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2 text-[10.5px] text-slate-500 font-medium">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>•</span>}
                  <ContactLink value={item} type={getContactType(item, personalInfo)} />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {personalInfo.photoUrl && (
          <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md shrink-0 bg-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Summary Profile
          </h3>
          <p className="text-slate-700 text-[11px] leading-relaxed font-normal">{personalInfo.summary}</p>
        </div>
      )}

      {/* Main Grid Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Main Column: Experience & Projects (8 cols) */}
        <div className="md:col-span-8 space-y-5">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-2 border-b border-slate-100">
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 border-l-2 pl-3" style={{ borderColor: accentColor || '#2563eb' }}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                      <span>{exp.position}</span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[10.5px] font-semibold text-slate-700">
                      {exp.company} {exp.location ? `— ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <div className="text-slate-600 text-[10.5px] whitespace-pre-line leading-relaxed pt-1">
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
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-2 border-b border-slate-100">
                Projects
              </h3>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    {proj.description && <p className="text-slate-600 text-[10.5px]">{proj.description}</p>}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-[9.5px] bg-white rounded border border-slate-200 text-slate-700 font-medium">
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
        </div>

        {/* Right Sidebar Column: Skills, Education, Certs (4 cols) */}
        <div className="md:col-span-4 space-y-5">
          {/* Skills */}
          {skillCategories.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-100">
                Skills
              </h3>
              <div className="space-y-2">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-700 uppercase">{cat.categoryName}</span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[9.5px] bg-slate-100 text-slate-800 rounded-md border border-slate-200 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-100">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-[10.5px]">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.fieldOfStudy}</div>
                  <div className="text-[9.5px] text-slate-400">{edu.institution} ({edu.endDate})</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-100">
                Certifications
              </h3>
              {certifications.map((c) => (
                <div key={c.id} className="text-[10px] text-slate-700">
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-slate-500">{c.issuer} ({c.date})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
