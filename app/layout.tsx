import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", "system-ui"],
});

// Code only, and it's a 300 KB TTF — let it load on demand instead of blocking
// the first paint the way a preload would.
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const description =
  "바이블로는 풀스택 블록 마켓플레이스입니다. UI·서버 액션·API 라우트·DB 스키마를 한 번에 내 저장소에 설치하고, 그때부터 그 코드는 내 것이 됩니다.";

export const metadata: Metadata = {
  title: {
    default: "바이블로 — 풀스택 블록 마켓플레이스",
    template: "%s · 바이블로",
  },
  description,
  keywords: [
    "바이블로",
    "biblelo",
    "풀스택 블록",
    "마켓플레이스",
    "shadcn",
    "Next.js",
    "레지스트리",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "바이블로",
    title: "바이블로 — 풀스택 블록 마켓플레이스",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "바이블로 — 풀스택 블록 마켓플레이스",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // `dark`가 이 랜딩의 기본 테마다. SiteHeader의 토글이 이 클래스를 껐다 켜고,
  // 클래스가 빠지면 globals.css의 :root(라이트)가 드러난다.
  return (
    <html
      lang="ko"
      className={`dark ${pretendard.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
