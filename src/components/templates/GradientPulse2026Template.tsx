import React from 'react';
import { ResumeData } from '@/types/resume';
import { ContactLink, getContactType } from '@/utils/contactLinks';

interface Props {
  data: ResumeData;
}

export const GradientPulse2026Template: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor = '#3b82f6' } = data;

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-[1050px] p-8 space-y-6 font-sans box-border">
      {/* Header Card */}
      <header
        className="rounded-3xl p-8 text-white shadow-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor})`,
        }}
      >
        <div className="flex items-center gap-6 relative z-10">
          {personalInfo?.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-full border-4 border-white/30 object-cover shadow-sm"
            />
          )}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">{personalInfo?.fullName}</h1>
            <p className="text-xl font-medium mt-1 opacity-90">{personalInfo?.jobTitle}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-80">
              {personalInfo?.email && <ContactLink value={personalInfo.email} type="email" />}
              {personalInfo?.phone && <ContactLink value={personalInfo.phone} type="phone" />}
              {personalInfo?.location && <span>{personalInfo.location}</span>}
              {personalInfo?.website && <ContactLink value={personalInfo.website} type="website" />}
              {personalInfo?.linkedin && <ContactLink value={personalInfo.linkedin} type="linkedin" />}
              {personalInfo?.github && <ContactLink value={personalInfo.github} type="github" />}
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Professional Summary
              </h2>
              <p className="text-slate-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                    <div className="flex justify-between items-center text-sm font-medium mb-2 text-slate-500">
                      <span>{exp.company} {exp.location && `• ${exp.location}`}</span>
                      <span>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-slate-600 text-sm whitespace-pre-wrap">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800">{proj.title}</h3>
                      <div className="flex gap-2 text-xs font-medium" style={{ color: accentColor }}>
                        {proj.link && <a href={proj.link}>Live</a>}
                        {proj.githubUrl && <a href={proj.githubUrl}>GitHub</a>}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-500">
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

        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {skillCategories && skillCategories.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Skills
              </h2>
              <div className="space-y-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">{cat.categoryName}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full text-white font-medium shadow-sm" style={{ backgroundColor: accentColor }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-slate-800 text-sm">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-sm font-medium text-slate-600">{edu.institution}</p>
                    <div className="text-xs text-slate-500 mt-1">
                      {edu.startDate} - {edu.endDate} {edu.location && `• ${edu.location}`}
                    </div>
                    {edu.gpa && <p className="text-xs text-slate-500 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-6 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-slate-800 text-sm">{cert.name}</h3>
                    <p className="text-xs text-slate-600">{cert.issuer} • {cert.date}</p>
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
