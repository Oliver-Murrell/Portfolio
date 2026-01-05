import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(projects);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="projects" className="max-w-6xl mx-auto p-6 text-center pb-20">
      <h3 className="text-3xl font-bold mb-6">Projects</h3>

      {loading ? (
        <p className="opacity-70">Loading projects...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {items.map((p) => (
            <motion.a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden w-full flex flex-col h-full"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded-lg bg-gray-900 mb-4"
                />
              )}

              <div className="p-5 flex flex-col grow">
                <h4 className="text-lg font-semibold">{p.title}</h4>
                <p className="text-sm mt-2 opacity-80 flex-1">{p.summary}</p>

                <div className="mt-3 flex gap-2 flex-wrap justify-center">
                  {(p.tags || []).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 border rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
