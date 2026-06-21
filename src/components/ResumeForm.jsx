"use client";
import React, { useState } from "react";
import { User, Briefcase, GraduationCap, FolderCode, BrainCircuit } from "lucide-react";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import CertificationsSection from "./CertificationsSection";

export default function ResumeForm({ resumeData, onChange }) {
  const [activeTab, setActiveTab] = useState("profile");

  const updatePersonal = (field, value) => {
    onChange({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value,
      },
    });
  };

  const updateSection = (section, value) => {
    onChange({
      ...resumeData,
      [section]: value,
    });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderCode },
    { id: "skills-certs", label: "Skills & Certs", icon: BrainCircuit },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Premium Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === "profile" && (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2 mb-1">
                <User size={18} className="text-violet-400" /> Personal Details
              </h3>
              <p className="text-xs text-zinc-400">Fill in your contact details and professional summary</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={resumeData.personal.fullName || ""}
                  onChange={(e) => updatePersonal("fullName", e.target.value)}
                  placeholder="e.g., Amit Biswas"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={resumeData.personal.email || ""}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  placeholder="e.g., amit.biswas.dev@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={resumeData.personal.phone || ""}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                  placeholder="e.g., +1 (555) 019-2834"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Location</label>
                <input
                  type="text"
                  value={resumeData.personal.location || ""}
                  onChange={(e) => updatePersonal("location", e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={resumeData.personal.linkedin || ""}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)}
                  placeholder="e.g., https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">GitHub Profile URL</label>
                <input
                  type="url"
                  value={resumeData.personal.github || ""}
                  onChange={(e) => updatePersonal("github", e.target.value)}
                  placeholder="e.g., https://github.com/username"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Professional Summary
                </label>
                <textarea
                  value={resumeData.personal.summary || ""}
                  onChange={(e) => updatePersonal("summary", e.target.value)}
                  placeholder="Summarize your professional experience, major achievements, and core strengths in 3-4 sentences..."
                  rows={5}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <ExperienceSection
            experience={resumeData.experience}
            onChange={(value) => updateSection("experience", value)}
          />
        )}

        {activeTab === "education" && (
          <EducationSection
            education={resumeData.education}
            onChange={(value) => updateSection("education", value)}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsSection
            projects={resumeData.projects}
            onChange={(value) => updateSection("projects", value)}
          />
        )}

        {activeTab === "skills-certs" && (
          <div className="space-y-6">
            <SkillsSection
              skills={resumeData.skills}
              onChange={(value) => updateSection("skills", value)}
            />
            <CertificationsSection
              certifications={resumeData.certifications}
              onChange={(value) => updateSection("certifications", value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
