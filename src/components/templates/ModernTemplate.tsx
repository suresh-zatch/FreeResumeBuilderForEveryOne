import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface Props {
  data: ResumeData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experience, education, skillCategories, projects, certifications, accentColor } = data;

  return (
    <div className="w-full bg-white text-gray-800 font-sans text-xs leading-relaxed p-8 min-h-[1050px] shadow-sm">
      {/* Header Banner */}
      <div
        className="p-6 rounded-xl text-white mb-6 flex items-center justify-between shadow-sm"
        style={{ backgroundColor: accentColor }}
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-sm font-medium opacity-90">{personalInfo.jobTitle || 'Job Title'}</p>
        </div>

        {personalInfo.photoUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
        )}
      </div>

      {/* Grid Layout: Left Sidebar (35%) & Main Content (65%) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-4 space-y-6 border-r border-gray-100 pr-4">
          {/* Contact Details */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Contact
            </h3>
            <div className="space-y-2 text-[11px] text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5 break-all">
                  <LinkedinIcon />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5 break-all">
                  <GithubIcon />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education Sidebar */}
          {education.length > 0 && (
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-900 text-[11px]">{edu.degree}</p>
                    <p className="text-gray-600 font-medium text-[10px]">{edu.institution}</p>
                    <p className="text-gray-400 text-[10px]">
                      {edu.endDate} {edu.location ? `| ${edu.location}` : ''}
                    </p>
                    {edu.gpa && <p className="text-gray-500 text-[10px] italic">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Sidebar */}
          {skillCategories.length > 0 && (
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Skills
              </h3>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="font-semibold text-gray-800 text-[11px] mb-1">{cat.categoryName}</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Sidebar */}
          {certifications && certifications.length > 0 && (
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Certifications
              </h3>
              <div className="space-y-2 text-[10.5px]">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-gray-500 text-[10px]">{c.issuer} ({c.date})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="col-span-8 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Professional Profile
              </h3>
              <p className="text-gray-700 leading-relaxed text-[11px]">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Work Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: accentColor }}>
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-bold text-gray-900 text-xs">{exp.position}</h4>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-gray-600 mb-1.5">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </p>
                    {exp.description && (
                      <div className="text-gray-700 text-[10.5px] whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Featured Projects
              </h3>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 bg-gray-50 border border-gray-100 rounded-lg space-y-1">
                    <h4 className="font-bold text-gray-900 text-xs">{proj.title}</h4>
                    {proj.description && <p className="text-gray-600 text-[10.5px]">{proj.description}</p>}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white text-gray-700 text-[9.5px] border border-gray-200 rounded font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
