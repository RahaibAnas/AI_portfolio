import { motion } from "framer-motion";
import Section from "../components/Section";
import { SectionHeader } from "../components/Chrome";
import { capabilities } from "../data";

export default function Capabilities() {
  return (
    <Section id="capabilities" tone="deep" className="overflow-hidden border-t border-rule">
      {/* embedding-space plate */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(85%_65%_at_78%_45%,#11211f_0%,#0f1214_55%,#090a0c_100%)]">
        <img
          src="images/vector-space.jpg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-40 sm:w-3/4"
          style={{
            maskImage: "linear-gradient(to left, black 5%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to left, black 5%, transparent 85%)",
          }}
        />
        <div className="absolute inset-0 bg-ground-deep/70" />
      </div>

      <SectionHeader
        index="05"
        eyebrow="Capability matrix / 06 lanes"
        title="AI & backend integration capabilities"
        note="Where the API layer meets the model layer — the parts of the system I enjoy owning end to end."
      />

      <div className="grid grid-cols-1 gap-x-14 md:grid-cols-2">
        {capabilities.map((c, i) => (
          <motion.article
            key={c.index}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
            className="group border-t border-rule py-7 transition-colors hover:border-amber/70"
          >
            <div className="flex items-start gap-5">
              <span className="mt-1 font-mono text-[11px] tabular text-amber transition-colors group-hover:text-amber-light">
                {c.index}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl leading-tight font-bold tracking-[-0.02em] text-ink sm:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-6 border border-rule bg-ground/80 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="max-w-2xl font-serif text-2xl leading-snug text-ink italic sm:text-3xl">
          “Endpoints are contracts. Prompts are contracts. Both deserve tests.”
        </p>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-muted-dim uppercase">
          Working principle / R. Anas
        </span>
      </div>
    </Section>
  );
}
