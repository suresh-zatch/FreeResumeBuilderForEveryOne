import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  const contactInfo = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-gray-900 font-serif text-xs leading-normal p-10 min-h-[1050px] space-y-5">
      {/* Centered Header */}
      <div className="text-center space-y-1 pb-3 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xs font-semibold italic text-gray-700">{personalInfo.jobTitle}</p>
        {contactInfo.length > 0 && (
          <p className="text-[10px] text-gray-600 font-sans tracking-tight pt-1">
            {contactInfo.join('  |  ')}
          </p>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="space-y-1">
          <h3
            className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Executive Summary
          </h3>
          <p className="text-gray-800 text-[11px] leading-relaxed text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-2">
          <h3
            className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Professional Experience
          </h3>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-gray-900 text-xs">
                  <span>
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ''}
                  </span>
                  <span className="font-sans text-[10px] text-gray-600 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="italic text-gray-700 text-[11px] font-medium">{exp.position}</div>
                {exp.description && (
                  <div className="text-gray-800 text-[10.5px] whitespace-pre-line leading-relaxed pl-2 border-l border-gray-200">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="space-y-2">
          <h3
            className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Education & Academic Credentials
          </h3>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-gray-900 text-xs">{edu.institution}</span>
                  {edu.location ? <span className="text-gray-600 text-[11px]">, {edu.location}</span> : null}
                  <p className="italic text-gray-700 text-[11px]">
                    {edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}
                  </p>
                </div>
                <span className="font-sans text-[10px] text-gray-600">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <div className="space-y-2">
          <h3
            className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Core Competencies & Technical Skills
          </h3>
          <div className="grid grid-cols-1 gap-1 font-sans text-[10.5px]">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="flex items-baseline">
                <span className="font-bold text-gray-900 w-36 shrink-0">{cat.categoryName}:</span>
                <span className="text-gray-700">{cat.skills.join(' • ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
