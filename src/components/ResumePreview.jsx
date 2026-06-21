"use client";
import React, { forwardRef } from "react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

// Inline SVG brand icons since lucide-react deprecated brand icons in recent versions
const LinkedinIcon = ({ size = 11, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 11, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ResumePreview = forwardRef(({ resumeData }, ref) => {
  const { personal, skills = [], education = [], experience = [], projects = [], certifications = [] } = resumeData;

  const hasPersonal = personal.fullName || personal.email || personal.phone || personal.location;

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      {/* simulated A4 page */}
      <div
        ref={ref}
        id="resume-a4-page"
        className="w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] mx-auto shadow-2xl rounded-sm border border-gray-200/80 relative flex flex-col font-sans select-text text-left print:shadow-none print:border-0 print:p-0"
        style={{
          boxSizing: "border-box",
          pageBreakInside: "avoid",
        }}
      >
        {/* Header Section */}
        {hasPersonal && (
          <header className="border-b-2 border-zinc-900 pb-5 mb-6 text-center">
            {personal.fullName && (
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 uppercase mb-2">
                {personal.fullName}
              </h1>
            )}

            {/* Contact Details Grid */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-gray-700 font-medium mt-3">
              {personal.email && (
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-gray-500" />
                  {personal.email}
                </span>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-gray-500" />
                  {personal.phone}
                </span>
              )}
              {personal.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-gray-500" />
                  {personal.location}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-600 font-semibold mt-2.5">
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 hover:text-zinc-950 transition-colors"
                >
                  <LinkedinIcon size={11} className="text-gray-500" />
                  LinkedIn
                </a>
              )}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 hover:text-zinc-950 transition-colors"
                >
                  <GithubIcon size={11} className="text-gray-500" />
                  GitHub
                </a>
              )}
            </div>
          </header>
        )}

        <div className="space-y-6 flex-1">
          {/* Professional Summary */}
          {personal.summary && (
            <section className="space-y-2">
              <h2 className="text-sm font-bold tracking-wider text-zinc-950 uppercase border-b border-gray-300 pb-1">
                Professional Summary
              </h2>
              <p className="text-[12px] leading-relaxed text-gray-700 text-justify">
                {personal.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold tracking-wider text-zinc-950 uppercase border-b border-gray-300 pb-1">
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-bold text-black">{exp.position}</span>
                        {exp.company && (
                          <span className="text-zinc-600">
                            {" "}
                            | <span className="font-semibold">{exp.company}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500 font-semibold whitespace-nowrap">
                        {exp.startDate} – {exp.endDate || (exp.isCurrent ? "Present" : "")}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[11px] leading-relaxed text-gray-700 whitespace-pre-line text-justify pl-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold tracking-wider text-zinc-950 uppercase border-b border-gray-300 pb-1">
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-black">{proj.name}</span>
                        {proj.role && <span className="text-gray-500 italic text-[11px]">({proj.role})</span>}
                      </div>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-0.5 text-[10px] text-gray-500 hover:text-black font-medium"
                        >
                          Project Link <ExternalLink size={8} />
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[11px] leading-relaxed text-gray-700 text-justify pl-1">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold tracking-wider text-zinc-950 uppercase border-b border-gray-300 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-bold text-black">{edu.degree}</span>
                        {edu.fieldOfStudy && <span> in <span className="font-semibold text-black">{edu.fieldOfStudy}</span></span>}
                        {edu.school && <div className="text-zinc-600 font-medium">{edu.school}</div>}
                      </div>
                      <span className="text-gray-500 font-semibold whitespace-nowrap">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-[11px] leading-relaxed text-gray-700 text-justify pl-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-bold tracking-wider text-zinc-950 uppercase border-b border-gray-300 pb-1">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11.5px] text-zinc-800 leading-relaxed pl-1">
                {skills.map((skill, idx) => (
                  <span key={idx} className="font-medium">
                    {skill}
                    {idx < skills.length - 1 ? <span className="text-gray-400 ml-2">•</span> : ""}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-bold tracking-wider text-zinc-950 uppercase border-b border-gray-300 pb-1">
                Certifications & Licences
              </h2>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-700 pl-1">
                {certifications.map((cert, idx) => (
                  <li key={idx}>
                    <span className="font-semibold text-black">{cert.name}</span>
                    {cert.issuer && <span> – Issued by {cert.issuer}</span>}
                    {cert.date && <span className="text-gray-500"> ({cert.date})</span>}
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-gray-400 hover:text-black ml-1.5"
                      >
                        <ExternalLink size={8} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
