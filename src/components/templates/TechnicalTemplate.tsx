import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const TechnicalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  const contactItems = [
    personalInfo.email && { prefix: '@ ', value: personalInfo.email, type: 'email' as const },
    personalInfo.phone && { prefix: '📞 ', value: personalInfo.phone, type: 'phone' as const },
    personalInfo.location && { prefix: '📍 ', value: personalInfo.location, type: 'location' as const },
    personalInfo.website && { prefix: '→ ', value: personalInfo.website, type: 'website' as const },
    personalInfo.linkedin && { prefix: 'in/ ', value: personalInfo.linkedin, type: 'linkedin' as const },
    personalInfo.github && { prefix: 'git/ ', value: personalInfo.github, type: 'github' as const },
  ].filter((item): item is { prefix: string; value: string; type: 'email' | 'phone' | 'location' | 'website' | 'linkedin' | 'github' } => Boolean(item));

  return (
    <div className="w-full bg-white text-gray-900 min-h-[1050px] font-sans p-10 mx-auto max-w-4xl shadow-sm relative">
      {/* Thin left border accent line */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div className="pl-6">
        <header className="mb-10">
          <h1 className="text-4xl font-mono font-bold tracking-tight mb-3">
            <span style={{ color: accentColor }}>const</span> {personalInfo.fullName.replace(/\s+/g, '_')} = <span style={{ color: accentColor }}>"</span>{personalInfo.jobTitle}<span style={{ color: accentColor }}>"</span>;
          </h1>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 font-mono">
            {contactItems.map((item, index) => (
              <span key={index} className="flex items-center">
                <span>{item.prefix}</span>
                <ContactLink value={item.value} type={item.type} />
              </span>
            ))}
          </div>

          {personalInfo.summary && (
            <div className="mt-6 text-gray-700 leading-relaxed border-l-2 pl-4 py-1" style={{ borderColor: accentColor }}>
              <span className="block text-xs font-mono text-gray-400 mb-1">/** SUMMARY */</span>
              <p>{personalInfo.summary}</p>
            </div>
          )}
        </header>

        {experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-mono font-bold mb-6 flex items-center">
              <span style={{ color: accentColor }} className="mr-2">//</span> EXPERIENCE
            </h2>
            <div className="relative border-l-2 border-dotted border-gray-300 ml-2 pl-6 space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div 
                    className="absolute w-3 h-3 rounded-full -left-[1.90rem] top-1.5 border-2 border-white"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <div className="font-mono text-sm text-gray-500 font-medium whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  
                  <div className="text-lg font-medium mb-3 flex items-center">
                    <span style={{ color: accentColor }}>{exp.company}</span>
                    {exp.location && (
                      <span className="text-gray-500 text-sm ml-2 font-mono">[{exp.location}]</span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skillCategories.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-mono font-bold mb-6 flex items-center">
              <span style={{ color: accentColor }} className="mr-2">/*</span> SKILLS <span style={{ color: accentColor }} className="ml-2">*/</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category) => (
                <div key={category.id} className="bg-gray-50 p-4 rounded border border-gray-100">
                  <h3 className="font-mono text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">{category.categoryName}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-sm font-mono rounded shadow-sm hover:border-gray-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-mono font-bold mb-6 flex items-center">
              <span style={{ color: accentColor }} className="mr-2">#</span> EDUCATION
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="pl-4 border-l-2" style={{ borderColor: accentColor }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                    <div className="font-mono text-sm text-gray-500 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  <div className="text-gray-700 mb-2">
                    {edu.institution} {edu.location && <span className="text-gray-500 font-mono text-sm">| {edu.location}</span>}
                  </div>
                  {edu.gpa && <div className="text-sm font-mono text-gray-600 mb-1">GPA: {edu.gpa}</div>}
                  {edu.highlights && <p className="text-sm text-gray-600 mt-2">{edu.highlights}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
