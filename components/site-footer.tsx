import { Github } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";

const columns = [
  {
    title: "제품",
    links: ["마켓플레이스", "요금제", "변경 로그", "로드맵", "상태 페이지"],
  },
  {
    title: "개발자",
    links: ["문서", "CLI 레퍼런스", "블록 만들기", "프라이빗 레지스트리", "예제 저장소"],
  },
  {
    title: "회사",
    links: ["소개", "블로그", "채용", "브랜드 자료", "문의하기"],
  },
  {
    title: "정책",
    links: ["이용약관", "개인정보처리방침", "라이선스", "환불 정책", "보안"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary-800/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[14px] leading-7 text-muted-foreground">
              풀스택 블록 마켓플레이스. 서비스를 빌려 쓰는 대신, 코드를 가져다
              씁니다.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-input hover:text-foreground"
              >
                <Github className="size-[18px]" />
              </a>
              <span className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[12px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                모든 시스템 정상
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[13px] font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 text-[12px] text-tertiary sm:flex-row sm:items-center">
          <p>© 2026 바이블로 (Biblelo). All rights reserved.</p>
          <p className="font-mono sm:ml-auto">서울특별시 · hello@biblelo.dev</p>
        </div>
      </Container>
    </footer>
  );
}
