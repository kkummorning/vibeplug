import type { ReactNode } from "react";
import { CopyCommand } from "@/components/copy-command";
import { Check } from "@/components/icons";
import { Container, Eyebrow, PrimaryLink } from "@/components/ui";

const points = [
  {
    title: "판매액의 80%가 퍼블리셔 몫",
    body: "매월 15일 정산합니다. 무료 블록도 후원과 유지보수 계약으로 수익을 만들 수 있습니다.",
  },
  {
    title: "심사와 서명은 저희가",
    body: "모든 블록은 정적 분석, 의존성 검사, 사람 리뷰를 거쳐 서명된 뒤 레지스트리에 올라갑니다.",
  },
  {
    title: "사내 전용 레지스트리도",
    body: "공개하지 않고 팀 안에서만 쓰는 프라이빗 레지스트리를 같은 CLI로 운영할 수 있습니다.",
  },
];

/** Hand-rolled token colours for the manifest sample: key, string, number. */
const K = ({ children }: { children: ReactNode }) => (
  <span className="text-accent">{children}</span>
);
const S = ({ children }: { children: ReactNode }) => (
  <span className="text-emerald-600/85 dark:text-emerald-400/85">{children}</span>
);
const N = ({ children }: { children: ReactNode }) => (
  <span className="text-amber-600/85 dark:text-amber-300/85">{children}</span>
);

export function Publisher() {
  return (
    <section id="publish" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>퍼블리셔</Eyebrow>
            <h2 className="mt-4 text-[26px] font-semibold leading-[1.3] tracking-tight sm:text-4xl sm:leading-[1.2]">
              당신이 이미 세 번쯤
              <br />
              다시 짠 그 기능
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-8 text-muted-foreground">
              프로젝트를 새로 시작할 때마다 옮겨 붙이는 코드가 있다면, 그건 이미
              블록입니다. 매니페스트 하나만 얹어서 올리면 됩니다.
            </p>

            <ul className="mt-10 space-y-6">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <Check className="size-3.5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium">{point.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-7 text-muted-foreground">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryLink href="#">퍼블리셔 신청하기</PrimaryLink>
              <CopyCommand command="npx biblelo publish" size="sm" />
            </div>
          </div>

          <div className="reveal overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border bg-surface-muted/70 px-5 py-3">
              <span className="font-mono text-[12px] text-muted-foreground">
                biblelo.block.json
              </span>
              <span className="rounded border border-emerald-600/30 dark:border-emerald-400/30 px-1.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                검증됨
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.9] text-muted-foreground sm:text-[12.5px]">
              {"{"}
              {"\n  "}
              <K>&quot;name&quot;</K>: <S>&quot;billing-toss&quot;</S>,{"\n  "}
              <K>&quot;version&quot;</K>: <S>&quot;2.1.0&quot;</S>,{"\n  "}
              <K>&quot;category&quot;</K>: <S>&quot;결제&quot;</S>,{"\n  "}
              <K>&quot;requires&quot;</K>: {"{"}
              {"\n    "}
              <K>&quot;orm&quot;</K>: [<S>&quot;drizzle&quot;</S>,{" "}
              <S>&quot;prisma&quot;</S>],{"\n    "}
              <K>&quot;db&quot;</K>: [<S>&quot;postgres&quot;</S>]{"\n  "}
              {"},"}
              {"\n  "}
              <K>&quot;env&quot;</K>: [<S>&quot;TOSS_SECRET_KEY&quot;</S>,{" "}
              <S>&quot;TOSS_CLIENT_KEY&quot;</S>],{"\n  "}
              <K>&quot;files&quot;</K>: [{"\n    "}
              {"{ "}
              <K>&quot;from&quot;</K>: <S>&quot;src/pricing.tsx&quot;</S>,{" "}
              <K>&quot;to&quot;</K>: <S>&quot;{"{{app}}"}/pricing/page.tsx&quot;</S>
              {" }"},{"\n    "}
              {"{ "}
              <K>&quot;from&quot;</K>: <S>&quot;src/schema.ts&quot;</S>,{" "}
              <K>&quot;to&quot;</K>: <S>&quot;{"{{db}}"}/schema/payments.ts&quot;</S>
              {" }"}
              {"\n  "}],{"\n  "}
              <K>&quot;price&quot;</K>: {"{ "}
              <K>&quot;krw&quot;</K>: <N>59000</N>, <K>&quot;license&quot;</K>:{" "}
              <S>&quot;per-project&quot;</S>
              {" }"}
              {"\n}"}
            </pre>
            <dl className="grid grid-cols-3 gap-px border-t border-border bg-border">
              {[
                { label: "수익 배분", value: "80%" },
                { label: "평균 블록가", value: "₩45,000" },
                { label: "상위 월수익", value: "₩820만" },
              ].map((item) => (
                <div key={item.label} className="bg-surface px-4 py-5 text-center">
                  <dt className="text-[11px] text-tertiary">{item.label}</dt>
                  <dd className="mt-1 text-[17px] font-semibold tracking-tight">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
