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
  avatar: "/images/sabbir.jpeg",
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
      url: "mailto:sabbirhasandv@gmail.com",
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
      id: "ecommerce-landing",
      title: "E-commerce Landing Platform",
      category: "Frontend Web Development",
      description: "Modern, high-converting digital storefront built with responsive grid architecture, clean semantic code, and interactive product sections.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      liveUrl: "https://github.com/sabbirdv/E-commerce-Landing",
      githubUrl: "https://github.com/sabbirdv/E-commerce-Landing",
      image: "/images/projects/ecommerce.jpg",
      accent: "#00F0FF",
      featured: true
    },
    {
      id: "ecobazar-store",
      title: "Ecobazar Grocery Web App",
      category: "Full-Featured Web Platform",
      description: "Organic grocery e-commerce experience featuring product category filtering, intuitive shopping cart flow, and user-centric navigation.",
      tags: ["React", "JavaScript", "Tailwind CSS", "UI/UX"],
      liveUrl: "https://github.com/sabbirdv/Ecobazar",
      githubUrl: "https://github.com/sabbirdv/Ecobazar",
      image: "/images/projects/ecobazar.jpg",
      accent: "#10B981",
      featured: true
    },
    {
      id: "mern-task-suite",
      title: "MERN Real-World Architecture",
      category: "Full Stack Web Development",
      description: "Full-stack web application integrating REST APIs, MongoDB data modeling, Node.js server logic, and a dynamic React frontend.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      liveUrl: "https://github.com/sabbirdv",
      githubUrl: "https://github.com/sabbirdv",
      image: "/images/projects/mern.jpg",
      accent: "#A855F7",
      featured: true
    },
    {
      id: "creative-ui-engine",
      title: "Creative Design & UI System",
      category: "Design & Modern Frontend",
      description: "High-fidelity digital design system translated into accessible, interactive components with TypeScript and Tailwind CSS.",
      tags: ["TypeScript", "Next.js", "Figma", "Tailwind CSS"],
      liveUrl: "https://github.com/sabbirdv",
      githubUrl: "https://github.com/sabbirdv",
      image: "/images/projects/creative.jpg",
      accent: "#00F0FF",
      featured: true
    }
  ]
};
