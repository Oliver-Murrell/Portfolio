import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { DividerHairline } from "./components/SectionDivider";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // enforce dark-only
  const dark = true;
  const toggle = () => {};
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];
  const active = useScrollSpy(sections.map((s) => s.id));

  // Dark-only theme classes
  const pageTheme = "bg-gray-900 text-gray-100";
  const pageBg = "bg-gradient-to-b from-gray-900 to-gray-800";

  return (
    <div className={`min-h-screen ${pageTheme} ${pageBg} transition-colors`}>
      <Header
        sections={sections}
        active={active}
        onToggleTheme={toggle}
        dark={dark}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        open={menuOpen}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="md:hidden shadow p-4 space-y-3 rounded-lg bg-gray-900"
          >
            {sections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={
                  active === item.id ? "text-blue-400" : "hover:text-blue-400"
                }
              >
                {item.label}
              </a>
            ))}
            {/* theme toggle removed for dark-only site */}
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <DividerHairline />
      <About />
      <DividerHairline />
      <Skills />
      <DividerHairline />
      <Projects />
      <DividerHairline />
      <Contact />
      <Footer />
    </div>
  );
}
