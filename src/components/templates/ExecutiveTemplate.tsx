import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-gray-900 min-h-[1050px] flex flex-col font-sans shadow-xl">
      {/* Header */}
      <header className="bg-slate-900 text-white p-12 text-center" style={{ borderBottom: `6px solid ${accentColor}` }}>
        <h1 className="text-5xl font-serif font-bold tracking-wider uppercase mb-3">{personalInfo.fullName}</h1>
        <h2 className="text-2xl font-light tracking-widest text-slate-300 mb-6 uppercase">{personalInfo.jobTitle}</h2>
        
        {contactItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400 font-medium">
            {contactItems.map((item, index) => (
              <span key={index} className="flex items-center">
                <ContactLink value={item} type={getContactType(item, personalInfo)} />
                {index < contactItems.length - 1 && <span className="mx-3 text-slate-600">•</span>}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Body */}
      <div className="flex-grow p-12 space-y-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider mb-4 pl-4" style={{ borderLeft: `4px solid ${accentColor}` }}>Executive Summary</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h3 className="text-xl font-serif font-bold uppercase tracking-wider mb-6 pl-4" style={{ borderLeft: `4px solid ${accentColor}` }}>Professional Experience</h3>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-md font-medium" style={{ color: accentColor }}>{exp.company}</span>
                    <span className="text-sm text-gray-500">{exp.location}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-xl font-serif font-bold uppercase tracking-wider mb-6 pl-4" style={{ borderLeft: `4px solid ${accentColor}` }}>Education</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <div className="mb-2">
                      <span className="text-md font-medium" style={{ color: accentColor }}>{edu.institution}</span>
                      <span className="text-sm text-gray-500 ml-2">• {edu.location}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                    {edu.highlights && <p className="text-sm text-gray-700 mt-1">{edu.highlights}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skillCategories.length > 0 && (
            <section>
              <h3 className="text-xl font-serif font-bold uppercase tracking-wider mb-6 pl-4" style={{ borderLeft: `4px solid ${accentColor}` }}>Core Competencies</h3>
              <div className="space-y-4">
                {skillCategories.map((category) => (
                  <div key={category.id}>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">{category.categoryName}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {category.skills.join(' • ')}
                    </p>
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
