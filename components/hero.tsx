import { CopyCommand } from "@/components/copy-command";
import { ArrowRight, Sparkle } from "@/components/icons";
import { TerminalDemo } from "@/components/terminal-demo";
import { Container, GhostLink, PrimaryLink } from "@/components/ui";

const stats = [
  { value: "428", label: "등록된 블록" },
  { value: "12.4만", label: "주간 설치" },
  { value: "1,240", label: "퍼블리셔" },
  { value: "4분", label: "평균 도입 시간" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid mask-top pointer-events-none absolute inset-x-0 top-0 h-[720px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-260px] size-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,194,71,0.13),transparent_62%)] blur-3xl"
      />

      <Container className="relative pb-20 pt-16 sm:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12">
          <div className="flex flex-col items-start">
            <a
              href="#marketplace"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/70 py-1 pl-1 pr-3 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                <Sparkle className="size-3" />
                NEW
              </span>
              토스페이먼츠 결제 블록이 올라왔습니다
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            <h1 className="mt-7 text-[38px] font-semibold leading-[1.18] tracking-[-0.02em] sm:text-[56px] sm:leading-[1.08]">
              붙여넣으면
              <br />
              <span className="text-accent">백엔드까지</span> 따라옵니다
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-8 text-muted sm:text-[17px]">
              바이블로는 풀스택 블록 마켓플레이스입니다. shadcn이 컴포넌트를 건네주듯,
              바이블로는 UI·서버 액션·API 라우트·DB 스키마·마이그레이션을 한 번에
              당신의 저장소에 씁니다. 설치가 끝나는 순간, 그 코드는{" "}
              <span className="text-foreground">당신 것</span>입니다.
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3">
              <CopyCommand command="npx biblelo@latest init" />
              <div className="flex flex-wrap gap-3">
                <PrimaryLink href="#marketplace">
                  블록 428개 둘러보기
                  <ArrowRight className="size-4" />
                </PrimaryLink>
                <GhostLink href="#how">작동 방식 보기</GhostLink>
              </div>
            </div>

            <p className="mt-5 text-[13px] text-subtle">
              카드 등록 없이 시작 · 오픈 블록은 언제나 무료 · MIT 라이선스
            </p>
          </div>

          <div className="reveal lg:pl-4">
            <TerminalDemo />
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink-1 px-5 py-6 text-center">
              <dt className="text-[12px] text-subtle">{stat.label}</dt>
              <dd className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-[28px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
