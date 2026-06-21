"use client";
import React from "react";
import { Plus, Trash2, FolderCode } from "lucide-react";

export default function ProjectsSection({ projects = [], onChange }) {
  const handleAdd = () => {
    const newEntry = {
      name: "",
      description: "",
      role: "",
      link: "",
    };
    onChange([...projects, newEntry]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = projects.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-xl hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
            <FolderCode size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">Projects</h3>
            <p className="text-xs text-zinc-400">Showcase open-source, personal, or freelance projects</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 border border-violet-500/20 hover:border-violet-500/40 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl text-center">
          <FolderCode size={32} className="text-zinc-600 mb-2" />
          <p className="text-sm text-zinc-500 italic">No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((item, index) => (
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
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdate(index, "name", e.target.value)}
                    placeholder="e.g., E-Commerce Platform"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role / Tech Stack</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => handleUpdate(index, "role", e.target.value)}
                    placeholder="e.g., Lead Developer (React, Node, MongoDB)"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Project Link (Optional)</label>
                  <input
                    type="url"
                    value={item.link}
                    onChange={(e) => handleUpdate(index, "link", e.target.value)}
                    placeholder="e.g., https://github.com/username/project"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Description & Key Features
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleUpdate(index, "description", e.target.value)}
                    placeholder="e.g., Designed database schema for products. Implemented stripe checkout flow. Increased load times by 20%."
                    rows={3}
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
