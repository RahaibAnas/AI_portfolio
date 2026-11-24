import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import Section from "../components/Section";
import { SectionHeader } from "../components/Chrome";
import { GithubGlyph } from "../components/Chrome";
import { projects } from "../data";
import type { Project } from "../data";

const methodStyle: Record<Project["method"], string> = {
  POST: "border-amber/60 text-amber",
  GET: "border-cyan/60 text-cyan",
  CLI: "border-rule text-ink",
};

const statusTint: Record<Project["statusTint"], string> = {
  amber: "text-amber",
  cyan: "text-cyan",
  muted: "text-muted",
};

function Row({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border-b border-rule transition-colors ${open ? "bg-panel" : ""}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`detail-${project.id}`}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-5 text-left transition-colors hover:bg-panel-2 sm:px-6 md:grid-cols-[76px_minmax(160px,1.1fr)_minmax(0,1.6fr)_auto] lg:grid-cols-[76px_minmax(180px,1fr)_minmax(0,1.5fr)_minmax(120px,0.7fr)_auto]"
      >
        {/* One wrapper on mobile, dissolved into grid cells from md up */}
        <span className="min-w-0 md:contents">
          {/* method */}
          <span
            className={`hidden border px-2 py-1 text-center font-mono text-[10px] tracking-[0.12em] md:block ${methodStyle[project.method]}`}
          >
            {project.method}
          </span>

          {/* route */}
          <span className="hidden min-w-0 truncate font-mono text-[11px] text-muted md:block">
            {project.route}
          </span>

          {/* title block */}
          <span className="min-w-0">
            <span className="flex items-center gap-3 md:hidden">
              <span
                className={`border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] ${methodStyle[project.method]}`}
              >
                {project.method}
              </span>
              <span className="truncate font-mono text-[10px] text-muted-dim">
                {project.route}
              </span>
            </span>
            <span className="mt-2 block text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-amber sm:text-lg">
              {project.title}
            </span>
            <span className="mt-1.5 block font-mono text-[10px] tracking-[0.16em] text-muted-dim uppercase">
              {project.category} · {project.status}
            </span>
          </span>

          {/* capability */}
          <span
            className={`hidden font-mono text-[10px] tracking-[0.14em] uppercase lg:block ${
              statusTint[project.statusTint]
            }`}
          >
            {project.capability}
          </span>
        </span>

        <span className="justify-self-end">
          <ChevronRight
            size={18}
            strokeWidth={1.6}
            className={`text-muted transition-transform duration-300 ${
              open ? "rotate-90 text-amber" : "group-hover:text-ink"
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`detail-${project.id}`}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 border-t border-rule-soft bg-ground-deep px-4 py-7 sm:px-6 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="text-[15px] leading-relaxed text-ink/90">
                  {project.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="border border-rule bg-panel px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-muted uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-5 border-t border-rule pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                <div className="space-y-3">
                  <div>
                    <div className="eyebrow text-muted-dim">endpoint</div>
                    <div className="mt-1.5 break-all font-mono text-[11px] text-cyan">
                      {project.method} {project.route}
                    </div>
                  </div>
                  <div>
                    <div className="eyebrow text-muted-dim">capability</div>
                    <div
                      className={`mt-1.5 font-mono text-[11px] ${
                        statusTint[project.statusTint]
                      }`}
                    >
                      {project.capability}
                    </div>
                  </div>
                </div>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link flex items-center justify-between gap-3 border border-amber/50 px-4 py-3 font-mono text-[10px] tracking-[0.16em] text-amber uppercase transition-colors hover:bg-amber hover:text-ground"
                >
                  <span className="flex items-center gap-2">
                    <GithubGlyph size={14} />
                    Code repository
                  </span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>("citevault");

  return (
    <Section id="projects" className="border-t border-rule">
      <SectionHeader
        index="04"
        eyebrow="Route table / 05 records"
        title="Featured AI & backend projects"
        note="Open a row to inspect the payload — five builds, each with a live repository."
      />

      <div className="machined border border-rule">
        {/* table head */}
        <div className="hidden grid-cols-[76px_minmax(160px,1.1fr)_minmax(0,1.6fr)_auto] gap-4 border-b border-rule bg-panel-2 px-6 py-3 md:grid lg:grid-cols-[76px_minmax(180px,1fr)_minmax(0,1.5fr)_minmax(120px,0.7fr)_auto]">
          <span className="eyebrow text-muted-dim">method</span>
          <span className="eyebrow text-muted-dim">route</span>
          <span className="eyebrow text-muted-dim">project</span>
          <span className="eyebrow hidden text-muted-dim lg:block">capability</span>
          <span className="eyebrow justify-self-end text-muted-dim">open</span>
        </div>

        {projects.map((p) => (
          <Row
            key={p.id}
            project={p}
            open={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
          />
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 font-mono text-[11px] text-muted-dim sm:px-6">
          <span>5 records returned · sort=featured</span>
          <span className="text-cyan">200 OK · 0.03s</span>
        </div>
      </div>
    </Section>
  );
}
