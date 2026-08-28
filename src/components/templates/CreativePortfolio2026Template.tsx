import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const CreativePortfolio2026Template: React.FC<Props> = ({ data }) => {
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
    <div className="w-full bg-white text-slate-900 font-sans text-xs leading-relaxed min-h-[1050px] flex flex-col md:flex-row">
      {/* Left Colored Sidebar (35%) */}
      <div
        className="w-full md:w-4/12 p-8 text-white space-y-6 shrink-0"
        style={{ backgroundColor: accentColor || '#2563eb' }}
      >
        {/* Photo Avatar */}
        {personalInfo.photoUrl && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg mx-auto bg-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personalInfo.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Name & Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
            {personalInfo.jobTitle || 'Creative Lead'}
          </p>
        </div>

        {/* Contact info */}
        {contactItems.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-white/20 text-[10.5px] text-white/90">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Contact & Links</h4>
            <div className="space-y-1 break-all">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                  <ContactLink value={item} type={getContactType(item, personalInfo)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/20">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Skillsets</h4>
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="text-[10px] font-bold text-white uppercase">{cat.categoryName}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 text-[9.5px] bg-white/20 backdrop-blur-md rounded-full text-white font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-white/20">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Credentials</h4>
            {certifications.map((c) => (
              <div key={c.id} className="text-[10px] text-white/90">
                <div className="font-bold">{c.name}</div>
                <div className="text-white/70">{c.issuer} ({c.date})</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content Area (65%) */}
      <div className="w-full md:w-8/12 p-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              About Me
            </h3>
            <p className="text-slate-700 text-[11px] leading-relaxed font-normal">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2" style={{ borderColor: accentColor || '#2563eb' }}>
              Work History
            </h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span>{exp.position}</span>
                    <span className="text-[10px] text-slate-400">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10.5px] font-semibold" style={{ color: accentColor || '#2563eb' }}>
                    {exp.company} {exp.location ? `— ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-slate-600 text-[10.5px] whitespace-pre-line leading-relaxed pt-0.5">
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2" style={{ borderColor: accentColor || '#2563eb' }}>
              Featured Work & Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                  {proj.description && <p className="text-slate-600 text-[10.5px]">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2" style={{ borderColor: accentColor || '#2563eb' }}>
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-[10.5px]">
                <div className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</div>
                <div className="text-slate-600">{edu.institution} ({edu.endDate})</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
