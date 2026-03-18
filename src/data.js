// ─────────────────────────────────────────────
//  PORTFOLIO DATA  — edit everything here
// ─────────────────────────────────────────────

export const data = {
  name: "Faiz Aziz",
  role: "Shipping AI that acts, not just responds",
  location: "London, UK",

  nav: {
    links: ["About", "Experience", "Writing", "Skills", "Contact"],
  },

  hero: {
    roles: ["AI & Data Consultant", "Agentic Systems Engineer", "Frontend Developer", "Open-Source Developer"],
    scrollLabel: "Scroll to explore",
  },

  about: {
    bio: "I build and deliver AI agent systems that work in the real world, not just in demos. At IBM, I help enterprise clients move from AI experimentation to production deployment, translating complex business challenges into autonomous agent architectures. I also ship open-source tooling and write about the engineering principles behind modern agentic AI.",
    capabilities: [
      { verb: "Builds",   detail: "Autonomous agent systems for enterprise AI transformation" },
      { verb: "Ships",    detail: "Open-source tooling for LLM prompt engineering (spart-prompt)" },
      { verb: "Advises",  detail: "AI strategy, agent architecture & delivery best practices" },
    ],
    resumeUrl: "#",
  },

  experience: [
    {
      id: "01",
      company: "IBM",
      role: "AI & Data Delivery Consultant",
      period: "Nov 2025 — Present",
      location: "London, UK",
      description: "Delivering end-to-end AI transformation engagements for enterprise clients. Specialised in agentic systems, designing and deploying autonomous agent architectures that automate complex, multi-step workflows. Combines deep technical delivery with stakeholder management and solution engineering.",
      tags: ["AI Agents", "LLMs", "RAG", "Solution Architecture", "Stakeholder Management"],
      current: true,
    },
    {
      id: "02",
      company: "Julius Baer",
      role: "HR Business Technology Intern",
      period: "Jul 2025 — Sep 2025",
      location: "Zurich, Switzerland",
      description: "Supported the pilot rollout of an HR case management solution on Workday. Delivered a service catalogue, KPIs, and user documentation while driving change management and process optimisation across cross-functional teams.",
      tags: ["Workday", "Process Optimisation", "Business Analysis", "Change Management"],
      current: false,
    },
    {
      id: "03",
      company: "IBM",
      role: "AI Engineer Intern",
      period: "Jun 2024 — Sep 2024",
      location: "London, UK",
      description: "Built AI prototypes in fast-paced, client-facing environments: RAG pipelines, LLM-powered interfaces, and full-stack integrations across Python and React. Delivered client presentations, ran coding workshops for the intern cohort, and was recognised as Voice of the Interns.",
      tags: ["Python", "LLMs", "RAG", "React", "Prompt Engineering", "Vector DBs"],
      current: false,
    },
  ],

  education: [
    {
      institution: "Queen Mary University of London",
      degree: "BSc Computer Science",
      period: "2022 — 2025",
      detail: "First Class Honours · 78.1% Weighted Average. Modules in Neural Networks & Deep Learning, Distributed Systems, Algorithms & Data Structures, Security Engineering, and Big Data Processing. Final Year Project graded A.",
    },
    {
      institution: "IBM Global Sales School",
      degree: "Sales & Consulting Certification",
      period: "Dec 2025",
      detail: "Intensive programme covering enterprise sales methodology, solution selling, and client engagement strategy.",
    },
  ],

  projects: [
    {
      id: "01",
      title: "spart-prompt",
      category: "Python Package",
      year: "2024",
      description:
        "An open-source Python library that turns prompt engineering into a measurable science. Achieves 112% improvement in syntactic similarity on data transformation tasks and 80%+ semantic match on math reasoning. Auto-generates, evaluates, and optimises prompts against real output metrics.",
      url: "https://github.com/FaizAzizAtK/SPART",
      tags: ["Python", "Open Source", "Prompt Engineering", "PyPI"],
    },
  ],

  work: [
    {
      id: "01",
      title: "Is RAG That Simple?",
      category: "Essay",
      year: "Mar 2026",
      type: "article",
      blogId: "hrag",
      description: "Traditional RAG scans everything and guesses. Hierarchical RAG reads like a human: table of contents first, then drill down. Here's why that distinction matters when you're building agents that have to be right.",
      image: null,
      url: null,
    },
    {
      id: "02",
      title: "Your Context Is Rotting",
      category: "Essay",
      year: "Feb 2026",
      type: "article",
      blogId: "prompting-interface",
      description:
        "Most teams have figured out prompting. The harder problem, the one that breaks production agents, is context. Context rot, retrieval precision, memory design, and why most agent failures aren't prompt problems.",
      image: null,
      url: null,
    },
    {
      id: "03",
      title: "The Agentic Shift",
      category: "Essay",
      year: "Jan 2026",
      type: "article",
      blogId: "agentic-shift",
      description:
        "The shift from co-pilot to autonomous agent is real, but the timeline in your head is probably wrong. On adoption, trust, accountability gaps, and the unglamorous work between a convincing demo and a production system.",
      image: null,
      url: null,
    },
  ],

  skills: {
    delivery:    ["Enterprise Architecture", "Solution Design", "Stakeholder Management", "Requirements Analysis", "Agile Delivery", "Client Presentations", "Change Management"],
    development: ["Python", "AI Agents", "LLMs", "RAG", "Context Engineering", "Prompt Engineering", "API Integration"],
    tools:       ["LangChain", "MCPs", "LLM Observability / Evals", "Vector DBs", "Git", "VS Code", "Tooling Design"],
  },

  contact: {
    heading: "Let's work together.",
    email: "faizazizatk@gmail.com",
    availability: "Open to advisory, speaking & collaboration",
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/faiz-aziz-01524425a/" },
      { label: "GitHub",   url: "https://github.com/FaizAzizAtK" },
    ],
  },
}
