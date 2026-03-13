// ─────────────────────────────────────────────
//  PORTFOLIO DATA  — edit everything here
// ─────────────────────────────────────────────

export const data = {
  name: "Faiz Aziz",
  role: "Data & AI Consultant",
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
      title: "Prompt Eval & Auto-Optimiser",
      category: "AI Engineering",
      year: "2024",
      status: null, // live
      description:
        "An automated system that evaluates LLM prompt quality across multiple dimensions, then generates and benchmarks optimised variants — reducing manual prompt engineering time and improving output consistency at scale.",
      image: null,
      url: "#",
    },
    {
      id: "02",
      title: "Agentic Workflow Engine",
      category: "AI Agents",
      year: "2025",
      status: "In Progress",
      description:
        "A modular framework for orchestrating multi-agent pipelines. Agents reason, delegate sub-tasks, and call tools autonomously — enabling complex enterprise workflows to run end-to-end without human handoffs.",
      image: null,
      url: "#",
    },
    {
      id: "03",
      title: "AI Delivery Accelerator",
      category: "Platform / Consulting Tool",
      year: "2025",
      status: "In Progress",
      description:
        "Internal tooling built at IBM to accelerate Data & AI programme delivery — automated project health scoring, risk flagging, and stakeholder reporting powered by LLM analysis of project artefacts.",
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
      { label: "LinkedIn", url: "#" },
      { label: "GitHub", url: "#" },
      { label: "Twitter", url: "#" },
    ],
  },
}
