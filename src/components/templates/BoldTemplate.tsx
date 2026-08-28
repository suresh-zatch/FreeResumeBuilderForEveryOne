import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const BoldTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-gray-900 font-sans min-h-[1050px] shadow-sm">
      <div style={{ backgroundColor: accentColor }} className="px-10 py-12 text-white">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-2">{personalInfo.fullName}</h1>
        <h2 className="text-2xl font-bold opacity-80 uppercase tracking-wide mb-6">{personalInfo.jobTitle}</h2>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          {contacts.map((contact, i) => (
            <ContactLink
              key={i}
              value={contact}
              type={getContactType(contact, personalInfo)}
              className="bg-white/20 px-3 py-1 rounded-full"
            />
          ))}
        </div>
      </div>
      
      <div className="p-10 space-y-8">
        {personalInfo.summary && (
          <section>
            <h3 className="text-xl font-black uppercase mb-4 pb-2 border-b-4 inline-block" style={{ borderBottomColor: accentColor }}>Summary</h3>
            <p className="text-gray-700 leading-relaxed font-medium">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h3 className="text-xl font-black uppercase mb-6 pb-2 border-b-4 inline-block w-full" style={{ borderBottomColor: accentColor }}>Experience</h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xl font-bold">{exp.company}</h4>
                    <span className="text-sm font-bold opacity-75" style={{ color: accentColor }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-semibold text-gray-800">{exp.position}</span>
                    <span className="text-sm text-gray-500 font-medium">{exp.location}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h3 className="text-xl font-black uppercase mb-6 pb-2 border-b-4 inline-block w-full" style={{ borderBottomColor: accentColor }}>Education</h3>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-lg font-bold">{edu.institution}</h4>
                    <span className="text-sm font-bold opacity-75" style={{ color: accentColor }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-gray-800 font-semibold mb-1">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-gray-600 text-sm flex justify-between">
                    <span>{edu.location}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                  {edu.highlights && <p className="text-gray-700 mt-2 text-sm">{edu.highlights}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skillCategories.length > 0 && (
          <section>
            <h3 className="text-xl font-black uppercase mb-6 pb-2 border-b-4 inline-block w-full" style={{ borderBottomColor: accentColor }}>Expertise</h3>
            <div className="space-y-4">
              {skillCategories.map(cat => (
                <div key={cat.id}>
                  <h4 className="font-bold text-gray-800 uppercase text-sm mb-2">{cat.categoryName}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: accentColor }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
