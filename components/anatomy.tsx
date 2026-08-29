import { Container, SectionHeading } from "@/components/ui";

type Layer = "UI" | "서버" | "데이터" | "설정";

const layerColor: Record<Layer, string> = {
  UI: "text-accent",
  // Was sky-400 — too close to the cerulean accent now that UI carries it.
  서버: "text-amber-600 dark:text-amber-300",
  데이터: "text-emerald-600 dark:text-emerald-400",
  설정: "text-violet-600 dark:text-violet-400",
};

const tree: { path: string; layer?: Layer; dir?: boolean }[] = [
  { path: "app/", dir: true },
  { path: "├─ (billing)/pricing/page.tsx", layer: "UI" },
  { path: "├─ (billing)/billing/page.tsx", layer: "UI" },
  { path: "└─ api/webhooks/stripe/route.ts", layer: "서버" },
  { path: "components/billing/", dir: true },
  { path: "├─ plan-card.tsx", layer: "UI" },
  { path: "└─ usage-meter.tsx", layer: "UI" },
  { path: "lib/billing/", dir: true },
  { path: "├─ actions.ts", layer: "서버" },
  { path: "├─ stripe.ts", layer: "서버" },
  { path: "└─ entitlements.ts", layer: "서버" },
  { path: "db/", dir: true },
  { path: "├─ schema/subscriptions.ts", layer: "데이터" },
  { path: "└─ migrations/0007_billing.sql", layer: "데이터" },
  { path: "biblelo.block.json", layer: "설정" },
];

const layers: { name: Layer; title: string; body: string }[] = [
  {
    name: "UI",
    title: "화면과 컴포넌트",
    body: "요금제 페이지, 결제 카드, 사용량 미터까지. 당신 프로젝트의 디자인 토큰을 그대로 씁니다. shadcn/ui를 쓰고 있다면 기존 컴포넌트를 재사용합니다.",
  },
  {
    name: "서버",
    title: "서버 액션과 라우트",
    body: "서버 액션, API 라우트, 웹훅 핸들러, 입력 검증 스키마. 멱등 처리와 에러 경계까지 포함된 상태로 들어옵니다.",
  },
  {
    name: "데이터",
    title: "스키마와 마이그레이션",
    body: "필요한 테이블과 인덱스, 되돌릴 수 있는 마이그레이션. 기존 테이블은 건드리지 않고, 이름이 겹치면 접두사를 물어봅니다.",
  },
  {
    name: "설정",
    title: "환경 변수와 의존성",
    body: "필요한 키 목록이 .env.example에 추가되고, 패키지는 당신이 쓰는 패키지 매니저로 설치됩니다. 테스트와 시드 데이터도 함께 옵니다.",
  },
];

export function Anatomy() {
  return (
    <section id="anatomy" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="블록 구조"
          title="블록 하나가 곧 기능 하나입니다"
          description="npx biblelo add billing-stripe 를 실행하면 저장소에 실제로 무엇이 생기는지 전부 보여드립니다."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
          <div className="reveal overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border bg-surface-muted/70 px-5 py-3">
              <span className="font-mono text-[12px] text-muted-foreground">
                billing-stripe
              </span>
              <span className="font-mono text-[11px] text-tertiary">31 files</span>
            </div>
            <ul className="space-y-1.5 p-5 font-mono text-[12px] leading-6">
              {tree.map((row) => (
                <li key={row.path} className="flex items-baseline gap-3">
                  <span
                    className={row.dir ? "text-foreground/70" : "text-muted-foreground"}
                  >
                    {row.path}
                  </span>
                  {row.layer && (
                    <span
                      className={`ml-auto shrink-0 text-[10px] ${layerColor[row.layer]}`}
                    >
                      {row.layer}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-5 py-4 font-mono text-[11px] text-tertiary">
              + tests/billing/*.test.ts · + seed/plans.ts
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
            {layers.map((layer) => (
              <li key={layer.name} className="bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.14em] ${layerColor[layer.name]}`}
                  >
                    {layer.name}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-3 text-[16px] font-semibold tracking-tight">
                  {layer.title}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{layer.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
