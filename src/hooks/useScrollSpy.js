// FILE: src/hooks/useScrollSpy.js
import { useEffect, useState } from "react";
export function useScrollSpy(ids, offset = 200) {
  const [active, setActive] = useState(ids[0] || "");
  useEffect(() => {
    const handle = () => {
      const pos = window.scrollY + offset;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && pos >= el.offsetTop) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [ids, offset]);
  return active;
}