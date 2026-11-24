import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Section from "../components/Section";
import { SectionHeader } from "../components/Chrome";
import { education } from "../data";

export default function Education() {
  return (
    <Section id="education" className="border-t border-rule">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_65%_at_50%_85%,#1b1610_0%,#101317_55%,#0d0f11_100%)]">
        <img
          src="images/servers.jpg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="h-full w-full object-cover opacity-25"
          style={{ objectPosition: "50% 65%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ground via-ground/85 to-ground" />
      </div>

      <SectionHeader
        index="06"
        eyebrow="Academic record"
        title="Education & certifications"
        note="Formal grounding in mathematics and data science, applied daily to backend and ML systems."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Degree panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="machined flex flex-col justify-between border border-rule p-7 lg:col-span-5 lg:p-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <GraduationCap size={16} strokeWidth={1.6} className="text-amber" />
              <span className="eyebrow text-ink">Academic qualification</span>
              <span className="groove flex-1" />
            </div>

            <h3 className="mt-7 text-3xl leading-[1.05] font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
              {education.degree}
            </h3>

            <p className="mt-5 inline-block border border-amber/50 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-amber uppercase">
              {education.stage}
            </p>
          </div>

          <div className="mt-8 border-t border-rule pt-5">
            <div className="eyebrow text-muted-dim">Core coursework</div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {education.coursework}
            </p>
          </div>
        </motion.div>

        {/* Specialization grid */}
        <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:col-span-7">
          {education.focus.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="machined group p-6 transition-colors hover:bg-panel-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tabular text-muted-dim">
                  0{i + 1}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    f.tint === "cyan" ? "bg-cyan led-cyan" : "bg-amber led-amber"
                  }`}
                />
              </div>
              <h4 className="mt-5 text-base font-bold tracking-[-0.01em] text-ink">
                {f.title}
              </h4>
              <p
                className={`mt-2 font-mono text-[11px] tracking-[0.1em] ${
                  f.tint === "cyan" ? "text-cyan" : "text-amber"
                }`}
              >
                {f.meta}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
