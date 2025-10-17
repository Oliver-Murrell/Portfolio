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
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];
  const active = useScrollSpy(sections.map((s) => s.id));

  // Pick a full-page theme set explicitly (light vs dark)
  const pageTheme = dark
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-900";

  // If you want the gradient too, add it on top of the theme bg:
  const pageBg = dark
    ? "bg-gradient-to-b from-gray-900 to-gray-800"
    : "bg-gradient-to-b from-gray-50 to-gray-100";

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
            className={`md:hidden shadow p-4 space-y-3 rounded-lg ${
              dark ? "bg-gray-900" : "bg-white"
            }`}
          >
            {sections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={
                  active === item.id
                    ? dark
                      ? "text-blue-400"
                      : "text-blue-600"
                    : dark
                    ? "hover:text-blue-400"
                    : "hover:text-blue-600"
                }
              >
                {item.label}
              </a>
            ))}
            <button onClick={toggle} className="text-sm border rounded px-2 py-1">
              {dark ? "Light" : "Dark"} Mode
            </button>
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
