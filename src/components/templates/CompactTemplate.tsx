import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const CompactTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  return (
    <div className="w-full bg-white text-gray-900 font-sans min-h-[1050px] text-[10.5px] leading-snug">
      <header className="pt-6 px-6 pb-3 border-b-2" style={{ borderBottomColor: accentColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900">{personalInfo.fullName}</h1>
        <h2 className="text-lg font-medium" style={{ color: accentColor }}>{personalInfo.jobTitle}</h2>
      </header>

      <div className="flex px-6 py-4">
        {/* Left Column */}
        <div className="w-[40%] pr-4 space-y-4">
          <section>
            <h3 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accentColor, borderBottomColor: accentColor }}>Contact</h3>
            <div className="space-y-1 text-gray-700">
              {personalInfo.email && <div>✉ {personalInfo.email}</div>}
              {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
              {personalInfo.location && <div>⌂ {personalInfo.location}</div>}
              {personalInfo.website && <div>🌐 {personalInfo.website}</div>}
              {personalInfo.linkedin && <div>in {personalInfo.linkedin}</div>}
              {personalInfo.github && <div>gh {personalInfo.github}</div>}
            </div>
          </section>

          {skillCategories.length > 0 && (
            <section>
              <h3 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accentColor, borderBottomColor: accentColor }}>Skills</h3>
              <div className="space-y-2">
                {skillCategories.map(cat => (
                  <div key={cat.id}>
                    <div className="font-semibold text-gray-800">{cat.categoryName}</div>
                    <div className="text-gray-600">{cat.skills.join(', ')}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h3 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accentColor, borderBottomColor: accentColor }}>Education</h3>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-semibold text-gray-800">{edu.institution}</div>
                    <div className="text-gray-700">{edu.degree} in {edu.fieldOfStudy}</div>
                    <div className="text-gray-500 italic text-[9.5px]">{edu.startDate} - {edu.endDate}</div>
                    <div className="text-gray-500 text-[9.5px]">{edu.location} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[60%] pl-4 border-l border-gray-200 space-y-4">
          {personalInfo.summary && (
            <section>
              <h3 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accentColor, borderBottomColor: accentColor }}>Summary</h3>
              <p className="text-gray-800 text-justify">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h3 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accentColor, borderBottomColor: accentColor }}>Experience</h3>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-end">
                      <h4 className="font-bold text-gray-900 text-[11.5px]">{exp.position}</h4>
                      <span className="text-gray-600 font-medium whitespace-nowrap">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-1 text-gray-700">
                      <span className="font-semibold">{exp.company}</span>
                      <span className="italic text-[9.5px]">{exp.location}</span>
                    </div>
                    <p className="text-gray-700 leading-tight whitespace-pre-wrap">{exp.description}</p>
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
