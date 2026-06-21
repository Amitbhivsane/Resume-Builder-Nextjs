"use client";
import React, { useMemo } from "react";
import { analyzeResume } from "../utils/atsAnalyzer";
import { AlertCircle, CheckCircle, Info, ChevronRight, Sparkles } from "lucide-react";

export default function ATSScore({ resumeData }) {
  const analysis = useMemo(() => analyzeResume(resumeData), [resumeData]);
  const { score, completeness, issues, tips } = analysis;

  // Determine score color classes
  const getScoreColor = (val) => {
    if (val < 50) return { text: "text-red-400", border: "stroke-red-500", bg: "bg-red-500/10 text-red-400" };
    if (val < 75) return { text: "text-amber-400", border: "stroke-amber-500", bg: "bg-amber-500/10 text-amber-400" };
    return { text: "text-emerald-400", border: "stroke-emerald-500", bg: "bg-emerald-500/10 text-emerald-400" };
  };

  const colors = getScoreColor(score);

  // SVG parameters for circle progress
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Quick checklist for sections
  const checklist = [
    { name: "Personal Details", present: !!resumeData.personal.fullName && !!resumeData.personal.email },
    { name: "Professional Summary", present: !!resumeData.personal.summary },
    { name: "Skills", present: resumeData.skills?.length > 0 },
    { name: "Work Experience", present: resumeData.experience?.length > 0 },
    { name: "Projects", present: resumeData.projects?.length > 0 },
  ];

  return (
    <div className="space-y-6">
      {/* ATS Circular Score Card */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl hover:border-violet-500/30 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-violet-400 animate-pulse" />
          <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">ATS Score Card</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circular Chart */}
          <div className="relative flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                stroke="rgba(63, 63, 70, 0.3)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Foreground circle */}
              <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className={`${colors.border} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold tracking-tight ${colors.text}`}>{score}</span>
              <span className="text-[10px] text-zinc-500 font-medium">/ 100</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="text-zinc-100 font-semibold text-base">ATS Compliance Rating</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your resume's format and structure score. Aim for <span className="text-emerald-400 font-medium">75+</span> to clear automated applicant screeners.
            </p>
          </div>
        </div>

        {/* Completeness Linear Bar */}
        <div className="mt-6 pt-6 border-t border-zinc-800/60">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-zinc-300">Resume Completeness</span>
            <span className="text-xs font-bold text-violet-400">{completeness}%</span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-2 border border-zinc-800/80 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Sections Status Checklist */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase mb-4">Required Sections</h3>
        <div className="grid grid-cols-2 gap-3">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2.5 bg-zinc-950/40 border border-zinc-800/60 rounded-xl">
              {item.present ? (
                <CheckCircle size={14} className="text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle size={14} className="text-zinc-600 shrink-0" />
              )}
              <span className={`text-[11px] font-medium leading-none ${item.present ? "text-zinc-300" : "text-zinc-500"}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">Improvement Suggestions</h3>
        
        {issues.length === 0 ? (
          <div className="flex gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-emerald-400">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold">Excellent work!</h4>
              <p className="text-[11px] leading-relaxed text-zinc-400 mt-1">Your resume matches all key ATS formatting benchmarks perfectly.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className={`flex gap-3 p-3 rounded-xl border ${
                  issue.type === "critical"
                    ? "bg-red-500/5 border-red-500/10 text-red-400"
                    : issue.type === "warning"
                    ? "bg-amber-500/5 border-amber-500/10 text-amber-400"
                    : "bg-blue-500/5 border-blue-500/10 text-blue-400"
                }`}
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
                    {issue.section}
                  </span>
                  <p className="text-[11px] leading-relaxed text-zinc-300">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* General ATS Optimization Tips */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">Expert ATS Tips</h3>
        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex gap-2.5 items-start">
              <ChevronRight size={14} className="text-violet-400 shrink-0 mt-1" />
              <p className="text-xs text-zinc-400 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
