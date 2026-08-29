"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 마이페이지 구역의 공통 사이드 메뉴. app/mypage/layout.tsx 한 곳에서만 렌더된다.
const items = [
  { href: "/mypage/profile", label: "내 정보" },
  { href: "/mypage/features", label: "기능 관리" },
] as const;

export function MypageNav() {
  // 현재 화면 표시용으로만 쓴다 — 이동 자체는 <Link>가 처리한다.
  const pathname = usePathname();

  return (
    <nav aria-label="마이페이지 메뉴" className="lg:w-56 lg:shrink-0">
      {/* 폰에서는 가로 한 줄, 데스크톱에서는 세로 사이드바 */}
      <ul className="flex gap-inline-md overflow-x-auto lg:flex-col lg:overflow-x-visible">
        {items.map((item) => {
          const current = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`block whitespace-nowrap rounded-lg px-grid-gutter-x py-field-sm text-label-md transition-colors ${
                  current
                    ? "bg-accent/15 text-accent"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
