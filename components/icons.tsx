import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared stroke-based icon frame — keeps every glyph on the same optical grid. */
function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Stroke>
  );
}

export function Check(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </Stroke>
  );
}

export function Copy(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5.5 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v.5" />
    </Stroke>
  );
}

export function Search(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Stroke>
  );
}

export function Menu(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Stroke>
  );
}

export function Close(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Stroke>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Stroke>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z" />
    </svg>
  );
}

export function Github(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49l-.01-1.9c-2.6.5-3.28-.63-3.5-1.21-.12-.3-.64-1.22-1.09-1.47-.37-.2-.9-.68-.02-.7.83-.01 1.42.76 1.62 1.08.95 1.6 2.47 1.14 3.07.87.1-.68.37-1.15.67-1.42-2.3-.26-4.71-1.15-4.71-5.11 0-1.13.4-2.06 1.06-2.78-.1-.26-.46-1.32.1-2.74 0 0 .87-.28 2.85 1.06a9.6 9.6 0 0 1 5.18 0c1.98-1.34 2.85-1.06 2.85-1.06.57 1.42.21 2.48.1 2.74.67.72 1.07 1.64 1.07 2.78 0 3.97-2.42 4.85-4.72 5.11.37.32.7.94.7 1.91l-.01 2.83c0 .27.19.6.7.49A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </Stroke>
  );
}

export function Moon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
    </Stroke>
  );
}

export function Terminal(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 10 2.5 2L7 14M13 15h4" />
    </Stroke>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.5c.7 4.2 2.3 5.8 6.5 6.5-4.2.7-5.8 2.3-6.5 6.5-.7-4.2-2.3-5.8-6.5-6.5 4.2-.7 5.8-2.3 6.5-6.5ZM18.5 15c.35 2.1 1.15 2.9 3.25 3.25-2.1.35-2.9 1.15-3.25 3.25-.35-2.1-1.15-2.9-3.25-3.25 2.1-.35 2.9-1.15 3.25-3.25Z" />
    </svg>
  );
}
