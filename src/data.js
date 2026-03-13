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
      title: "Project Alpha",
      category: "Web Design & Development",
      year: "2024",
      description:
        "A comprehensive platform redesign that increased user engagement by 40%. Focused on reducing friction and elevating the visual language.",
      image: null,
      url: "#",
    },
    {
      id: "02",
      title: "Project Beta",
      category: "Product Design & Branding",
      year: "2024",
      description:
        "End-to-end product design for a fintech startup — research, wireframes, design system, and handoff.",
      image: null,
      url: "#",
    },
    {
      id: "03",
      title: "Project Gamma",
      category: "Creative Direction",
      year: "2023",
      description:
        "Visual identity for a luxury brand spanning digital, print, and environmental touchpoints.",
      image: null,
      url: "#",
    },
    {
      id: "04",
      title: "Project Delta",
      category: "Web Application",
      year: "2023",
      description:
        "Full-stack web application with complex data visualisation and real-time collaboration features.",
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
