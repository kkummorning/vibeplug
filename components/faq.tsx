import { ChevronDown } from "@/components/icons";
import { Container, SectionHeading } from "@/components/ui";

const faqs = [
  {
    q: "shadcn이랑 뭐가 다른가요?",
    a: "shadcn/ui는 UI 컴포넌트를 복사해 줍니다. 바이블로는 같은 방식으로 기능 하나를 통째로 복사합니다. 화면뿐 아니라 그 화면을 돌게 하는 서버 액션, API 라우트, 테이블 스키마까지요. 이미 shadcn/ui를 쓰고 있다면 블록이 그 컴포넌트를 그대로 재사용합니다.",
  },
  {
    q: "코드를 고치면 업데이트를 못 받나요?",
    a: "받습니다. biblelo diff가 설치 당시 원본, 최신 버전, 현재 파일을 3-way로 비교해 당신이 고친 부분은 남기고 달라진 줄만 제안합니다. 적용할지는 매번 당신이 정합니다.",
  },
  {
    q: "제 스택에서도 되나요?",
    a: "Next.js · Remix · SvelteKit · Nuxt, Drizzle · Prisma, Postgres · MySQL · SQLite 조합을 지원합니다. biblelo init이 감지한 조합에서 실제로 도는 블록만 목록에 보여주기 때문에, 설치하고 나서 안 맞는 일은 없습니다.",
  },
  {
    q: "남이 쓴 코드를 믿고 설치해도 되나요?",
    a: "설치 전에 전체 소스를 열람할 수 있습니다. 모든 블록은 정적 분석, 의존성 취약점 검사, 사람 리뷰를 거친 뒤 서명되고, CLI는 설치 시점에 서명을 검증합니다. 네트워크 호출이 있는 블록은 목록에 표시됩니다.",
  },
  {
    q: "라이선스는 어떻게 되나요?",
    a: "오픈 블록은 MIT입니다. 유료 블록은 프로젝트 단위 상용 라이선스이며, 상업적 사용과 수정은 자유롭고 블록 자체의 재배포·재판매만 금지됩니다.",
  },
  {
    q: "나중에 바이블로를 걷어내도 되나요?",
    a: "됩니다. CLI와 biblelo.json을 지우면 평범한 코드만 남습니다. 런타임에 바이블로를 호출하는 부분은 애초에 없기 때문에 앱은 아무 일도 없었다는 듯 계속 돕니다.",
  },
];

export function Faq() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="FAQ" title="자주 묻는 것들" />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-secondary-800">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 text-[15px] font-medium transition-colors hover:bg-neutral-950/60 sm:px-7">
                {faq.q}
                <ChevronDown className="ml-auto size-4 shrink-0 text-tertiary transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 pr-12 text-[14px] leading-7 text-muted-foreground sm:px-7">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-tertiary">
          더 궁금한 게 있다면{" "}
          <a href="#" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
            디스코드
          </a>
          에서 물어보세요. 보통 하루 안에 답이 붙습니다.
        </p>
      </Container>
    </section>
  );
}
