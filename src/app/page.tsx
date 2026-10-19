import Navbar from "@/components/Navbar";
import HeroProjects from "@/components/HeroProjects";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Shrinking Floating Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <div className="flex-1 w-full">
        {/* 1. Hero & Latest Projects (3D Stack-to-Grid) */}
        <HeroProjects />

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* 2. About Section (Moved before Toolkit) */}
        <About />

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        {/* 3. Engineering Toolkit (Tech Stack with hover name tooltip & Framer Motion animation) */}
        <Toolkit />

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* 4. Contact Section */}
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
