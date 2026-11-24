import { motion } from "framer-motion";
import Section from "../components/Section";
import { SectionHeader } from "../components/Chrome";
import { about } from "../data";

const tints = ["amber", "cyan", "amber", "cyan"] as const;

export default function About() {
  return (
    <Section id="about" className="border-t border-rule">
      <SectionHeader
        index="02"
        eyebrow="Operator profile"
        title="About & technical focus"
        note="Backend first, AI-native — the same rigor applied to endpoints and to embeddings."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Prose column */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl leading-snug font-semibold tracking-[-0.02em] text-ink sm:text-3xl"
          >
            {about.lead}
          </motion.p>

          <div className="mt-8 space-y-6 border-l border-rule pl-6 text-[15px] leading-relaxed text-muted sm:text-base">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-amber uppercase">
              Core focus:
            </span>
            {about.focus.map((f) => (
              <span
                key={f}
                className="border border-rule px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-ink uppercase transition-colors hover:border-amber hover:text-amber"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Meter column */}
        <div className="lg:col-span-5">
          <div className="machined border border-rule">
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <span className="eyebrow text-ink">Telemetry</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan led-cyan" />
            </div>

            <dl>
              {about.metrics.map((m, i) => (
                <div
                  key={m.code}
                  className="group flex items-center justify-between gap-4 border-b border-rule-soft px-5 py-5 transition-colors last:border-b-0 hover:bg-panel-2"
                >
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-dim uppercase transition-colors group-hover:text-muted">
                      {m.code}
                    </dt>
                    <dd className="mt-2 text-sm text-muted">{m.label}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        tints[i] === "cyan" ? "bg-cyan led-cyan" : "bg-amber led-amber"
                      }`}
                    />
                    <span className="font-mono text-4xl leading-none tabular text-ink sm:text-5xl">
                      {m.value}
                    </span>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted-dim">
            <span className="text-amber">›</span>
            Containerized workflows, tested endpoints, measurable latency.
          </p>
        </div>
      </div>
    </Section>
  );
}
