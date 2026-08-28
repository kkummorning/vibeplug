"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/icons";

type Props = {
  command: string;
  /** `lg` is the hero treatment; `sm` sits inline inside cards and the nav. */
  size?: "lg" | "sm";
  className?: string;
};

export function CopyCommand({ command, size = "lg", className = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      // Clipboard is unavailable outside secure contexts — leave the label alone
      // so we never claim a copy that did not happen.
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  const large = size === "lg";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`명령어 복사: ${command}`}
      className={`group inline-flex items-center gap-3 rounded-xl border border-border bg-neutral-950/80 text-left font-mono transition-colors hover:border-input ${
        large ? "px-4 py-3.5 text-[13px] sm:text-sm" : "px-3 py-2 text-xs"
      } ${className}`}
    >
      <span className="select-none text-accent/70">$</span>
      <span className="truncate text-foreground/90">{command}</span>
      <span
        className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] transition-colors ${
          copied ? "text-accent" : "text-tertiary group-hover:text-muted-foreground"
        }`}
      >
        {copied ? (
          <>
            <Check className="size-3.5" />
            {large && "복사됨"}
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            {large && "복사"}
          </>
        )}
      </span>
    </button>
  );
}
