import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2, Cpu } from "lucide-react";
import Section from "../components/Section";
import { SectionHeader, GithubGlyph, LinkedinGlyph } from "../components/Chrome";
import { profile, roleRoutes } from "../data";

type Status = { kind: "idle" | "sending" | "ok" | "error"; text: string };

export default function Contact() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_email: "",
    role_type: roleRoutes[0].value,
    payload_message: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const payload = useMemo(
    () => ({
      sender_name: form.sender_name || null,
      sender_email: form.sender_email || null,
      role_type: form.role_type,
      message: form.payload_message || null,
    }),
    [form],
  );

  const jsonLines = useMemo(
    () => JSON.stringify(payload, null, 2).split("\n"),
    [payload],
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending", text: "POST /api/v1/contact — transmitting…" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `Portfolio Inquiry: ${form.role_type} from ${form.sender_name}`,
          from_name: form.sender_name,
          name: form.sender_name,
          email: form.sender_email,
          role_type: form.role_type,
          message: form.payload_message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({
          kind: "ok",
          text: "HTTP 200 OK — payload delivered. I'll reply shortly.",
        });
        setForm({
          sender_name: "",
          sender_email: "",
          role_type: roleRoutes[0].value,
          payload_message: "",
        });
      } else {
        setStatus({
          kind: "error",
          text: `HTTP 400 — ${result.message || "Payload rejected. Please retry."}`,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        text: "HTTP 500 — network error. Please try again or email directly.",
      });
    }
  }

  const field =
    "w-full border border-rule bg-ground-deep px-3 py-2.5 font-mono text-[13px] text-ink transition-colors placeholder:text-muted-dim focus:border-amber";

  return (
    <Section id="contact" tone="deep" className="border-t border-rule">
      <SectionHeader
        index="07"
        eyebrow="Open a connection"
        title="Connect & hire"
        note="Open to full-time Backend Developer, AI Engineer, and Junior Python REST API Developer roles."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Details column */}
        <div className="lg:col-span-4">
          <p className="text-xl leading-snug font-semibold text-ink sm:text-2xl">
            Ready to contribute to your team.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Send a role, a spec, or a half-formed idea — I read every message and
            reply with a concrete next step.
          </p>

          <ul className="mt-7 space-y-2">
            {[
              { icon: <Mail size={15} strokeWidth={1.7} />, value: profile.email, href: `mailto:${profile.email}`, tint: "amber" },
              { icon: <GithubGlyph size={15} />, value: profile.githubHandle, href: profile.github, tint: "ink" },
              { icon: <LinkedinGlyph size={15} />, value: "linkedin.com/in/rahaibanas", href: profile.linkedin, tint: "ink" },
              { icon: <MapPin size={15} strokeWidth={1.7} />, value: profile.location, href: null, tint: "cyan" },
            ].map((row) => (
              <li key={row.value}>
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3 border border-rule bg-ground px-4 py-3 font-mono text-[12px] text-ink transition-colors hover:border-amber hover:text-amber"
                  >
                    <span className={row.tint === "cyan" ? "text-cyan" : "text-amber"}>
                      {row.icon}
                    </span>
                    <span className="truncate">{row.value}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 border border-rule bg-ground px-4 py-3 font-mono text-[12px] text-muted">
                    <span className="text-cyan">{row.icon}</span>
                    <span className="truncate">{row.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`mailto:${profile.inquiryEmail}`}
              className="flex items-center gap-2 bg-amber px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-ground uppercase transition-colors hover:bg-amber-light"
            >
              <Send size={13} strokeWidth={1.9} />
              Send direct inquiry
            </a>
            <a
              href={profile.resume}
              className="flex items-center gap-2 border border-rule px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-ink uppercase transition-colors hover:border-amber hover:text-amber"
            >
              Download resume
            </a>
          </div>
        </div>

        {/* Form + payload */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-8">
          <form
            onSubmit={submit}
            className="machined min-w-0 border border-rule p-5 sm:p-6"
            aria-label="Contact form"
          >
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="eyebrow text-ink">request builder</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber led-amber" />
            </div>

            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow block pb-2 text-muted-dim">sender_name</span>
                  <input
                    type="text"
                    required
                    value={form.sender_name}
                    onChange={set("sender_name")}
                    placeholder="'Your Name'"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow block pb-2 text-muted-dim">sender_email</span>
                  <input
                    type="email"
                    required
                    value={form.sender_email}
                    onChange={set("sender_email")}
                    placeholder="'email@domain.com'"
                    className={field}
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow block pb-2 text-muted-dim">role_type</span>
                <select
                  value={form.role_type}
                  onChange={set("role_type")}
                  className={`${field} select-caret`}
                >
                  {roleRoutes.map((r) => (
                    <option key={r.value} value={r.value} className="bg-ground">
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="eyebrow block pb-2 text-muted-dim">payload_message</span>
                <textarea
                  required
                  rows={5}
                  value={form.payload_message}
                  onChange={set("payload_message")}
                  placeholder="'Type your message or project opportunity details here...'"
                  className={`${field} resize-none leading-relaxed`}
                />
              </label>

              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="flex w-full items-center justify-center gap-2 bg-amber py-3.5 font-mono text-[11px] tracking-[0.16em] text-ground uppercase transition-colors hover:bg-amber-light disabled:cursor-wait disabled:opacity-70"
              >
                {status.kind === "sending" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending payload…
                  </>
                ) : (
                  <>
                    <Send size={13} strokeWidth={1.9} />
                    POST HTTP/1.1 /api/v1/contact
                  </>
                )}
              </button>

              <div aria-live="polite" className="min-h-[2.25rem]">
                <AnimatePresence mode="wait">
                  {status.kind !== "idle" && (
                    <motion.p
                      key={status.text}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`border px-3 py-2 font-mono text-[11px] leading-relaxed ${
                        status.kind === "ok"
                          ? "border-cyan/50 bg-cyan/10 text-cyan"
                          : status.kind === "error"
                            ? "border-amber/50 bg-amber/10 text-amber"
                            : "border-rule bg-ground text-muted"
                      }`}
                    >
                      {status.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>

          {/* Live JSON mirror */}
          <div className="machined flex min-w-0 flex-col border border-rule p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="eyebrow text-ink">dynamic payload</span>
              <span className="eyebrow text-cyan">json</span>
            </div>

            <pre className="mt-5 flex-1 overflow-x-auto font-mono text-[12px] leading-relaxed">
              {jsonLines.map((line, i) => (
                <span
                  key={i}
                  className={`block ${
                    line.includes("null") ? "text-amber" : "text-cyan"
                  }`}
                >
                  {line}
                </span>
              ))}
            </pre>

            <p className="mt-5 border-t border-rule pt-4 text-[11px] leading-relaxed text-muted-dim">
              Inputs mirror dynamic REST request payloads in real time — the same shape
              I'd validate in a DRF serializer.
            </p>
          </div>
        </div>
      </div>

      {/* Footer plate */}
      <footer className="mt-20 flex flex-col gap-4 border-t border-rule pt-6 font-mono text-[11px] text-muted-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Backend &amp; AI Developer Portfolio.</p>
        <p className="flex items-center gap-2">
          Powered by Python, DRF &amp; Generative AI
          <Cpu size={13} strokeWidth={1.6} className="text-cyan" />
        </p>
      </footer>
    </Section>
  );
}
