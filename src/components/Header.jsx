// FILE: src/components/Header.jsx
import React from "react";

export default function Header({ sections = [], active }) {
  // State: whether the mobile dropdown is open
  const [open, setOpen] = React.useState(false);

  // Anchor for the button + dropdown (used for outside-click detection)
  const anchorRef = React.useRef(null);

  // Toggle / close helpers
  const toggleMenu = () => setOpen((v) => !v);
  const closeMenu = () => setOpen(false);

  // Close on outside click
  React.useEffect(() => {
    function onDocClick(e) {
      if (!anchorRef.current) return;
      if (!anchorRef.current.contains(e.target)) closeMenu();
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Close on Escape press
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // If viewport becomes md+ close the mobile dropdown
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => e.matches && closeMenu();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop link styling (keeps your dark variants)
  const navLinkClass = (id) =>
    `group relative pb-1 transition text-gray-900 dark:text-gray-100 ${
      active === id
        ? "text-blue-600 dark:text-blue-400"
        : "hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center relative">
        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          {sections.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={navLinkClass(item.id)}>
              {item.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${
                  active === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Right side: mobile menu button + anchored dropdown */}
        <div className="absolute right-6 flex items-center gap-4">
          <div ref={anchorRef} className="relative md:hidden">
            {/* MENU BUTTON — reverted to previous rectangular shape (rounded-md) */}
            <button
              type="button"
              className="p-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
              onClick={(e) => {
                // Prevent the document click listener from immediately closing it
                e.stopPropagation();
                toggleMenu();
              }}
              aria-expanded={open}
              aria-haspopup="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              title={open ? "Close menu" : "Open menu"}
            >
              {open ? <IconClose /> : <IconBurger />}
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
            </button>

            {/* Anchored dropdown panel (right-aligned to the button) */}
            {open && (
              <div
                role="menu"
                className="
                  absolute right-0 top-full mt-2 w-72
                  bg-white dark:bg-gray-900
                  border border-gray-200 dark:border-gray-700
                  rounded-xl shadow-xl p-3
                  z-50
                "
                onClick={(e) => e.stopPropagation()} // allow clicks inside without closing
              >
                <nav className="flex flex-col gap-2 text-sm">
                  {sections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="px-3 py-2 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition"
                      onClick={closeMenu} // close after navigating
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* Classic hamburger icon (three horizontal lines) */
function IconBurger() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

/* Close (X) icon */
function IconClose() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
