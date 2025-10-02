// FILE: src/hooks/useTheme.js
// import { useEffect, useState } from "react";

// export function useTheme() {
//   const [dark, setDark] = useState(() => {
//     if (typeof window === "undefined") return false;
//     const saved = localStorage.getItem("theme");
//     if (saved) return saved === "dark";
//     return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     if (dark) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);
//   const toggle = () => setDark((d) => !d);
//   return { dark, toggle };
// }

import { useEffect, useState } from "react";

export function useTheme() {
  const getInitial = () => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [dark, setDark] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    if (localStorage.getItem("theme")) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setDark(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const toggle = () => setDark((d) => !d);

  return { dark, toggle };
}
