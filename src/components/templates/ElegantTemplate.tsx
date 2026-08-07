import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const ElegantTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`,
  ].filter(Boolean);

  const Divider = () => (
    <div className="flex items-center justify-center py-6 w-full opacity-60">
      <div className="h-px bg-gray-300 w-16"></div>
      <div className="mx-4 transform rotate-45 w-1.5 h-1.5" style={{ backgroundColor: accentColor }}></div>
      <div className="h-px bg-gray-300 w-16"></div>
    </div>
  );

  return (
    <div className="w-full bg-white text-gray-900 min-h-[1050px] p-12 md:p-16 mx-auto max-w-4xl shadow-sm">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-serif tracking-[0.2em] uppercase text-gray-900 mb-4 font-light">
          {personalInfo.fullName}
        </h1>
        <p className="text-lg tracking-[0.1em] text-gray-500 uppercase font-light mb-6" style={{ color: accentColor }}>
          {personalInfo.jobTitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500 font-light tracking-wide">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              {index < contactItems.length - 1 && <span className="text-gray-300">|</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {personalInfo.summary && (
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-gray-600 leading-loose font-serif italic text-lg text-justify" style={{ textJustify: 'inter-character' }}>
            "{personalInfo.summary}"
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <section>
          <Divider />
          <h2 className="text-center text-sm font-semibold tracking-[0.3em] uppercase text-gray-900 mb-10">
            Professional Experience
          </h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-serif text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-400 uppercase tracking-widest font-light">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div className="text-base uppercase tracking-wider" style={{ color: accentColor }}>
                      {exp.company}
                    </div>
                    {exp.location && (
                      <span className="text-sm text-gray-400 font-light italic">{exp.location}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-light text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <Divider />
          <h2 className="text-center text-sm font-semibold tracking-[0.3em] uppercase text-gray-900 mb-10">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-serif text-gray-900">
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </h3>
                  <span className="text-sm text-gray-400 uppercase tracking-widest font-light">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-base text-gray-600">
                    {edu.institution}
                  </div>
                  {edu.location && (
                    <span className="text-sm text-gray-400 font-light italic">{edu.location}</span>
                  )}
                </div>
                {edu.gpa && <div className="text-sm text-gray-500 font-light">GPA: {edu.gpa}</div>}
                {edu.highlights && <p className="text-gray-600 font-light mt-2 text-sm leading-relaxed">{edu.highlights}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skillCategories.length > 0 && (
        <section>
          <Divider />
          <h2 className="text-center text-sm font-semibold tracking-[0.3em] uppercase text-gray-900 mb-8">
            Expertise
          </h2>
          <div className="text-center space-y-4">
            {skillCategories.map((category) => (
              <div key={category.id} className="mb-4">
                <span className="font-serif italic text-gray-700 mr-3 text-lg">
                  {category.categoryName} —
                </span>
                <span className="text-gray-500 font-light leading-loose">
                  {category.skills.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
