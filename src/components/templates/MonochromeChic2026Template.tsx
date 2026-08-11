import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const MonochromeChic2026Template: React.FC<Props> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skillCategories,
    projects,
    certifications,
  } = data || {};

  return (
    <div className="w-full min-h-[1050px] bg-[#fafafa] text-[#1a1a1a] p-12 box-border flex flex-col gap-10">
      
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-6 pb-10 border-b-[1px] border-[#e0e0e0]">
        {personalInfo?.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover grayscale"
          />
        )}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-serif tracking-[0.2em] uppercase font-light mb-4">
            {personalInfo?.fullName || 'Full Name'}
          </h1>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#666666]">
            {personalInfo?.jobTitle || 'Job Title'}
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-[0.1em] text-[#555555] uppercase font-light">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="bg-[#f0f0f0] p-8 text-center">
          <p className="text-sm font-serif italic leading-loose text-[#333333] max-w-3xl mx-auto">
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {experience && experience.length > 0 && (
            <section>
              <h3 className="text-xs tracking-[0.25em] uppercase font-bold text-[#111111] mb-8 border-b-[1px] border-[#e0e0e0] pb-2">
                Experience
              </h3>
              <div className="flex flex-col gap-10">
                {experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                      <h4 className="text-lg font-serif font-medium text-[#222222]">{exp.position}</h4>
                      <span className="text-xs tracking-[0.15em] uppercase text-[#777777] mt-1 md:mt-0">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm tracking-[0.1em] uppercase text-[#555555] mb-4">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.description && (
                      <p className="text-sm leading-relaxed text-[#444444] text-justify font-light">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h3 className="text-xs tracking-[0.25em] uppercase font-bold text-[#111111] mb-8 border-b-[1px] border-[#e0e0e0] pb-2">
                Selected Projects
              </h3>
              <div className="flex flex-col gap-8">
                {projects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-md font-serif font-medium text-[#222222]">{proj.title}</h4>
                      <div className="flex gap-4 text-xs tracking-[0.1em] uppercase text-[#666666]">
                        {proj.link && <a href={proj.link} className="hover:text-black">Link</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} className="hover:text-black">Github</a>}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-sm leading-relaxed text-[#444444] font-light mb-3">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-xs tracking-[0.1em] text-[#888888] font-light">
                        {proj.technologies.join(' / ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          
          {skillCategories && skillCategories.length > 0 && (
            <section>
              <h3 className="text-xs tracking-[0.25em] uppercase font-bold text-[#111111] mb-8 border-b-[1px] border-[#e0e0e0] pb-2">
                Expertise
              </h3>
              <div className="flex flex-col gap-6">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs tracking-[0.15em] uppercase text-[#555555] mb-3">{cat.categoryName}</h4>
                    <div className="flex flex-col gap-1 text-sm text-[#333333] font-light">
                      {cat.skills.map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h3 className="text-xs tracking-[0.25em] uppercase font-bold text-[#111111] mb-8 border-b-[1px] border-[#e0e0e0] pb-2">
                Education
              </h3>
              <div className="flex flex-col gap-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h4 className="text-sm font-serif font-medium text-[#222222] mb-1">{edu.degree}</h4>
                    <span className="text-xs tracking-[0.1em] uppercase text-[#555555] mb-2">{edu.fieldOfStudy}</span>
                    <span className="text-sm text-[#444444] font-light mb-1">{edu.institution}</span>
                    <div className="text-xs tracking-[0.1em] text-[#888888]">
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-xs tracking-[0.25em] uppercase font-bold text-[#111111] mb-8 border-b-[1px] border-[#e0e0e0] pb-2">
                Credentials
              </h3>
              <div className="flex flex-col gap-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h4 className="text-sm font-serif text-[#333333] mb-1">{cert.name}</h4>
                    <span className="text-xs tracking-[0.1em] uppercase text-[#777777]">{cert.issuer}</span>
                    <span className="text-xs tracking-[0.1em] text-[#999999] mt-1">{cert.date}</span>
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
