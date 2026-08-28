import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
