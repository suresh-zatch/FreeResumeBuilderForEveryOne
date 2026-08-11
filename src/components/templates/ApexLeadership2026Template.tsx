import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const ApexLeadership2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor = '#0f172a' } = data;

  return (
    <div className="w-full bg-white text-gray-900 min-h-[1050px] p-8 font-sans box-border relative">
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }}></div>
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start border-b-2 border-gray-100 pb-6 mb-8 mt-4">
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-2">{personalInfo?.fullName}</h1>
          <h2 className="text-xl font-bold uppercase tracking-widest" style={{ color: accentColor }}>{personalInfo?.jobTitle}</h2>
        </div>
        
        <div className="flex-1 flex flex-col items-end text-sm text-gray-600 font-medium space-y-1">
          {personalInfo?.email && <div>{personalInfo.email}</div>}
          {personalInfo?.phone && <div>{personalInfo.phone}</div>}
          {personalInfo?.location && <div>{personalInfo.location}</div>}
          {personalInfo?.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo?.github && <div>{personalInfo.github}</div>}
          {personalInfo?.website && <div>{personalInfo.website}</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-8">
          <div className="pl-4 py-2 border-l-4 bg-gray-50 pr-4" style={{ borderColor: accentColor }}>
            <p className="text-gray-800 leading-relaxed text-sm font-medium">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ color: accentColor }}>Professional Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                      <span className="text-sm font-bold text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accentColor }}>
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.description && (
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ color: accentColor }}>Key Initiatives & Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="border border-gray-200 p-4 rounded-sm">
                    <h4 className="font-bold text-gray-900 mb-1">{proj.title}</h4>
                    <p className="text-xs text-gray-600 mb-3">{proj.description}</p>
                    {proj.technologies && (
                      <div className="text-xs font-bold text-gray-500">{proj.technologies.join(', ')}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Skills */}
          {skillCategories && skillCategories.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ color: accentColor }}>Core Competencies</h3>
              <div className="space-y-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{cat.categoryName}</h4>
                    <p className="text-sm text-gray-700 leading-snug">{cat.skills.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ color: accentColor }}>Education</h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <div className="text-sm text-gray-700">{edu.institution}</div>
                    <div className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-xl font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ color: accentColor }}>Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-gray-900">{cert.name}</h4>
                    <div className="text-xs text-gray-700">{cert.issuer} | {cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
