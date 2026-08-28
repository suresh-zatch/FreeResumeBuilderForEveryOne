import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const NeonFuturistic2026Template: React.FC<Props> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skillCategories,
    projects,
    certifications,
    accentColor = '#00ffcc'
  } = data || {};

  return (
    <div className="w-full min-h-[1050px] bg-slate-900 text-slate-100 font-sans p-8 box-border flex flex-col gap-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div 
        className="absolute top-0 left-0 w-full h-1" 
        style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
      />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-700 pb-6">
        <div className="flex items-center gap-6">
          {personalInfo?.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2"
              style={{ borderColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase" style={{ color: accentColor }}>
              {personalInfo?.fullName || 'Full Name'}
            </h1>
            <h2 className="text-xl font-medium text-slate-300">
              {personalInfo?.jobTitle || 'Job Title'}
            </h2>
          </div>
        </div>
        
        <div className="text-sm text-slate-400 flex flex-col gap-1 items-start md:items-end font-mono">
          {personalInfo?.email && <div><ContactLink value={personalInfo.email} type="email" /></div>}
          {personalInfo?.phone && <div><ContactLink value={personalInfo.phone} type="phone" /></div>}
          {personalInfo?.location && <div>{personalInfo.location}</div>}
          {personalInfo?.website && <div><ContactLink value={personalInfo.website} type="website" /></div>}
          {personalInfo?.linkedin && <div>LinkedIn: <ContactLink value={personalInfo.linkedin} type="linkedin" /></div>}
          {personalInfo?.github && <div>GitHub: <ContactLink value={personalInfo.github} type="github" /></div>}
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="bg-slate-800/50 p-4 rounded border-l-4" style={{ borderColor: accentColor }}>
          <p className="text-slate-300 leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {experience && experience.length > 0 && (
            <section>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 uppercase tracking-widest text-white">
                <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: accentColor }}></span>
                Experience
              </h3>
              <div className="relative border-l-2 border-slate-700 ml-2 pl-6 flex flex-col gap-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <div 
                      className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-slate-900"
                      style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-lg font-bold text-slate-100">{exp.position}</h4>
                      <span className="text-sm font-mono text-slate-400">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-md text-slate-300 mb-2 font-medium">
                      {exp.company} {exp.location && `// ${exp.location}`}
                    </div>
                    {exp.description && (
                      <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
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
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 uppercase tracking-widest text-white">
                <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: accentColor }}></span>
                Projects
              </h3>
              <div className="relative border-l-2 border-slate-700 ml-2 pl-6 flex flex-col gap-8">
                {projects.map((proj, idx) => (
                  <div key={idx} className="relative">
                    <div 
                      className="absolute -left-[31px] top-1 w-4 h-4 rounded-sm border-2 border-slate-900"
                      style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-lg font-bold text-slate-100">{proj.title}</h4>
                      <div className="flex gap-2">
                        {proj.link && <a href={proj.link} className="text-xs font-mono hover:underline" style={{ color: accentColor }}>[Link]</a>}
                        {proj.githubUrl && <a href={proj.githubUrl} className="text-xs font-mono hover:underline" style={{ color: accentColor }}>[GitHub]</a>}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-sm text-slate-400 leading-relaxed mb-3">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
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

        {/* Sidebar Content */}
        <div className="md:col-span-1 flex flex-col gap-8">
          {skillCategories && skillCategories.length > 0 && (
            <section>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 uppercase tracking-widest text-white">
                <span className="w-2 h-6" style={{ backgroundColor: accentColor }}></span>
                Skills
              </h3>
              <div className="flex flex-col gap-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-slate-300 mb-2 uppercase">{cat.categoryName}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="text-xs font-mono px-2 py-1 bg-slate-800/80 rounded border"
                          style={{ borderColor: `${accentColor}40`, color: accentColor }}
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

          {education && education.length > 0 && (
            <section>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 uppercase tracking-widest text-white">
                <span className="w-2 h-6" style={{ backgroundColor: accentColor }}></span>
                Education
              </h3>
              <div className="flex flex-col gap-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-800/40 p-4 rounded border border-slate-700">
                    <h4 className="text-md font-bold text-slate-100">{edu.degree}</h4>
                    <div className="text-sm text-slate-300 mb-1">{edu.fieldOfStudy}</div>
                    <div className="text-sm text-slate-400 mb-2">{edu.institution} {edu.location && `// ${edu.location}`}</div>
                    <div className="flex justify-between text-xs font-mono text-slate-500">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      {edu.gpa && <span style={{ color: accentColor }}>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 uppercase tracking-widest text-white">
                <span className="w-2 h-6" style={{ backgroundColor: accentColor }}></span>
                Certs
              </h3>
              <div className="flex flex-col gap-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-slate-200">{cert.name}</h4>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
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
