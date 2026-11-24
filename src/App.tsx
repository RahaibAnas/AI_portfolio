import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ProgressRule, RackRail, TopBar } from "./components/Chrome";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Projects from "./sections/Projects";
import Capabilities from "./sections/Capabilities";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import { sections } from "./data";

export default function App() {
  const [active, setActive] = useState<string>(sections[0].id);

  /* Scroll spy: the section crossing the viewport middle wins. */
  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(id);
    if (window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <a
      href="#about"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:tracking-[0.16em] focus:text-ground focus:uppercase"
    >
      Skip to content
    </a>
    <div className="relative min-h-screen bg-ground">
      <ProgressRule />
      <TopBar active={active} onJump={jump} />
      <RackRail active={active} onJump={jump} />

      <main>
        <Hero onJump={jump} />
        <About />
        <Stack />
        <Projects />
        <Capabilities />
        <Education />
        <Contact />
      </main>

      {/* film grain over the whole panel */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-overlay"
      />
    </div>
    </MotionConfig>
  );
}
