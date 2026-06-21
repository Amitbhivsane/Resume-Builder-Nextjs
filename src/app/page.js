"use client";
import React, { useState, useRef } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import ATSScore from "../components/ATSScore";
import DownloadPDF from "../components/DownloadPDF";
import { Sparkles, Edit3, Eye, BarChart2, Globe, Heart } from "lucide-react";

const initialData = {
  personal: {
    fullName: "Amit Bhivsane",
    email: "amitbhivsane@gmail.com",
    phone: "+91-8000000008",
    location: "San Francisco, CA",
    linkedin: "https://www.linkedin.com/in/amit-bhivsane-97601262",
    github: "https://github.com/Amitbhivsane",
    summary:
      "Senior Full Stack Web Developer with over 5 years of experience building high-performance web applications. Specialized in Next.js, React, Node.js, and cloud deployments. Passionate about writing clean, maintainable, and ATS-friendly code.",
  },
  skills: [
    "JavaScript (ES6+)",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Git & GitHub",
    "REST APIs",
    "Docker",
    "AWS (S3/EC2)",
    "Jest",
    "TypeScript",
  ],
  education: [
    {
      school: "California State University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "Sep 2017",
      endDate: "May 2021",
      description:
        "Graduated with Magna Cum Laude. Recipient of Dean's Honor List for 6 semesters. Completed coursework in Advanced Algorithms, Database Systems, and Cloud Architectures.",
    },
  ],
  experience: [
    {
      company: "InnovateTech Solutions",
      position: "Lead Web Developer",
      startDate: "Jun 2023",
      endDate: "Present",
      description:
        "Led development of a premium SaaS builder, improving page load speeds by 40% using code splitting and Server Component optimizations.\nManaged a team of 4 frontend engineers, defining code style, conducting reviews, and establishing CI/CD pipelines.\nImplemented secure checkout integrations with Stripe and auth flows with OAuth2.",
      isCurrent: true,
    },
    {
      company: "PixelCode Agency",
      position: "Software Engineer",
      startDate: "Jun 2021",
      endDate: "May 2023",
      description:
        "Developed responsive React web applications, reducing bundle sizes by 25% through tree-shaking and dynamic imports.\nCollaborated closely with designers to build accessible UI component libraries based on WAI-ARIA and Tailwind CSS.\nMaintained 95%+ unit test coverage using Jest and React Testing Library.",
      isCurrent: false,
    },
  ],
  projects: [
    {
      name: "Aura Commerce Platform",
      description:
        "Built a fully-featured e-commerce store utilizing Next.js Server Actions, MongoDB, and Tailwind. Optimized for core web vitals, achieving 100/100 on desktop Lighthouse audits.",
      role: "Creator & Lead Developer",
      link: "https://github.com/Amitbhivsane/E-Commerce_Web_App_React_Firebase_Razorpay",
    },
    {
      name: "SaaS Analytics Dashboard",
      description:
        "Created a real-time tracking dashboard for business metrics using Recharts and WebSockets. Designed complex SQL queries to aggregate millions of database rows under 200ms.",
      role: "Solo Developer",
      link: "https://github.com/Amitbhivsane/React-Material-U--Food-site",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Jan 2024",
      link: "https://aws.amazon.com/verification",
    },
    {
      name: "Next.js Core Developer Credential",
      issuer: "Vercel",
      date: "Aug 2023",
      link: "https://vercel.com/verification",
    },
  ],
};

export default function Home() {
  const [resumeData, setResumeData] = useState(initialData);
  const [mobileTab, setMobileTab] = useState("edit"); // "edit" | "preview" | "ats"
  const resumeRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Dark Header Bar */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/25">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              AURA RESUME
              <span className="text-[10px] tracking-wide font-extrabold uppercase px-1.5 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-md">
                PRO
              </span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
              Developer: <span className="text-zinc-200">Amit Bhivsane</span> •{" "}
              <span className="text-zinc-300">amitbhivsane@gmal.com</span>
            </p>
          </div>
        </div>

        {/* Digital Heroes Credit Button */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500/50 text-xs font-semibold tracking-wide text-zinc-200 hover:text-white rounded-xl shadow-md transition-all duration-300 flex items-center gap-2 group"
          >
            Built for Digital Heroes
            <span className="text-violet-400 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </a>
        </div>
      </header>

      {/* Main Workspace Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6">
        {/* Mobile View Toggle Tabs (Hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-between p-1 bg-zinc-950 border border-zinc-900 rounded-xl no-print">
          <button
            onClick={() => setMobileTab("edit")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === "edit"
                ? "bg-zinc-900 text-violet-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Edit3 size={14} />
            Editor
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === "preview"
                ? "bg-zinc-900 text-violet-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            onClick={() => setMobileTab("ats")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold rounded-lg transition-all ${
              mobileTab === "ats"
                ? "bg-zinc-900 text-violet-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BarChart2 size={14} />
            ATS Audit
          </button>
        </div>

        {/* Workspace Split Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Area: Editor & ATS Audit on Desktop */}
          <div
            id="dashboard-editor"
            className={`lg:col-span-6 xl:col-span-6 space-y-6 ${
              mobileTab === "edit" ? "block" : "hidden lg:block"
            } no-print`}
          >
            <ResumeForm resumeData={resumeData} onChange={setResumeData} />

            {/* Show ATS score on desktop below the form */}
            <div className="hidden lg:block">
              <ATSScore resumeData={resumeData} />
            </div>
          </div>

          {/* Right Area: Resume A4 Canvas Preview */}
          <div
            className={`lg:col-span-6 xl:col-span-6 space-y-6 lg:sticky lg:top-24 ${
              mobileTab === "preview" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="no-print flex justify-center lg:justify-end mb-4">
              <div className="w-full sm:w-auto">
                <DownloadPDF
                  resumeData={resumeData}
                  resumeName={resumeData.personal.fullName || "resume"}
                />
              </div>
            </div>

            {/* Simulated Sheet Wrapper */}
            <div className="flex items-center justify-center bg-zinc-950/20 lg:bg-zinc-900/30 border border-zinc-900 lg:border-zinc-800/80 rounded-2xl p-4 lg:p-6 overflow-hidden">
              <ResumePreview ref={resumeRef} resumeData={resumeData} />
            </div>
          </div>

          {/* Mobile Isolated ATS Audit Tab */}
          <div
            id="ats-sidebar"
            className={`lg:col-span-6 xl:col-span-6 ${
              mobileTab === "ats" ? "block" : "hidden"
            } lg:hidden no-print`}
          >
            <ATSScore resumeData={resumeData} />
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950/50 py-6 px-6 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div>
          © {new Date().getFullYear()} AURA RESUME. Created with precision by
          Amit Bhivsane.
        </div>
        <div className="flex items-center gap-1">
          Designed for excellence{" "}
          <Heart
            size={10}
            className="text-violet-500 fill-violet-500 animate-pulse"
          />{" "}
          and ATS readiness.
        </div>
      </footer>
    </div>
  );
}
