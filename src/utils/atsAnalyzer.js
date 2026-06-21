/**
 * ATS Resume Analyzer
 * Analyzes resume data structure and generates a score, completeness percentage,
 * missing sections checklist, and actionable improvement recommendations.
 */

const ACTION_VERBS = [
  "developed", "designed", "implemented", "built", "engineered",
  "managed", "led", "supervised", "optimized", "increased",
  "decreased", "improved", "created", "solved", "launched",
  "delivered", "coordinated", "collaborated", "analyzed", "reduced"
];

export function analyzeResume(resume) {
  const issues = [];
  let score = 0;
  
  // 1. Personal Info Analysis (20 points max)
  let contactScore = 0;
  const personal = resume.personal || {};
  
  if (personal.fullName?.trim()) contactScore += 4;
  else issues.push({ type: "critical", section: "Personal Info", message: "Full Name is missing." });

  if (personal.email?.trim()) {
    contactScore += 4;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personal.email.trim())) {
      issues.push({ type: "warning", section: "Personal Info", message: "Email format seems invalid." });
    }
  } else {
    issues.push({ type: "critical", section: "Personal Info", message: "Email address is missing." });
  }

  if (personal.phone?.trim()) contactScore += 4;
  else issues.push({ type: "critical", section: "Personal Info", message: "Phone number is missing." });

  if (personal.location?.trim()) contactScore += 4;
  else issues.push({ type: "warning", section: "Personal Info", message: "Location (City, State/Country) is missing." });

  if (personal.linkedin?.trim()) {
    contactScore += 4;
  } else {
    issues.push({ type: "warning", section: "Personal Info", message: "LinkedIn URL is missing. Recruiters expect a professional profile link." });
  }

  if (!personal.github?.trim()) {
    issues.push({ type: "info", section: "Personal Info", message: "Add your GitHub URL to showcase developer projects." });
  }

  score += contactScore;

  // 2. Professional Summary (15 points max)
  const summary = personal.summary?.trim() || "";
  const summaryWordCount = summary ? summary.split(/\s+/).length : 0;
  
  if (summary) {
    if (summaryWordCount >= 30 && summaryWordCount <= 80) {
      score += 15;
    } else if (summaryWordCount < 30) {
      score += 8;
      issues.push({ type: "warning", section: "Summary", message: "Professional summary is too short. Aim for 30-80 words (about 3-4 sentences)." });
    } else {
      score += 10;
      issues.push({ type: "warning", section: "Summary", message: "Professional summary is a bit long. Keep it concise (under 80 words)." });
    }
  } else {
    issues.push({ type: "critical", section: "Summary", message: "Professional Summary is missing. Introduce your career objectives and top skills." });
  }

  // 3. Skills Analysis (15 points max)
  const skills = resume.skills || [];
  if (skills.length > 0) {
    if (skills.length >= 5 && skills.length <= 15) {
      score += 15;
    } else if (skills.length < 5) {
      score += 7;
      issues.push({ type: "warning", section: "Skills", message: `You have listed only ${skills.length} skills. Aim for 5-15 relevant keywords.` });
    } else {
      score += 11;
      issues.push({ type: "info", section: "Skills", message: `You have listed ${skills.length} skills. Avoid keyword stuffing; focus on your top 15 core competencies.` });
    }
  } else {
    issues.push({ type: "critical", section: "Skills", message: "Skills section is empty. ATS screening relies heavily on technical keywords." });
  }

  // 4. Work Experience (20 points max)
  const experience = resume.experience || [];
  if (experience.length > 0) {
    if (experience.length >= 2) {
      score += 15;
    } else {
      score += 10;
      issues.push({ type: "info", section: "Experience", message: "Try listing at least 2 roles to showcase a progressive career history." });
    }

    // Check descriptions for length and action verbs
    let detailScore = 5;
    let missingDesc = false;
    let missingVerbs = false;
    
    experience.forEach((exp, index) => {
      const desc = exp.description?.trim() || "";
      if (desc.length < 40) {
        missingDesc = true;
        detailScore = Math.max(0, detailScore - 2);
      } else {
        // Search for action verbs
        const hasVerbs = ACTION_VERBS.some(verb => desc.toLowerCase().includes(verb));
        if (!hasVerbs) {
          missingVerbs = true;
        }
      }
    });

    score += detailScore;

    if (missingDesc) {
      issues.push({ type: "warning", section: "Experience", message: "One or more experience descriptions are too brief. Detail achievements and responsibilities." });
    }
    if (missingVerbs) {
      issues.push({ type: "info", section: "Experience", message: "Inject strong action verbs (e.g. 'Optimized', 'Engineered', 'Led') to make descriptions impact-driven." });
    }
  } else {
    issues.push({ type: "critical", section: "Experience", message: "Work Experience is missing. Add relevant employment, contract, or internship work." });
  }

  // 5. Projects (15 points max)
  const projects = resume.projects || [];
  if (projects.length > 0) {
    if (projects.length >= 2) {
      score += 15;
    } else {
      score += 10;
      issues.push({ type: "info", section: "Projects", message: "Add at least 2 key projects to demonstrate hands-on application of your skills." });
    }

    let missingDetails = false;
    projects.forEach(proj => {
      if (!proj.description?.trim() || proj.description.trim().length < 30) {
        missingDetails = true;
      }
    });
    if (missingDetails) {
      issues.push({ type: "warning", section: "Projects", message: "Ensure all projects have a clear description explaining the tech stack and your role." });
    }
  } else {
    issues.push({ type: "warning", section: "Projects", message: "No projects listed. Developers should highlight 1-3 personal or open-source projects." });
  }

  // 6. Education (10 points max)
  const education = resume.education || [];
  if (education.length > 0) {
    score += 10;
  } else {
    issues.push({ type: "critical", section: "Education", message: "Education is missing. Add your college degree or certifications." });
  }

  // 7. Certifications (5 points max)
  const certifications = resume.certifications || [];
  if (certifications.length > 0) {
    score += 5;
  } else {
    issues.push({ type: "info", section: "Certifications", message: "Add professional certifications (e.g. AWS, freeCodeCamp, Scrums) to boost credibility." });
  }

  // Double check score bound
  score = Math.min(100, Math.max(0, score));

  // Calculate completeness percentage based on filling core items
  let totalFields = 11;
  let filledFields = 0;

  if (personal.fullName?.trim()) filledFields++;
  if (personal.email?.trim()) filledFields++;
  if (personal.phone?.trim()) filledFields++;
  if (personal.location?.trim()) filledFields++;
  if (personal.linkedin?.trim()) filledFields++;
  if (personal.summary?.trim()) filledFields++;
  if (skills.length > 0) filledFields++;
  if (education.length > 0) filledFields++;
  if (experience.length > 0) filledFields++;
  if (projects.length > 0) filledFields++;
  if (certifications.length > 0) filledFields++;

  const completeness = Math.round((filledFields / totalFields) * 100);

  // ATS Tips
  const tips = [
    "Use a simple, clean single-column or standard double-column layout without complex visual graphics.",
    "Ensure your email, phone number, and location are plain text and not embedded in icons or headers.",
    "Incorporate key skills directly in your project and experience bullet points to show contextual usage.",
    "Export as a clean PDF. Avoid exporting as an image PDF, as ATS cannot scan images.",
    "Use standard section headers (e.g., 'Work Experience', 'Education', 'Projects', 'Skills')."
  ];

  return {
    score,
    completeness,
    issues,
    tips
  };
}
