"use client";
import React, { useState } from "react";
import { Plus, X, Award } from "lucide-react";

export default function SkillsSection({ skills = [], onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    const cleanSkill = inputValue.trim();
    if (cleanSkill && !skills.includes(cleanSkill)) {
      const updated = [...skills, cleanSkill];
      onChange(updated);
      setInputValue("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill(e);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
          <Award size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">Skills</h3>
          <p className="text-xs text-zinc-400">Add core competencies, frameworks, and tools (e.g., React, Node.js)</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a skill and press Enter..."
          className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/80 transition-all text-sm"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="p-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-violet-500/20 active:scale-95 transition-all"
        >
          <Plus size={20} />
        </button>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-zinc-500 italic">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-violet-500/40 rounded-lg text-xs font-medium text-zinc-300 transition-all group"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-zinc-500 hover:text-red-400 rounded-md p-0.5 transition-colors focus:outline-none"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
