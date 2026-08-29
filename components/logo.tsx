/**
 * Biblelo mark — three stacked slabs (UI / server / data) sitting in a socket.
 * The slabs fade downward, reading as one block that carries a whole stack.
 */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        fill="var(--surface-muted)"
        stroke="var(--input)"
      />
      <rect x="8" y="8" width="16" height="4" rx="1.6" fill="var(--accent)" />
      <rect
        x="8"
        y="14"
        width="16"
        height="4"
        rx="1.6"
        fill="var(--accent)"
        opacity="0.55"
      />
      <rect
        x="8"
        y="20"
        width="16"
        height="4"
        rx="1.6"
        fill="var(--accent)"
        opacity="0.25"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight">
        바이블로
        <span className="ml-1.5 hidden font-mono text-[11px] font-normal text-tertiary sm:inline">
          biblelo
        </span>
      </span>
    </span>
  );
}
