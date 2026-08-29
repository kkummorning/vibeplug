import type { Metadata } from "next";
import featuresData from "@/app/data/features.json";
import { BlockCard } from "@/components/block-card";

export const metadata: Metadata = {
  title: "기능 목록",
  description: "판매 중인 기능을 둘러보는 화면입니다.",
};

type Feature = {
  name: string;
  description: string;
  category: string;
  price: number;
};

const features: Feature[] = featuresData;

// 데이터의 price는 숫자(9000)라 표시용 문자열로만 바꾼다.
// 랜딩 블록 카드가 쓰는 "₩39,000" 표기와 같은 형식.
const priceFormat = new Intl.NumberFormat("ko-KR");

// 목록만 그리는 정적 화면이다. 상세·결제는 아직 붙이지 않았으므로
// 카드에 href를 넘기지 않는다(넘기면 카드 전체가 링크가 된다).
export default function FeaturesPage() {
  return (
    <section className="py-section-lg">
      {/* --layout-max-width-lg(1200px) — 카드 3열이 들어가는 본문 기준 폭 */}
      <div className="mx-auto w-full max-w-layout-lg px-grid-gutter-x">
        <header className="flex flex-col gap-text-sm">
          <h1 className="text-title-1">기능 목록</h1>
          <p className="text-body-md text-muted-foreground">
            지금 판매 중인 기능을 둘러볼 수 있습니다.
          </p>
        </header>

        <div className="mt-section-md grid gap-grid-gutter-x sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <BlockCard
              key={feature.name}
              block={{
                name: feature.name,
                summary: feature.description,
                category: feature.category,
                price: `₩${priceFormat.format(feature.price)}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
