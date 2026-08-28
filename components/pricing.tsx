import { Check } from "@/components/icons";
import { Container, SectionHeading } from "@/components/ui";

const plans = [
  {
    name: "오픈",
    price: "₩0",
    unit: "영원히",
    tagline: "혼자, 혹은 사이드 프로젝트로",
    features: [
      "오픈 블록 전부 설치",
      "프로젝트 수 제한 없음",
      "CLI · diff 업데이트",
      "커뮤니티 지원",
    ],
    cta: "그냥 시작하기",
    highlighted: false,
  },
  {
    name: "프로",
    price: "₩29,000",
    unit: "월 · 1인",
    tagline: "제품을 실제로 파는 팀",
    features: [
      "프리미엄 블록 전부 포함",
      "개별 구매 없이 무제한 설치",
      "블록 업데이트 평생 수신",
      "우선 지원 · 48시간 내 답변",
      "상용 프로젝트 무제한",
    ],
    cta: "14일 무료로 써보기",
    highlighted: true,
  },
  {
    name: "팀",
    price: "₩89,000",
    unit: "월 · 좌석 10인",
    tagline: "사내 표준을 만드는 조직",
    features: [
      "프로의 모든 것",
      "프라이빗 레지스트리",
      "사내 블록 배포 · 버전 관리",
      "SSO · 감사 로그",
      "좌석 추가 ₩8,000",
    ],
    cta: "팀으로 시작하기",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-line bg-ink-1/40 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="요금제"
          title="코드를 사는 것이지, 자리를 빌리는 게 아닙니다"
          description="구독을 끊어도 이미 설치한 블록은 계속 당신 저장소에서 돕니다. 사라지는 건 새 블록과 업데이트뿐입니다."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
                plan.highlighted
                  ? "border-accent-tint/40 bg-ink-1 shadow-[0_0_0_1px_rgba(113,152,244,0.14),0_30px_70px_-45px_rgba(42,82,190,0.9)]"
                  : "border-line bg-ink-1"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-fg">
                  가장 많이 고릅니다
                </span>
              )}

              <h3 className="text-[15px] font-semibold">{plan.name}</h3>
              <p className="mt-1 text-[13px] text-subtle">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-[34px] font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-[13px] text-subtle">{plan.unit}</span>
              </div>

              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[14px] leading-6">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        plan.highlighted ? "text-accent-tint" : "text-subtle"
                      }`}
                    />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-8 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-accent text-accent-fg hover:opacity-90"
                    : "border border-line bg-ink-2 text-foreground hover:border-line-strong hover:bg-ink-3"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-line bg-ink-1 px-7 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-[15px] font-semibold">엔터프라이즈</h3>
            <p className="mt-1 text-[14px] leading-7 text-muted">
              온프레미스 레지스트리, 보안 심사 자료, 계약서 검토, 전담 채널과 SLA.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 rounded-xl border border-line bg-ink-2 px-5 py-2.5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-ink-3 sm:ml-auto"
          >
            도입 문의
          </a>
        </div>

        <p className="mt-6 text-center text-[13px] text-subtle">
          구독이 부담스럽다면 블록 하나만 개별 구매해도 됩니다. 한 번 사면 그
          버전은 영구 사용입니다.
        </p>
      </Container>
    </section>
  );
}
