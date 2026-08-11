import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const MetroCompact2026Template: React.FC<Props> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skillCategories,
    projects,
    certifications,
    accentColor = '#2563eb'
  } = data || {};

  return (
    <div className="w-full min-h-[1050px] bg-white text-gray-800 font-sans box-border flex flex-col">
      {/* Header */}
      <header className="w-full text-white p-8 box-border" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-extrabold uppercase tracking-wide mb-1">
          {personalInfo?.fullName || 'Full Name'}
        </h1>
        <h2 className="text-xl font-medium opacity-90 tracking-widest uppercase">
          {personalInfo?.jobTitle || 'Job Title'}
        </h2>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Column (40%) */}
        <aside className="w-full md:w-[40%] bg-gray-50 p-8 border-r border-gray-200 flex flex-col gap-8">
          
          {personalInfo?.photoUrl && (
            <div className="flex justify-center mb-2">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-lg object-cover shadow-sm border-2 border-white"
              />
            </div>
          )}

          <section className="text-sm flex flex-col gap-3">
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
              Contact
            </h3>
            {personalInfo?.email && <div className="flex items-center gap-2"><span className="font-semibold w-20 text-gray-500">Email</span> {personalInfo.email}</div>}
            {personalInfo?.phone && <div className="flex items-center gap-2"><span className="font-semibold w-20 text-gray-500">Phone</span> {personalInfo.phone}</div>}
            {personalInfo?.location && <div className="flex items-center gap-2"><span className="font-semibold w-20 text-gray-500">Location</span> {personalInfo.location}</div>}
            {personalInfo?.website && <div className="flex items-center gap-2"><span className="font-semibold w-20 text-gray-500">Website</span> {personalInfo.website}</div>}
            {personalInfo?.linkedin && <div className="flex items-center gap-2"><span className="font-semibold w-20 text-gray-500">LinkedIn</span> {personalInfo.linkedin}</div>}
            {personalInfo?.github && <div className="flex items-center gap-2"><span className="font-semibold w-20 text-gray-500">GitHub</span> {personalInfo.github}</div>}
          </section>

          {skillCategories && skillCategories.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-4" style={{ borderColor: accentColor }}>
                Skills
              </h3>
              <div className="flex flex-col gap-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-1">{cat.categoryName}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cat.skills.join(' • ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-4" style={{ borderColor: accentColor }}>
                Education
              </h3>
              <div className="flex flex-col gap-5">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h4 className="text-sm font-bold text-gray-800">{edu.degree}</h4>
                    <span className="text-sm text-gray-700 font-medium">{edu.fieldOfStudy}</span>
                    <span className="text-xs text-gray-500 mt-1">{edu.institution} {edu.location && `| ${edu.location}`}</span>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      {edu.gpa && <span className="font-semibold">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-4" style={{ borderColor: accentColor }}>
                Certifications
              </h3>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-gray-800">{cert.name}</h4>
                    <div className="text-xs text-gray-600">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column (60%) */}
        <main className="w-full md:w-[60%] p-8 flex flex-col gap-8">
          
          {personalInfo?.summary && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-3" style={{ borderColor: accentColor }}>
                Profile Summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-5" style={{ borderColor: accentColor }}>
                Professional Experience
              </h3>
              <div className="flex flex-col gap-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h4 className="text-md font-bold text-gray-900">{exp.position}</h4>
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-600 whitespace-nowrap mt-1 sm:mt-0">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-bold mb-2" style={{ color: accentColor }}>
                      {exp.company} {exp.location && <span className="text-gray-500 font-normal">| {exp.location}</span>}
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-5" style={{ borderColor: accentColor }}>
                Key Projects
              </h3>
              <div className="flex flex-col gap-5">
                {projects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-md font-bold text-gray-900">{proj.title}</h4>
                    </div>
                    {proj.description && (
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-xs text-gray-500 font-medium italic mb-1">
                        Tech: {proj.technologies.join(', ')}
                      </div>
                    )}
                    <div className="flex gap-3 text-xs font-semibold">
                      {proj.link && <a href={proj.link} style={{ color: accentColor }} className="hover:underline">View Project &rarr;</a>}
                      {proj.githubUrl && <a href={proj.githubUrl} style={{ color: accentColor }} className="hover:underline">Source Code &rarr;</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};
