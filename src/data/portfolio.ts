export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  accent: string;
  featured: boolean;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Design";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}

export interface DeveloperProfile {
  name: string;
  username: string;
  role: string;
  tagline: string;
  availability: string;
  email: string;
  location: string;
  portfolioUrl: string;
  avatar: string;
  typingLines: string[];
  bioParagraphs: string[];
  highlights: string[];
  currentlyWorkingOn: string[];
  navLinks: {
    name: string;
    href: string;
  }[];
  socials: SocialLink[];
  techStack: TechStackItem[];
  projects: Project[];
}

export const portfolioData: DeveloperProfile = {
  name: "Sabbir Hasan",
  username: "sabbirdv",
  role: "MERN Stack Web Developer & Creative Designer",
  tagline: "I design and build modern, functional, and user-focused digital experiences.",
  availability: "Open to Collaboration & Work",
  email: "sabbirhasandv@gmail.com",
  location: "Bangladesh",
  portfolioUrl: "https://sabbirdvs.com",
  avatar: "/images/sabbir.webp",
  typingLines: [
    "Full Stack Web Developer",
    "Creative Designer",
    "JavaScript & TypeScript Enthusiast",
    "Designer • Builder • Problem Solver"
  ],
  bioParagraphs: [
    "I'm Sabbir Hasan, a MERN Stack Web Developer & Creative Designer focused on building modern web applications and meaningful digital experiences.",
    "My background in design gives me a different perspective on development — I care about both how a product works and how people experience it.",
    "I combine clean code architecture with creative visual thinking to build responsive web apps that are fast, accessible, and intuitive to use."
  ],
  highlights: [
    "Currently developing my Full Stack Web Development skills",
    "Background in Graphic Design & Visual Creativity",
    "Working with JavaScript, TypeScript, React and modern web technologies",
    "Interested in AI-driven development and practical software engineering",
    "Building real-world projects to strengthen my development skills",
    "Open to collaboration, opportunities and interesting projects"
  ],
  currentlyWorkingOn: [
    "MERN Stack Web Development",
    "JavaScript & TypeScript",
    "React & Modern Frontend Development",
    "REST APIs & Data Handling",
    "Real-World Project Architecture"
  ],
  navLinks: [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Toolkit", href: "#toolkit" },
    { name: "Contact", href: "#contact" }
  ],
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/sabbirdv",
      icon: "github",
      handle: "@sabbirdv"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sabbirdv",
      icon: "linkedin",
      handle: "sabbirdv"
    },
    {
      name: "Email",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=sabbirhasandv@gmail.com",
      icon: "mail",
      handle: "sabbirhasandv@gmail.com"
    }
  ],
  techStack: [
    { id: "react", name: "React", category: "Frontend" },
    { id: "next", name: "Next.js", category: "Frontend" },
    { id: "typescript", name: "TypeScript", category: "Frontend" },
    { id: "javascript", name: "JavaScript", category: "Frontend" },
    { id: "tailwind", name: "Tailwind CSS", category: "Frontend" },
    { id: "html", name: "HTML5", category: "Frontend" },
    { id: "css", name: "CSS3", category: "Frontend" },
    { id: "nodejs", name: "Node.js", category: "Backend" },
    { id: "mongodb", name: "MongoDB", category: "Backend" },
    { id: "git", name: "Git", category: "Tools" },
    { id: "github", name: "GitHub", category: "Tools" },
    { id: "vscode", name: "VS Code", category: "Tools" },
    { id: "vite", name: "Vite", category: "Tools" },
    { id: "figma", name: "Figma", category: "Design" },
    { id: "photoshop", name: "Photoshop", category: "Design" }
  ],
  projects: [
    {
      id: "echo-bazar",
      title: "Echo Bazar",
      category: "Organic Grocery Store",
      description: "Organic grocery e-commerce experience featuring product category filtering and seamless shopping cart flow.",
      tags: ["React", "JavaScript", "Tailwind CSS", "E-Commerce"],
      liveUrl: "https://sabbir-ecobazar.vercel.app/",
      githubUrl: "https://github.com/sabbirdv/Ecobazar",
      image: "/images/projects/echobazar.webp",
      accent: "#10B981",
      featured: true
    },
    {
      id: "bazardor",
      title: "Bazardor",
      category: "Full Stack Web App",
      description: "Daily essential commodities price tracker and marketplace analytics web application.",
      tags: ["React", "Next.js", "Tailwind CSS", "REST API"],
      liveUrl: "https://bazar-dor-liard.vercel.app/",
      githubUrl: "https://github.com/sabbirdv/bazar-dor",
      image: "/images/projects/bazar-dor.webp",
      accent: "#00F0FF",
      featured: true
    },
    {
      id: "fit-log",
      title: "Fit-Log",
      category: "Fitness & Health Tracker",
      description: "Comprehensive fitness and health workout tracker featuring interactive routines and progress logs.",
      tags: ["React", "JavaScript", "Tailwind CSS", "Dashboard"],
      liveUrl: "https://ph-a6.vercel.app/",
      githubUrl: "https://github.com/sabbirdv/PH-A6",
      image: "/images/projects/fitlog.webp",
      accent: "#10B981",
      featured: true
    },
    {
      id: "dev-stack",
      title: "Dev Stack",
      category: "Developer Resource Platform",
      description: "Interactive developer resource catalog and curated tech stack showcase with modern UI filtering.",
      tags: ["React", "TypeScript", "Tailwind CSS", "UI/UX"],
      liveUrl: "https://ph-a5-three.vercel.app/",
      githubUrl: "https://github.com/sabbirdv/PH-A5",
      image: "/images/projects/dev-stack.webp",
      accent: "#A855F7",
      featured: true
    },
    {
      id: "ecommerce-landing",
      title: "E-commerce",
      category: "E-Commerce Storefront",
      description: "High-converting digital storefront landing with responsive grid layouts and interactive product showcases.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      liveUrl: "https://sabbirdv.github.io/E-commerce-Landing/",
      githubUrl: "https://github.com/sabbirdv/E-commerce-Landing",
      image: "/images/projects/e-commerce.webp",
      accent: "#F59E0B",
      featured: true
    },
    {
      id: "dev-conf",
      title: "Dev Conf",
      category: "Tech Conference Platform",
      description: "Developer conference & tech summit portal featuring speaker schedules, registration, and event agenda.",
      tags: ["HTML5", "CSS3", "JavaScript", "Modern UI"],
      liveUrl: "https://sabbirdv.github.io/ph-a1/",
      githubUrl: "https://github.com/sabbirdv/ph-a1",
      image: "/images/projects/dev-conf.webp",
      accent: "#00F0FF",
      featured: true
    }
  ]
};
