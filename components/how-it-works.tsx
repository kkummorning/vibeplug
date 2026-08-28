import { Container, SectionHeading } from "@/components/ui";

const steps = [
  {
    index: "01",
    command: "biblelo init",
    title: "프로젝트를 읽습니다",
    body: "프레임워크, ORM, 데이터베이스, 스타일 규칙, 경로 별칭을 감지해 biblelo.json에 적어둡니다. 설정은 이 파일 하나가 전부입니다.",
  },
  {
    index: "02",
    command: "biblelo add <블록>",
    title: "당신의 컨벤션으로 옮겨 씁니다",
    body: "Drizzle을 쓰면 Drizzle 스키마로, Prisma를 쓰면 Prisma 스키마로 변환해 파일을 씁니다. 겹치는 파일은 덮어쓰지 않고 diff로 먼저 묻습니다.",
  },
  {
    index: "03",
    command: "# 다음 단계 없음",
    title: "그때부터는 당신의 코드",
    body: "런타임 SDK도, 외부 대시보드도, 계정 의존성도 없습니다. 바이블로를 지워도 기능은 그대로 돕니다. 마음껏 뜯어고치세요.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="작동 방식"
          title={
            <>
              설치 한 번이면
              <br className="hidden sm:block" /> 끝나는 관계
            </>
          }
          description="바이블로는 당신의 앱이 계속 호출해야 하는 서비스가 아닙니다. 코드를 건네주고 물러납니다."
        />

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.index} className="group bg-ink-1 p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-accent">
                  {step.index}
                </span>
                <span className="rounded-md border border-line bg-ink-2 px-2 py-1 font-mono text-[11px] text-subtle">
                  {step.command}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-center text-[13px] text-subtle">
          블록이 업데이트되면{" "}
          <code className="rounded bg-ink-2 px-1.5 py-0.5 font-mono text-[12px] text-muted">
            biblelo diff
          </code>{" "}
          가 당신이 고친 부분을 지키면서 바뀐 줄만 보여줍니다.
        </p>
      </Container>
    </section>
  );
}
