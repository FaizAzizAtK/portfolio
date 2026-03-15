// ─────────────────────────────────────────────
//  PORTFOLIO DATA  — edit everything here
// ─────────────────────────────────────────────

export const data = {
  name: "Faiz Aziz",
  role: "Shipping AI that acts, not just responds",
  location: "London, UK",

  nav: {
    links: ["About", "Experience", "Work", "Skills", "Contact"],
  },

  hero: {
    roles: ["Data & AI Consultant", "Product Designer", "Frontend Developer", "AI & Agents Specialist"],
    scrollLabel: "Scroll to explore",
  },

  about: {
    bio: "I sit at the intersection of AI, design, and engineering. By day I deliver Data & AI transformations at IBM — by night I design and build things that feel as good as they work. Specialised in AI Agents, I help organisations move from AI curiosity to AI capability.",
    stats: [
      { value: "5+", label: "Years experience" },
      { value: "30+", label: "Projects delivered" },
      { value: "10+", label: "Happy clients" },
    ],
    resumeUrl: "#",
  },

  experience: [
    {
      id: "01",
      company: "IBM",
      role: "Data & AI Delivery Consultant",
      period: "2022 — Present",
      location: "London, UK",
      description: "Leading end-to-end delivery of Data & AI transformation programmes for enterprise clients across financial services and the public sector. Specialised in AI Agents — designing, building, and deploying autonomous agent systems that automate complex workflows.",
      tags: ["AI Agents", "LLMs", "Data Strategy", "Enterprise Architecture", "Stakeholder Management"],
      current: true,
    },
    {
      id: "02",
      company: "Previous Role",
      role: "Consultant / Developer",
      period: "2020 — 2022",
      location: "London, UK",
      description: "Placeholder — add your previous role details here.",
      tags: ["Placeholder"],
      current: false,
    },
  ],

  education: [
    {
      institution: "University Name",
      degree: "BSc Computer Science",    // ← update with your degree
      period: "2017 — 2020",
      detail: "Placeholder — update with your university and degree details.",
    },
  ],

  work: [
    {
      id: "01",
      title: "spart-prompt",
      category: "Python Package",
      year: "2024",
      status: null,
      description:
        "An open-source Python library for structured prompt engineering. Write, version, and evaluate LLM prompts with a clean API — includes automatic optimisation that benchmarks variants and surfaces the highest-performing prompt at scale.",
      image: null,
      url: "https://github.com/FaizAzizAtK/spart-prompt",
    },
    {
      id: "02",
      title: "The Agentic Shift",
      category: "Perspective",
      year: "2025",
      status: null,
      description:
        "AI is moving from co-pilot to autonomous agent. The paradigm shift isn't incremental — it fundamentally changes how software is built, how organisations operate, and what it means to 'do work'. Agents are the new apps.",
      image: null,
      url: "#",
    },
    {
      id: "03",
      title: "Prompting Is an Interface",
      category: "Perspective",
      year: "2025",
      status: null,
      description:
        "The prompt is the new UI. As LLMs become the runtime for software, prompt design becomes the most valuable engineering discipline. Structured prompting, evaluation loops, and auto-optimisation are the new frontend.",
      image: null,
      url: "#",
    },
  ],

  skills: {
    design: ["UI Design", "UX Research", "Brand Identity", "Motion Design", "Design Systems", "Prototyping", "Interaction Design"],
    development: ["React", "TypeScript", "Next.js", "Node.js", "CSS / Sass", "Tailwind", "REST APIs"],
    tools: ["Figma", "VS Code", "Git", "Vercel", "Adobe Suite", "Framer", "Notion"],
  },

  contact: {
    heading: "Let's work together.",
    email: "hello@faizaziz.com",
    availability: "Currently available for freelance & full-time roles",
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/faiz-aziz-01524425a/" },
      { label: "GitHub", url: "#" },
      { label: "Twitter", url: "#" },
    ],
  },
}
