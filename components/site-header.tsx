"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Close, Github, Menu, Moon, Sun } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";

const nav = [
  { href: "/features", label: "기능 목록" },
  { href: "#marketplace", label: "마켓플레이스" },
  { href: "#how", label: "작동 방식" },
  { href: "#anatomy", label: "블록 구조" },
  { href: "#publish", label: "퍼블리셔" },
  { href: "#pricing", label: "요금제" },
];

// 별도 라우트(/…)만 <Link>로 내보내고, 랜딩 섹션 앵커(#…)는 기존대로 <a>다.
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return href.startsWith("/") ? (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Starts true to match the server-rendered <html>, which carries `.dark`.
  // The class is the single source of truth; nothing is persisted.
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label="바이블로 홈">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark(document.documentElement.classList.toggle("dark"))}
            aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            aria-pressed={dark}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <a
            href="#"
            aria-label="GitHub 저장소"
            className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:flex"
          >
            <Github className="size-[18px]" />
          </a>
          <a
            href="#"
            className="hidden h-9 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:flex"
          >
            로그인
          </a>
          <a
            href="#marketplace"
            className="flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            블록 둘러보기
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              로그인
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
