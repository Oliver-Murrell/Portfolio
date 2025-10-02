// FILE: src/components/Hero.jsx
// import React from "react";
// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section id="home" className="relative max-w-6xl mx-auto p-6 text-center">
//       <LensStarfield />

//       <div className="relative z-10 flex flex-col items-center gap-8">
//         <Avatar />
//         <Intro />
//         <QuickFacts />
//       </div>
//     </section>
//   );
// }

// /* Stars drift left; stars within a radius of the cursor are displaced outward */
// function LensStarfield({ count = 160, lensRadius = 140, lensStrength = 22 }) {
//   const canvasRef = React.useRef(null);
//   const rafRef = React.useRef(0);
//   const mouse = React.useRef({ x: -9999, y: -9999, inside: false });

//   React.useEffect(() => {
//     const c = canvasRef.current;
//     const ctx = c.getContext("2d");

//     const resize = () => {
//       c.width = c.clientWidth;
//       c.height = c.clientHeight;
//     };
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(c);

//     // Track mouse globally; mark if inside canvas bounds
//     const onMove = (e) => {
//       const r = c.getBoundingClientRect();
//       mouse.current.inside =
//         e.clientX >= r.left &&
//         e.clientX <= r.right &&
//         e.clientY >= r.top &&
//         e.clientY <= r.bottom;
//       mouse.current.x = e.clientX - r.left;
//       mouse.current.y = e.clientY - r.top;
//     };
//     window.addEventListener("mousemove", onMove);

//     const stars = Array.from({ length: count }).map(() => ({
//       x: Math.random() * c.width,
//       y: Math.random() * c.height,
//       r: Math.random() * 1.7 + 0.5,
//       vx: -(0.2 + Math.random() * 0.35),
//       tw: Math.random() * Math.PI * 2,
//     }));

//     const tick = () => {
//       const { width: W, height: H } = c;
//       ctx.clearRect(0, 0, W, H);

//       for (const s of stars) {
//         // Move & wrap
//         s.x += s.vx;
//         if (s.x < -5) s.x = W + 5;

//         // Twinkle baseline
//         s.tw += 0.02;
//         let a = 0.22 + 0.25 * Math.sin(s.tw);

//         // Lens displacement if within radius
//         let dx = 0,
//           dy = 0;
//         if (mouse.current.inside) {
//           const mx = mouse.current.x,
//             my = mouse.current.y;
//           const ddx = s.x - mx;
//           const ddy = s.y - my;
//           const d = Math.hypot(ddx, ddy);
//           if (d < lensRadius) {
//             // Push outward with falloff (quadratic)
//             const k = (1 - d / lensRadius) ** 2 * lensStrength;
//             const n = d > 0 ? k / d : 0;
//             dx = ddx * n;
//             dy = ddy * n;
//             // brighten slightly near the lens
//             a = Math.min(1, a + (1 - d / lensRadius) * 0.4);
//           }
//         }

//         // Draw star at displaced position
//         ctx.globalAlpha = Math.max(0.12, a);
//         ctx.beginPath();
//         ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
//         ctx.fillStyle = "#ffffff";
//         ctx.fill();
//       }

//       rafRef.current = requestAnimationFrame(tick);
//     };

//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       ro.disconnect();
//       window.removeEventListener("mousemove", onMove);
//     };
//   }, [count, lensRadius, lensStrength]);

//   return (
//     <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
//       <canvas ref={canvasRef} className="w-full h-full" />
//     </div>
//   );
// }

// /* Shared content */
// function Avatar() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ type: "spring", stiffness: 200, damping: 18 }}
//       className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl"
//     >
//       <div
//         className="absolute inset-0 rounded-full"
//         style={{
//           background:
//             "conic-gradient(from 0deg,#3b82f6,#a855f7,#ec4899,#3b82f6)",
//         }}
//       />
//       <div className="absolute inset-[4px] rounded-full overflow-hidden bg-white dark:bg-gray-900" />
//       <img
//         src="https://via.placeholder.com/300x300.png?text=Your+Photo"
//         alt="Oliver"
//         className="relative w-full h-full object-cover rounded-full select-none pointer-events-none"
//       />
//     </motion.div>
//   );
// }
// function Intro() {
//   return (
//     <div className="max-w-3xl">
//       <h2 className="text-5xl font-extrabold leading-tight">Hi, I&apos;m Oliver!</h2>
//       <p className="mt-4 text-lg opacity-90">
//         I build stylish, functional web apps with React and Node. I care about
//         clean code, great UX, and lifelong learning.
//       </p>
//       <div className="mt-6 flex gap-3 justify-center">
//         {/* See Projects — now matches Contact Me (outlined pill) */}
//         <a
//           href="#projects"
//           className="px-5 py-2 rounded-full border shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//         >
//           See Projects
//         </a>

//         {/* Contact Me (unchanged) */}
//         <a
//           href="#contact"
//           className="px-5 py-2 rounded-full border shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//         >
//           Contact Me
//         </a>
//       </div>
//     </div>
//   );
// }
// function QuickFacts() {
//   return (
//     <aside className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl mx-auto">
//       <p className="font-semibold">Quick facts</p>
//       <ul className="mt-3 text-sm space-y-1 opacity-90">
//         <li>📍 London (remote-friendly)</li>
//         <li>💻 Full-Stack Junior Web Developer</li>
//         <li>🤝 Open to collaborations &amp; contract work</li>
//       </ul>
//       <div className="mt-4 flex flex-col gap-2">
//         <a
//           href="https://github.com/Oliver-Murrell"
//           className="text-blue-600 dark:text-blue-400 hover:underline"
//         >
//           GitHub
//         </a>
//         <a href="/resume.pdf" className="text-blue-600 dark:text-blue-400 hover:underline">
//           CV
//         </a>
//       </div>
//     </aside>
//   );
// }


// FILE: src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative max-w-6xl mx-auto p-6 text-center">
      <LensStarfield />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <Avatar />
        <Intro />
        <QuickFacts />
      </div>
    </section>
  );
}

/* Stars drift left; stars within a radius of the cursor are displaced outward */
function LensStarfield({ count = 160, lensRadius = 140, lensStrength = 22 }) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const mouse = React.useRef({ x: -9999, y: -9999, inside: false });

  React.useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    const resize = () => {
      c.width = c.clientWidth;
      c.height = c.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.current.inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);

    const stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.7 + 0.5,
      vx: -(0.2 + Math.random() * 0.35),
      tw: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      const { width: W, height: H } = c;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.x += s.vx;
        if (s.x < -5) s.x = W + 5;

        s.tw += 0.02;
        let a = 0.22 + 0.25 * Math.sin(s.tw);

        let dx = 0, dy = 0;
        if (mouse.current.inside) {
          const mx = mouse.current.x, my = mouse.current.y;
          const ddx = s.x - mx;
          const ddy = s.y - my;
          const d = Math.hypot(ddx, ddy);
          if (d < lensRadius) {
            const k = (1 - d / lensRadius) ** 2 * lensStrength;
            const n = d > 0 ? k / d : 0;
            dx = ddx * n;
            dy = ddy * n;
            a = Math.min(1, a + (1 - d / lensRadius) * 0.4);
          }
        }

        ctx.globalAlpha = Math.max(0.12, a);
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [count, lensRadius, lensStrength]);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

/* Shared content */
function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg,#3b82f6,#a855f7,#ec4899,#3b82f6)" }}
      />
      {/* Dark-only inner mask */}
      <div className="absolute inset-[4px] rounded-full overflow-hidden bg-gray-900" />
      <img
        src="https://via.placeholder.com/300x300.png?text=Your+Photo"
        alt="Oliver"
        className="relative w-full h-full object-cover rounded-full select-none pointer-events-none"
      />
    </motion.div>
  );
}

function Intro() {
  return (
    <div className="max-w-3xl text-gray-100">
      <h2 className="text-5xl font-extrabold leading-tight">Hi, I&apos;m Oliver!</h2>
      <p className="mt-4 text-lg opacity-90">
        I build stylish, functional web apps with React and Node. I care about clean code, great UX, and lifelong learning.
      </p>
      <div className="mt-6 flex gap-3 justify-center">
        <a
          href="#projects"
          className="px-5 py-2 rounded-full border border-gray-700 text-gray-100 shadow hover:bg-gray-700 transition"
        >
          See Projects
        </a>
        <a
          href="#contact"
          className="px-5 py-2 rounded-full border border-gray-700 text-gray-100 shadow hover:bg-gray-700 transition"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}

function QuickFacts() {
  return (
    <aside className="w-full max-w-sm p-6 bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl shadow-xl mx-auto">
      <p className="font-semibold">Quick facts</p>
      <ul className="mt-3 text-sm space-y-1 opacity-90">
        <li>📍 London (remote-friendly)</li>
        <li>💻 Full-Stack Junior Web Developer</li>
        <li>🤝 Open to collaborations &amp; contract work</li>
      </ul>
      <div className="mt-4 flex flex-col gap-2">
        <a href="https://github.com/Oliver-Murrell" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
          GitHub
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
          CV
        </a>

      </div>
    </aside>
  );
}
