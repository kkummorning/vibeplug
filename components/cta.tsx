import { CopyCommand } from "@/components/copy-command";
import { ArrowRight } from "@/components/icons";
import { Container, GhostLink, PrimaryLink } from "@/components/ui";

export function Cta() {
  return (
    <section className="pb-28 pt-4">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-1 px-6 py-20 text-center sm:px-16">
          <div
            aria-hidden
            className="bg-dots mask-top pointer-events-none absolute inset-0 opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,194,71,0.16),transparent_62%)] blur-3xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <span className="relative flex size-2">
              <span className="animate-pulse-ring absolute inline-flex size-2 rounded-full bg-accent" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>

            <h2 className="mt-8 text-[30px] font-semibold leading-[1.25] tracking-tight sm:text-[44px] sm:leading-[1.15]">
              다음 스프린트로 미뤄둔 그 티켓,
              <br className="hidden sm:block" /> 오늘 저녁에 닫아버리세요
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-8 text-muted">
              인증, 결제, 알림, 관리자 화면. 팀이 몇 주씩 잡아먹던 일들이 이미
              레지스트리에 올라와 있습니다.
            </p>

            <div className="mt-9 w-full max-w-sm">
              <CopyCommand command="npx biblelo@latest init" className="w-full" />
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <PrimaryLink href="#marketplace">
                마켓플레이스 둘러보기
                <ArrowRight className="size-4" />
              </PrimaryLink>
              <GhostLink href="#">문서 읽기</GhostLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
