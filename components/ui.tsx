import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

/** Small mono label that opens a section. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
      <span className="size-1 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? "items-center text-center" : "items-start"
      }`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-2xl text-[26px] font-semibold leading-[1.3] tracking-tight sm:text-4xl sm:leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-[15px] leading-7 text-muted">{description}</p>
      )}
    </div>
  );
}

type AnchorProps = ComponentProps<"a">;

export function PrimaryLink({ className = "", children, ...props }: AnchorProps) {
  return (
    <a
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-fg transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_8px_28px_-10px_var(--accent)] active:translate-y-0 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function GhostLink({ className = "", children, ...props }: AnchorProps) {
  return (
    <a
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-ink-2/60 px-5 text-sm font-medium text-foreground/90 transition-colors hover:border-line-strong hover:bg-ink-3 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
