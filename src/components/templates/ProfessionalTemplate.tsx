import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<Props> = ({ data }) => {
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
    <div className="w-full bg-white text-gray-900 font-sans min-h-[1050px]">
      <div className="h-1 w-full" style={{ backgroundColor: accentColor }}></div>
      
      <header className="px-10 py-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
          <h2 className="text-xl mt-1 text-gray-600 font-medium">{personalInfo.jobTitle}</h2>
        </div>
        <div className="text-right text-sm text-gray-600 space-y-1">
          {contacts.map((contact, i) => (
            <div key={i}>
              <ContactLink value={contact} type={getContactType(contact, personalInfo)} />
            </div>
          ))}
        </div>
      </header>

      <div className="px-10 pb-10 space-y-6">
        {personalInfo.summary && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-3 border-b border-gray-300" style={{ color: accentColor }}>Professional Summary</h3>
            <p className="text-gray-800 leading-relaxed text-sm">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-4 border-b border-gray-300" style={{ color: accentColor }}>Professional Experience</h3>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-sm text-gray-600 font-medium">
                    <div>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    <div className="text-xs mt-1 text-gray-500">{exp.location}</div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">{exp.company}</h4>
                    <div className="text-sm italic text-gray-700 mb-2">{exp.position}</div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-4 border-b border-gray-300" style={{ color: accentColor }}>Education</h3>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-sm text-gray-600 font-medium">
                    <div>{edu.startDate} – {edu.endDate}</div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">{edu.institution} <span className="font-normal text-sm text-gray-600 ml-1">| {edu.location}</span></h4>
                    <div className="text-sm text-gray-800">{edu.degree} in {edu.fieldOfStudy}</div>
                    {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
                    {edu.highlights && <p className="text-sm text-gray-700 mt-1">{edu.highlights}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skillCategories.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest pb-2 mb-4 border-b border-gray-300" style={{ color: accentColor }}>Core Competencies</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {skillCategories.map(cat => (
                <div key={cat.id}>
                  <div className="text-sm font-bold text-gray-900 mb-1">{cat.categoryName}</div>
                  <div className="text-sm text-gray-600">{cat.skills.join(' • ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
