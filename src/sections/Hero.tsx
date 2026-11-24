import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { logLines, profile } from "../data";

const TYPING_MS = 42;

function useTyped(text: string) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(id);
    }, TYPING_MS);
    return () => window.clearInterval(id);
  }, [text, reduce]);

  return text.slice(0, n);
}

type Logged = { code: string; verb: string; path: string; ms: string; k: number };

function RequestLog() {
  const reduce = useReducedMotion();
  const counter = useRef(logLines.length);
  const [history, setHistory] = useState<Logged[]>(() =>
    logLines.map((l, i) => ({ ...l, k: i })),
  );

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setHistory((h) => [
        ...h,
        { ...logLines[counter.current % logLines.length], k: counter.current },
      ]);
      counter.current += 1;
    }, 1700);
    return () => window.clearInterval(id);
  }, [reduce]);

  const visible = history.slice(-7);

  return (
    <div className="machined border border-rule">
      <div className="flex items-center justify-between border-b border-rule px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber led-amber" />
          <span className="eyebrow text-ink">live_req.log</span>
        </div>
        <span className="eyebrow text-muted-dim">streaming</span>
      </div>

      <div className="relative h-[248px] overflow-hidden px-4 py-3 sm:h-[268px]">
        <ul className="space-y-2 font-mono text-[11px] leading-relaxed">
          {visible.map((line) => (
            <li
              key={line.k}
              className={`flex items-baseline gap-2 whitespace-nowrap tabular ${
                line.k === history[history.length - 1]?.k ? "log-line" : ""
              }`}
            >
              <span
                className={
                  line.code === "200" || line.code === "201"
                    ? "text-cyan"
                    : "text-amber"
                }
              >
                {line.code}
              </span>
              <span className="w-12 shrink-0 text-muted">{line.verb}</span>
              <span className="truncate text-ink/85">{line.path}</span>
              <span className="ml-auto pl-3 text-muted-dim">{line.ms}</span>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel to-transparent" />
      </div>

      <div className="flex items-center justify-between border-t border-rule px-4 py-3">
        <span className="eyebrow text-muted-dim">p95 latency</span>
        <span className="font-mono text-[11px] tabular text-amber">0.11s</span>
        <span className="eyebrow text-muted-dim">workers</span>
        <span className="font-mono text-[11px] tabular text-cyan">4 / 4 ok</span>
      </div>
    </div>
  );
}

export default function Hero({ onJump }: { onJump: (id: string) => void }) {
  const typed = useTyped(profile.tagline);
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 lg:pt-28"
    >
      {/* Machined panel backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(115%_95%_at_25%_35%,#1c2126_0%,#101317_48%,#0d0f11_100%)]">
        <img
          src="images/panel.jpg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="h-full w-full object-cover opacity-55"
          style={{ objectPosition: "35% 50%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ground via-ground/85 to-ground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground via-transparent to-ground/70" />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:pl-24 lg:pr-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Identity block */}
          <div className="lg:col-span-7">
            <motion.div {...rise(0.05)} className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 border border-cyan/40 bg-cyan/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan led-cyan" />
                <span className="eyebrow text-cyan">{profile.availability}</span>
              </span>
            </motion.div>

            <motion.p {...rise(0.12)} className="mt-8 font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
              {profile.kicker}
            </motion.p>

            <motion.h1
              {...rise(0.18)}
              className="mt-4 text-[clamp(3rem,9vw,8.25rem)] leading-[0.86] font-black tracking-[-0.045em] text-ink"
            >
              Rahaib
              <br />
              <span className="text-amber">Anas</span>
            </motion.h1>

            <motion.p
              {...rise(0.26)}
              className="mt-5 font-serif text-3xl text-muted italic sm:text-4xl"
            >
              {profile.role}
            </motion.p>

            <motion.p
              {...rise(0.32)}
              className="mt-6 min-h-[3.5rem] max-w-xl font-mono text-sm leading-relaxed text-ink/90 sm:text-base"
            >
              <span>{typed}</span>
              <span className="caret" aria-hidden="true" />
            </motion.p>

            <motion.p {...rise(0.38)} className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {profile.intro}
            </motion.p>

            <motion.div {...rise(0.46)} className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => onJump("contact")}
                className="group flex items-center gap-3 bg-amber px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-ground uppercase transition-colors hover:bg-amber-light"
              >
                Get In Touch
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => onJump("projects")}
                className="flex items-center gap-3 border border-rule px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-ink uppercase transition-colors hover:border-amber hover:text-amber"
              >
                <Terminal size={14} strokeWidth={1.8} />
                Explore Projects
              </button>
            </motion.div>
          </div>

          {/* Instrument readout */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pt-6"
          >
            <RequestLog />
            <div className="mt-4 grid grid-cols-3 border border-rule bg-panel/70">
              {[
                { k: "apis", v: "10+" },
                { k: "rag builds", v: "5+" },
                { k: "dockerized", v: "100%" },
              ].map((s, i) => (
                <div
                  key={s.k}
                  className={`px-3 py-4 ${i < 2 ? "border-r border-rule" : ""}`}
                >
                  <div className="font-mono text-2xl tabular text-ink">{s.v}</div>
                  <div className="eyebrow mt-2 text-muted-dim">{s.k}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
