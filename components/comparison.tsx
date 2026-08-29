import { Container, SectionHeading } from "@/components/ui";

const rows: [string, string, string, string][] = [
  ["첫 배포까지", "4분", "반나절", "2~6주"],
  ["코드 소유권", "내 저장소", "벤더", "내 저장소"],
  ["커스터마이징", "무제한 — 그냥 코드", "설정값이 허락하는 만큼", "무제한"],
  ["데이터가 사는 곳", "내 데이터베이스", "벤더 인프라", "내 데이터베이스"],
  ["비용 구조", "블록당 1회 구매", "MAU 비례 종량", "인건비"],
  ["벤더가 문 닫으면", "아무 일도 없음", "마이그레이션", "해당 없음"],
  ["보안 감사", "소스 전체 열람", "문서와 신뢰", "소스 전체 열람"],
];

export function Comparison() {
  return (
    <section className="border-t border-border bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="비교"
          title="빌려 쓰는 대신, 가져다 씁니다"
          description="SaaS의 속도와 직접 구현의 자유를 동시에 가져가는 것이 바이블로의 전부입니다."
        />

        <div className="mt-14 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">
              바이블로, 매니지드 SaaS, 직접 구현 비교표
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-6 py-5 text-[13px] font-normal text-tertiary">
                  기준
                </th>
                <th
                  scope="col"
                  className="bg-accent/[0.07] px-6 py-5 text-[14px] font-semibold text-accent"
                >
                  바이블로
                </th>
                <th scope="col" className="px-6 py-5 text-[14px] font-medium text-muted-foreground">
                  매니지드 SaaS
                </th>
                <th scope="col" className="px-6 py-5 text-[14px] font-medium text-muted-foreground">
                  직접 구현
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, biblelo, saas, diy]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <th
                    scope="row"
                    className="px-6 py-4 text-[13px] font-normal text-tertiary"
                  >
                    {label}
                  </th>
                  <td className="bg-accent/[0.07] px-6 py-4 text-[14px] font-medium text-foreground">
                    {biblelo}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-muted-foreground">{saas}</td>
                  <td className="px-6 py-4 text-[14px] text-muted-foreground">{diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
