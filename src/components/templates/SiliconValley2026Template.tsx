import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const SiliconValley2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  return (
    <div className="w-full bg-white text-gray-900 min-h-[1050px] p-8 font-sans">
      <header className="flex justify-between items-center border-b border-gray-200 pb-6 mb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">{personalInfo?.fullName}</h1>
          {personalInfo?.jobTitle && (
            <span 
              className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-3"
              style={{ backgroundColor: accentColor || '#3b82f6' }}
            >
              {personalInfo.jobTitle}
            </span>
          )}
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex gap-4 flex-wrap">
              {personalInfo?.email && <ContactLink value={personalInfo.email} type="email" />}
              {personalInfo?.phone && <ContactLink value={personalInfo.phone} type="phone" />}
              {personalInfo?.location && <span>{personalInfo.location}</span>}
            </div>
            <div className="flex gap-4 flex-wrap mt-1">
              {personalInfo?.website && <ContactLink value={personalInfo.website} type="website" />}
              {personalInfo?.linkedin && <ContactLink value={personalInfo.linkedin} type="linkedin" />}
              {personalInfo?.github && <ContactLink value={personalInfo.github} type="github" />}
            </div>
          </div>
        </div>
        {personalInfo?.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt={personalInfo.fullName} 
            className="w-24 h-24 rounded-full object-cover ml-6 border-2 border-gray-100"
          />
        )}
      </header>

      {personalInfo?.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <div className="flex gap-8">
        {/* Left Column - 70% */}
        <div className="w-[70%] space-y-8">
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center border-b border-gray-100 pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2" style={{ borderColor: accentColor || '#e5e7eb' }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-md font-medium text-gray-700 mb-2">
                      {exp.company} {exp.location && <span className="text-gray-400 font-normal">| {exp.location}</span>}
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center border-b border-gray-100 pb-2">
                Projects
              </h2>
              <div className="space-y-5">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-semibold">{proj.title}</h3>
                      <div className="flex gap-2 text-sm">
                        {proj.link && <a href={proj.link} className="text-blue-600 hover:underline">Link</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} className="text-blue-600 hover:underline">GitHub</a>}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - 30% */}
        <div className="w-[30%] space-y-8">
          {skillCategories && skillCategories.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="space-y-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider" style={{ color: accentColor }}>
                      {cat.categoryName}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, i) => (
                        <span key={i} className="text-xs border border-gray-200 text-gray-700 px-2 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="text-md font-semibold leading-tight">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <div className="text-sm text-gray-700 mt-1">{edu.institution}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate} {edu.location && `| ${edu.location}`}
                    </div>
                    {edu.gpa && <div className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</div>}
                    {edu.highlights && <div className="text-xs text-gray-600 mt-1 italic">{edu.highlights}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold">{cert.name}</h3>
                    <div className="text-xs text-gray-600">{cert.issuer} • {cert.date}</div>
                    {cert.url && (
                      <a href={cert.url} className="text-xs text-blue-600 hover:underline mt-1 block">
                        View Credential
                      </a>
                    )}
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
