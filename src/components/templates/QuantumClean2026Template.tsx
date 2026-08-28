import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const QuantumClean2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  const defaultAccent = '#000000';
  const color = accentColor || defaultAccent;

  return (
    <div className="w-full bg-white text-black min-h-[1050px] p-10 font-sans tracking-tight">
      <header className="mb-10 pb-6 border-b-4" style={{ borderColor: color }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none" style={{ color: color }}>
              {personalInfo?.fullName}
            </h1>
            <p className="text-2xl font-light uppercase tracking-widest">{personalInfo?.jobTitle}</p>
          </div>
          {personalInfo?.photoUrl && (
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-28 h-28 grayscale object-cover" />
          )}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium uppercase tracking-wider">
          {personalInfo?.email && <div><ContactLink value={personalInfo.email} type="email" /></div>}
          {personalInfo?.phone && <div><ContactLink value={personalInfo.phone} type="phone" /></div>}
          {personalInfo?.location && <div>{personalInfo.location}</div>}
          {personalInfo?.website && <div><ContactLink value={personalInfo.website} type="website" /></div>}
          {personalInfo?.linkedin && <div><ContactLink value={personalInfo.linkedin} type="linkedin" /></div>}
          {personalInfo?.github && <div><ContactLink value={personalInfo.github} type="github" /></div>}
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="mb-12 max-w-4xl">
          <p className="text-xl font-medium leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column */}
        <div className="md:col-span-8 space-y-12">
          
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ borderColor: color }}>
                Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-1/4 shrink-0 text-sm font-bold uppercase tracking-wider mt-1 text-gray-500">
                      {exp.startDate} –<br/> {exp.current ? 'PRESENT' : exp.endDate}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold leading-none mb-1">{exp.position}</h3>
                      <div className="text-lg font-medium mb-3" style={{ color: color }}>
                        {exp.company} {exp.location && <span className="text-gray-400">/ {exp.location}</span>}
                      </div>
                      {exp.description && (
                        <p className="text-base leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ borderColor: color }}>
                Projects
              </h2>
              <div className="space-y-8">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline gap-4 mb-2">
                      <h3 className="text-xl font-bold">{proj.title}</h3>
                      <div className="text-sm font-bold uppercase tracking-wider">
                        {proj.link && <a href={proj.link} className="hover:underline mr-3">LINK</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} className="hover:underline">GITHUB</a>}
                      </div>
                    </div>
                    <p className="text-base mb-3">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-1 border border-black">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 space-y-12">
          
          {skillCategories && skillCategories.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ borderColor: color }}>
                Skills
              </h2>
              <div className="space-y-6">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-500">
                      {cat.categoryName}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {cat.skills.map((skill, i) => (
                        <div key={i} className="text-base font-medium">{skill}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ borderColor: color }}>
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-bold leading-tight mb-1">{edu.degree}</h3>
                    <div className="text-base font-medium mb-1">{edu.fieldOfStudy}</div>
                    <div className="text-sm uppercase tracking-wider text-gray-500">{edu.institution}</div>
                    <div className="text-sm uppercase tracking-wider text-gray-500">
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ borderColor: color }}>
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <h3 className="text-base font-bold">{cert.name}</h3>
                    <div className="text-sm uppercase tracking-wider text-gray-500">{cert.issuer}</div>
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
