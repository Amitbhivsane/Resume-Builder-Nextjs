"use client";
import React from "react";
import { Plus, Trash2, Briefcase } from "lucide-react";

export default function ExperienceSection({ experience = [], onChange }) {
  const handleAdd = () => {
    const newEntry = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false,
    };
    onChange([...experience, newEntry]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = experience.map((item, idx) => {
      if (idx === index) {
        if (field === "isCurrent") {
          return {
            ...item,
            isCurrent: value,
            endDate: value ? "Present" : "",
          };
        }
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = experience.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
            <Briefcase size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">Work Experience</h3>
            <p className="text-xs text-zinc-400">Add employment history, internships, or freelance roles</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 border border-violet-500/20 hover:border-violet-500/40 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95"
        >
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl text-center">
          <Briefcase size={32} className="text-zinc-600 mb-2" />
          <p className="text-sm text-zinc-500 italic">No work experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div
              key={index}
              className="relative p-5 bg-zinc-950/60 border border-zinc-800/60 rounded-xl group hover:border-zinc-700/60 transition-all"
            >
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 p-2 bg-zinc-900 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 border border-zinc-800 hover:border-red-500/20 rounded-lg transition-colors focus:outline-none"
              >
                <Trash2 size={14} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => handleUpdate(index, "company", e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Job Title / Position</label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => handleUpdate(index, "position", e.target.value)}
                    placeholder="e.g., Senior Full Stack Developer"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Start Date</label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => handleUpdate(index, "startDate", e.target.value)}
                      placeholder="e.g., Jun 2021"
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">End Date</label>
                    <input
                      type="text"
                      value={item.endDate}
                      disabled={item.isCurrent}
                      onChange={(e) => handleUpdate(index, "endDate", e.target.value)}
                      placeholder={item.isCurrent ? "Present" : "e.g., Dec 2023"}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all disabled:opacity-50 disabled:bg-zinc-950"
                    />
                  </div>
                </div>

                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.isCurrent || false}
                      onChange={(e) => handleUpdate(index, "isCurrent", e.target.checked)}
                      className="w-4.5 h-4.5 rounded border-zinc-800 bg-zinc-900 text-violet-600 focus:ring-violet-500/50"
                    />
                    <span className="text-xs font-medium text-zinc-300">I currently work here</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Description & Key Achievements
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleUpdate(index, "description", e.target.value)}
                    placeholder="e.g., Developed and scaled core feature which increased conversion by 12%. Led a team of 4 junior developers."
                    rows={4}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
