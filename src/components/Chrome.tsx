import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { profile, sections } from "../data";

/* ---------- Brand glyphs (inline, since lucide dropped brand icons) ---------- */
export function GithubGlyph({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53l-.02-1.86c-3.06.67-3.71-1.48-3.71-1.48-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.67.08-.67 1.11.08 1.7 1.14 1.7 1.14.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.19 1.14-2.96-.11-.28-.5-1.41.11-2.94 0 0 .93-.3 3.05 1.13a10.5 10.5 0 0 1 5.56 0c2.12-1.43 3.04-1.13 3.04-1.13.62 1.53.23 2.66.12 2.94.71.77 1.14 1.76 1.14 2.96 0 4.23-2.58 5.16-5.03 5.43.4.34.75 1.02.75 2.06l-.01 3.05c0 .3.2.64.76.53a11.02 11.02 0 0 0 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinGlyph({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1-.01 5.001A2.5 2.5 0 0 1 4.98 3.5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.44c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87V21h-4V9Z" />
    </svg>
  );
}

/* ---------- Signal-trace mark, drawn as vector ---------- */
export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="3" fill="#14171A" />
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="3"
        stroke="#242A2F"
        strokeWidth="1.5"
      />
      <path
        d="M6 27.5h6.5l3.2-9.4 4.1 13.2 4.4-19.1 3.4 15.3H34"
        stroke="#F5A524"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <circle cx="34" cy="27.5" r="2.6" fill="#3FC8BE" />
    </svg>
  );
}

/* ---------- Scroll progress rule (top hairline) ---------- */
export function ProgressRule() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-amber"
    />
  );
}

/* ---------- Top bar ---------- */
export function TopBar({
  active,
  onJump,
}: {
  active: string;
  onJump: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-ground/90 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between gap-4 pl-4 pr-4 sm:pl-6 sm:pr-6">
          <button
            onClick={() => onJump("hero")}
            className="group flex items-center gap-3 text-left"
            aria-label="Back to top"
          >
            <Monogram />
            <span className="hidden sm:block leading-none">
              <span className="block font-mono text-[12px] font-medium text-ink">
                {profile.name}
              </span>
              <span className="block pt-1 font-mono text-[10px] tracking-[0.14em] text-cyan">
                {profile.handle}
              </span>
            </span>
          </button>

          <nav className="hidden items-center xl:flex" aria-label="Sections">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onJump(s.id)}
                  aria-current={on ? "true" : undefined}
                  className={`relative px-2.5 py-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
                    on ? "text-amber" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="tabular opacity-60">{s.index}</span>{" "}
                  <span>{s.label}</span>
                  <span
                    className={`absolute inset-x-2 -bottom-px h-px transition-all ${
                      on ? "bg-amber" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub profile"
              className="p-2 text-muted transition-colors hover:text-ink"
            >
              <GithubGlyph />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn profile"
              className="p-2 text-muted transition-colors hover:text-ink"
            >
              <LinkedinGlyph />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={profile.resume}
              className="hidden items-center gap-2 border border-amber/60 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-amber uppercase transition-colors hover:bg-amber hover:text-ground sm:flex"
            >
              <FileText size={13} strokeWidth={1.8} />
              Resume
            </a>
            <button
              onClick={() => setOpen(true)}
              className="p-2 text-ink xl:hidden"
              aria-label="Open navigation"
            >
              <Menu size={20} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ground xl:hidden"
          >
            <div className="flex h-14 items-center justify-between border-b border-rule px-4 sm:px-6">
              <span className="eyebrow text-muted">Index / Sections</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="p-2 text-ink"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>
            <nav className="flex flex-col px-4 sm:px-6">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  onClick={() => {
                    setOpen(false);
                    onJump(s.id);
                  }}
                  className="flex items-baseline gap-5 border-b border-rule-soft py-5 text-left"
                >
                  <span className="font-mono text-[11px] tabular text-amber">
                    {s.index}
                  </span>
                  <span className="text-3xl font-extrabold tracking-[-0.03em] text-ink">
                    {s.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="flex gap-3 px-4 pt-8 sm:px-6">
              <a
                href={profile.resume}
                className="flex-1 border border-amber/60 py-3 text-center font-mono text-[11px] tracking-[0.16em] text-amber uppercase"
              >
                Resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex-1 bg-amber py-3 text-center font-mono text-[11px] tracking-[0.16em] text-ground uppercase"
              >
                Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Left rack rail (desktop) ---------- */
export function RackRail({
  active,
  onJump,
}: {
  active: string;
  onJump: (id: string) => void;
}) {
  const current = sections.find((s) => s.id === active) ?? sections[0];
  const pct = Math.round(
    ((Number(current.index) - 1) / (sections.length - 1)) * 100,
  );

  return (
    <aside className="fixed top-14 bottom-0 left-0 z-30 hidden w-16 flex-col justify-between border-r border-rule bg-ground-deep/60 py-8 lg:flex">
      <div className="flex justify-center">
        <span className="eyebrow rotate-180 text-muted-dim [writing-mode:vertical-rl]">
          Section
        </span>
      </div>

      <nav className="flex flex-col items-center gap-6" aria-label="Section rail">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onJump(s.id)}
              title={s.label}
              className="group flex w-full flex-col items-center gap-2 py-1"
              aria-label={`Go to ${s.label}`}
              aria-current={on ? "true" : undefined}
            >
              <span
                className={`font-mono text-[10px] tabular transition-colors ${
                  on ? "text-amber" : "text-muted-dim group-hover:text-muted"
                }`}
              >
                {s.index}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  on
                    ? "w-8 bg-amber led-amber"
                    : "w-3 bg-rule group-hover:w-6 group-hover:bg-muted"
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tabular text-muted">{pct}%</span>
        <span className="eyebrow rotate-180 text-muted-dim [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </aside>
  );
}

/* ---------- Shared section header (datasheet style) ---------- */
export function SectionHeader({
  index,
  eyebrow,
  title,
  note,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <header className="mb-10 lg:mb-14">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] tabular text-amber">{index}</span>
        <span className="groove flex-1" />
        <span className="eyebrow text-muted">{eyebrow}</span>
      </div>
      <h2 className="mt-6 max-w-4xl text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {note && (
        <p className="mt-4 max-w-2xl font-serif text-xl leading-snug text-muted italic sm:text-2xl">
          {note}
        </p>
      )}
    </header>
  );
}
