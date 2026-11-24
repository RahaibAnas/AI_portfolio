import { motion } from "framer-motion";
import Section from "../components/Section";
import { SectionHeader } from "../components/Chrome";
import { stack } from "../data";

const tintText = {
  amber: "text-amber",
  cyan: "text-cyan",
  ink: "text-ink",
} as const;

const tintBorder = {
  amber: "border-amber/50",
  cyan: "border-cyan/50",
  ink: "border-rule",
} as const;

function Meter({ level, tint }: { level: number; tint: keyof typeof tintText }) {
  const on = tint === "cyan" ? "bg-cyan" : tint === "amber" ? "bg-amber" : "bg-ink";
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-2.5 w-1.5 ${
            i < level ? on : "bg-rule"
          } ${i < level && tint === "amber" ? "led-amber" : ""}`}
        />
      ))}
    </span>
  );
}

export default function Stack() {
  return (
    <Section id="stack" tone="deep" className="border-t border-rule">
      <SectionHeader
        index="03"
        eyebrow="Instrument bay / 04 modules"
        title="Technology stack"
        note="Each capability calibrated: five segments is production depth, three is working knowledge."
      />

      <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-4">
        {stack.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.07 }}
            className="machined flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tabular text-muted-dim">
                {group.index}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  group.tint === "cyan" ? "bg-cyan led-cyan" : "bg-amber led-amber"
                }`}
              />
            </div>

            <h3
              className={`mt-5 text-[15px] font-bold tracking-[0.08em] uppercase ${
                tintText[group.tint]
              }`}
            >
              {group.title}
            </h3>

            <div className="groove mt-4" />

            <ul className="mt-2 flex-1">
              {group.items.map((item) => (
                <li key={item.name} className="border-b border-rule-soft py-3.5 last:border-b-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 flex-1 truncate text-sm text-ink">
                      {item.name}
                    </span>
                    <Meter level={item.strength} tint={group.tint} />
                  </div>
                  <span
                    className={`mt-2 block font-mono text-[10px] tracking-[0.16em] uppercase ${
                      tintText[group.tint]
                    } opacity-80`}
                  >
                    {item.level}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-5 border-t pt-4 font-mono text-[10px] tracking-[0.14em] uppercase ${tintBorder[group.tint]}`}
            >
              <span className="text-muted-dim">load</span>{" "}
              <span className={tintText[group.tint]}>ok</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 border border-rule bg-ground px-5 py-4 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2">
          <span className="text-cyan">✓</span>
          Stack loaded: REST API architecture with AI Agents &amp; RAG functionality
          enabled.
        </span>
        <span className="text-muted-dim">pytest tests/test_ai_endpoints.py</span>
      </div>
    </Section>
  );
}
