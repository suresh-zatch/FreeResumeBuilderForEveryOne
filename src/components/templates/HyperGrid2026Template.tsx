import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const HyperGrid2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  return (
    <div className="w-full bg-gray-50 text-gray-900 min-h-[1050px] p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Hero Card */}
        <header className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold tracking-tight mb-2" style={{ color: accentColor || '#111827' }}>
              {personalInfo?.fullName}
            </h1>
            <p className="text-xl text-gray-600 font-medium mb-4">{personalInfo?.jobTitle}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-500 font-medium">
              {personalInfo?.email && <span className="bg-gray-100 px-3 py-1 rounded-lg">{personalInfo.email}</span>}
              {personalInfo?.phone && <span className="bg-gray-100 px-3 py-1 rounded-lg">{personalInfo.phone}</span>}
              {personalInfo?.location && <span className="bg-gray-100 px-3 py-1 rounded-lg">{personalInfo.location}</span>}
              {personalInfo?.website && <span className="bg-gray-100 px-3 py-1 rounded-lg">{personalInfo.website}</span>}
              {personalInfo?.linkedin && <span className="bg-gray-100 px-3 py-1 rounded-lg">{personalInfo.linkedin}</span>}
              {personalInfo?.github && <span className="bg-gray-100 px-3 py-1 rounded-lg">{personalInfo.github}</span>}
            </div>
          </div>
          {personalInfo?.photoUrl && (
            <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden shadow-md">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        {/* Summary Callout */}
        {personalInfo?.summary && (
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4" style={{ borderLeftColor: accentColor || '#3b82f6' }}>
            <p className="text-gray-700 text-lg leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Column (2/3) */}
          <div className="md:col-span-2 space-y-6">
            
            {experience && experience.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor || '#3b82f6' }}></span>
                  Experience
                </h2>
                <div className="space-y-8">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-lg font-medium text-gray-700">{exp.company}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700 inline-block">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                          {exp.location && <div className="text-xs text-gray-500 mt-1">{exp.location}</div>}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mt-3 whitespace-pre-wrap">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects && projects.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor || '#3b82f6' }}></span>
                  Projects
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="border border-gray-200 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold">{proj.title}</h3>
                        <div className="flex gap-2">
                          {proj.link && <a href={proj.link} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Live</a>}
                          {proj.githubUrl && <a href={proj.githubUrl} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">GitHub</a>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{proj.description}</p>
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((t, i) => (
                            <span key={i} className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Column (1/3) */}
          <div className="space-y-6">
            
            {skillCategories && skillCategories.length > 0 && (
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-5 rounded-full" style={{ backgroundColor: accentColor || '#3b82f6' }}></span>
                  Skills
                </h2>
                <div className="space-y-4">
                  {skillCategories.map((cat, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm font-bold text-gray-800 mb-2">{cat.categoryName}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, i) => (
                          <span key={i} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education && education.length > 0 && (
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-5 rounded-full" style={{ backgroundColor: accentColor || '#3b82f6' }}></span>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 pl-3" style={{ borderColor: accentColor || '#e5e7eb' }}>
                      <h3 className="text-md font-bold">{edu.degree}</h3>
                      <div className="text-sm font-medium text-gray-700">{edu.fieldOfStudy}</div>
                      <div className="text-sm text-gray-600 mt-1">{edu.institution}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {edu.startDate} - {edu.endDate} {edu.location && `| ${edu.location}`}
                      </div>
                      {edu.gpa && <div className="text-xs text-gray-600 font-medium mt-1">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-5 rounded-full" style={{ backgroundColor: accentColor || '#3b82f6' }}></span>
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <h3 className="text-sm font-bold">{cert.name}</h3>
                      <div className="text-xs text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
