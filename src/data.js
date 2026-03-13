// ─────────────────────────────────────────────
//  PORTFOLIO DATA  — edit everything here
// ─────────────────────────────────────────────

export const data = {
  name: "Faiz Aziz",
  role: "Designer & Developer",
  location: "London, UK",

  nav: {
    links: ["About", "Work", "Skills", "Contact"],
  },

  hero: {
    roles: ["Product Designer", "Frontend Developer", "Creative Thinker", "Problem Solver"],
    scrollLabel: "Scroll to explore",
  },

  about: {
    bio: "I design and build digital products that balance form with function. My work sits at the intersection of visual design and engineering — I care about how things look, how they feel, and how they're built.",
    stats: [
      { value: "5+", label: "Years experience" },
      { value: "30+", label: "Projects delivered" },
      { value: "10+", label: "Happy clients" },
    ],
    resumeUrl: "#",
  },

  work: [
    {
      id: "01",
      title: "Project Alpha",
      category: "Web Design & Development",
      year: "2024",
      description:
        "A comprehensive platform redesign that increased user engagement by 40%. Focused on reducing friction and elevating the visual language.",
      image: null, // Replace with image path: "/images/project-alpha.jpg"
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
