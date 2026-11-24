import type { ReactNode } from "react";

export default function Section({
  id,
  children,
  className = "",
  tone = "ground",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "ground" | "deep";
}) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-20 px-6 pt-14 pb-20 sm:px-10 lg:pt-16 lg:pb-24 lg:pr-16 lg:pl-24 ${
        tone === "deep" ? "bg-ground-deep" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
}
