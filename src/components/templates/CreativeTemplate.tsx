import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, accentColor } = data;

  const contactItems = [
    { label: 'Email', value: personalInfo.email },
    { label: 'Phone', value: personalInfo.phone },
    { label: 'Location', value: personalInfo.location },
    { label: 'Website', value: personalInfo.website },
    { label: 'LinkedIn', value: personalInfo.linkedin },
    { label: 'GitHub', value: personalInfo.github },
  ].filter(item => item.value);

  return (
    <div className="w-full bg-white text-gray-900 min-h-[1050px] flex font-sans shadow-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-[35%] p-10 text-white flex flex-col" style={{ backgroundColor: accentColor }}>
        {personalInfo.photoUrl ? (
          <div className="mb-8 flex justify-center">
            <img src={personalInfo.photoUrl} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg" />
          </div>
        ) : (
          <div className="mb-12 mt-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-bold tracking-tighter">{personalInfo.fullName.charAt(0)}</span>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-black tracking-tight leading-none mb-3">{personalInfo.fullName}</h1>
        <h2 className="text-xl font-medium tracking-wide uppercase opacity-90 mb-10">{personalInfo.jobTitle}</h2>

        {/* Contact Info */}
        <div className="mb-12 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white border-opacity-30 pb-2 mb-4">Contact</h3>
          {contactItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs uppercase tracking-wider opacity-70 mb-1">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white border-opacity-30 pb-2 mb-4">Expertise</h3>
            {skillCategories.map((category) => (
              <div key={category.id}>
                <h4 className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-3">{category.categoryName}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-12 bg-white">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: accentColor }}>
                <span className="text-white text-lg font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">About Me</h3>
            </div>
            <p className="text-gray-600 leading-relaxed pl-12 text-lg font-light">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: accentColor }}>
                <span className="text-white text-lg font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Experience</h3>
            </div>
            <div className="space-y-10 pl-12 relative border-l-2 ml-4" style={{ borderColor: `${accentColor}40` }}>
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8">
                  <div className="absolute w-4 h-4 rounded-full -left-[9px] top-1" style={{ backgroundColor: accentColor }}></div>
                  <div className="flex flex-col mb-2">
                    <span className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-md font-medium text-gray-700">{exp.company} • {exp.location}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: accentColor }}>
                <span className="text-white text-lg font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Education</h3>
            </div>
            <div className="space-y-8 pl-12 relative border-l-2 ml-4" style={{ borderColor: `${accentColor}40` }}>
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-8">
                  <div className="absolute w-4 h-4 rounded-full -left-[9px] top-1" style={{ backgroundColor: accentColor }}></div>
                  <div className="flex flex-col mb-2">
                    <span className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <span className="text-md font-medium text-gray-700">{edu.institution} • {edu.location}</span>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>}
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
