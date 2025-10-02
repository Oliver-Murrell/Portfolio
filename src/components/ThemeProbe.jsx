// FILE: src/components/ThemeProbe.jsx
// Simple floating toggle to verify dark mode wiring end-to-end.

import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeProbe() {
  const { dark, toggle } = useTheme();

  // Fixed button so you can always reach it (desktop & mobile)
  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-[9999] rounded-lg border px-3 py-2 text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur hover:opacity-90"
      title="Dev theme toggle"
    >
      {dark ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
