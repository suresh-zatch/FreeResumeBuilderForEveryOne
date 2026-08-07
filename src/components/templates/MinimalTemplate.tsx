import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<Props> = ({ data }) => {
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
    <div className="w-full bg-white text-gray-900 font-sans text-xs leading-relaxed p-10 min-h-[1050px] space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: accentColor }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>

        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[10.5px] text-gray-500">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>•</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <p className="text-gray-700 leading-relaxed text-[11px] font-normal">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-3">
          <h3
            className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pb-1 border-b border-gray-100"
          >
            Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-gray-900 text-xs">{exp.position}</span>
                  <span className="text-[10px] text-gray-400">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] font-medium" style={{ color: accentColor }}>
                  {exp.company} {exp.location ? `— ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <div className="text-gray-600 text-[10.5px] whitespace-pre-line leading-relaxed pt-0.5">
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
        <div className="space-y-3">
          <h3
            className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pb-1 border-b border-gray-100"
          >
            Education
          </h3>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-gray-900 text-xs">{edu.degree}</span>
                  <span className="text-gray-600 font-medium text-[11px] ml-2">in {edu.fieldOfStudy}</span>
                  <p className="text-gray-500 text-[10px]">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                </div>
                <span className="text-[10px] text-gray-400">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <div className="space-y-3">
          <h3
            className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pb-1 border-b border-gray-100"
          >
            Skills & Tools
          </h3>
          <div className="space-y-1.5">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="flex items-start text-[11px]">
                <span className="font-semibold text-gray-900 w-32 shrink-0">{cat.categoryName}:</span>
                <span className="text-gray-600">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
