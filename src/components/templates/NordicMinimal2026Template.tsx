import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const NordicMinimal2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor = '#475569' } = data;

  const contactItems = [
    personalInfo?.email,
    personalInfo?.phone,
    personalInfo?.location,
    personalInfo?.website,
    personalInfo?.linkedin,
    personalInfo?.github
  ].filter(Boolean);

  return (
    <div className="w-full bg-[#fcfcfc] text-stone-800 min-h-[1050px] p-12 font-sans box-border">
      {/* Header */}
      <header className="mb-10 flex flex-col items-center text-center">
        {personalInfo?.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="w-20 h-20 rounded-full mb-4 grayscale hover:grayscale-0 transition duration-300"
          />
        )}
        <h1 className="text-3xl font-light tracking-wide text-stone-900 uppercase">{personalInfo?.fullName}</h1>
        <h2 className="text-lg mt-2 font-medium tracking-widest" style={{ color: accentColor }}>{personalInfo?.jobTitle}</h2>
        <div className="flex flex-wrap justify-center items-center gap-3 mt-4 text-xs text-stone-500 uppercase tracking-wider">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              {index < contactItems.length - 1 && <span className="w-1 h-1 rounded-full bg-stone-300"></span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Summary */}
        {personalInfo?.summary && (
          <section>
            <p className="text-stone-600 leading-loose text-center text-sm max-w-3xl mx-auto">{personalInfo.summary}</p>
          </section>
        )}

        <div className="w-full h-px bg-stone-200"></div>

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 text-center">Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                  <div className="md:col-span-1 text-xs text-stone-500 font-medium">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                  <div className="md:col-span-3">
                    <h4 className="text-base font-semibold text-stone-800">{exp.position}</h4>
                    <p className="text-sm font-medium mb-3" style={{ color: accentColor }}>{exp.company} {exp.location && `• ${exp.location}`}</p>
                    {exp.description && (
                      <div className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">{exp.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 text-center">Projects</h3>
            <div className="space-y-8">
              {projects.map((proj, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                  <div className="md:col-span-1 text-xs text-stone-500 font-medium flex gap-2">
                    {proj.link && <a href={proj.link} className="hover:underline">Link</a>}
                    {proj.githubUrl && <a href={proj.githubUrl} className="hover:underline">GitHub</a>}
                  </div>
                  <div className="md:col-span-3">
                    <h4 className="text-base font-semibold text-stone-800 mb-2">{proj.title}</h4>
                    <p className="text-sm text-stone-600 leading-relaxed mb-3">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-xs text-stone-400 font-mono tracking-tight">{proj.technologies.join(' / ')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillCategories && skillCategories.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 text-center">Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="text-center">
                  <h4 className="text-sm font-semibold text-stone-800 mb-2">{cat.categoryName}</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">{cat.skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {education && education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 text-center">Education</h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="text-center">
                    <h4 className="text-sm font-semibold text-stone-800">{edu.degree} — {edu.fieldOfStudy}</h4>
                    <p className="text-sm text-stone-600 my-1">{edu.institution}</p>
                    <p className="text-xs text-stone-400">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 text-center">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="text-center">
                    <h4 className="text-sm font-semibold text-stone-800">{cert.name}</h4>
                    <p className="text-sm text-stone-600 my-1">{cert.issuer}</p>
                    <p className="text-xs text-stone-400">{cert.date}</p>
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
