// FILE: src/components/Skills.jsx
import React from "react";

import { motion } from "framer-motion";
import { skills } from "../data/skills";
export default function Skills() {
  const getSkillHover = (name) => {
    switch (name) {
      case "React":
        return { rotate: 360 };
      case "Git":
        return { y: -6 };
      case "Tailwind":
        return { scale: 1.12 };
      case "JavaScript":
        return { rotate: 10 };
      default:
        return { scale: 1.06 };
    }
  };
  return (
    <section id="skills" className="max-w-6xl mx-auto p-6 text-center">
      <h3 className="text-3xl font-bold">Skills</h3>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
        {skills.map((s) => (
          <motion.div key={s.name} whileHover={{ scale: 1.06, y: -4 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center text-sm font-medium transition flex flex-col items-center w-full max-w-[220px]">
            <motion.img src={s.img} alt={s.name} loading="lazy" width={48} height={48} className="h-12 w-12 mb-3" whileHover={getSkillHover(s.name)} transition={{ duration: 0.6 }} />
            {s.name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

