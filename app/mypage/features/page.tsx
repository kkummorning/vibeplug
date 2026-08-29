import type { Metadata } from "next";
import { FeatureForm } from "@/components/feature-form";
import { FeatureList } from "@/components/feature-list";
import type { Feature } from "@/lib/features";
import { fetchFeatures } from "@/lib/features-server";

export const metadata: Metadata = {
  title: "기능 관리",
  description: "등록한 기능을 관리하는 화면입니다.",
};

// 폼과 목록만 클라이언트 컴포넌트로 떼어냈다. 이 페이지는 서버 컴포넌트로 남아
// metadata를 내보낸다.
export default async function FeaturesPage() {
  let features: Feature[] = [];
  let failed = false;

  try {
    features = await fetchFeatures();
  } catch (error) {
    // 목록을 못 받아도 등록 폼은 뜨게 두고, 목록 자리에 안내만 대신 그린다.
    console.error("[mypage/features] 목록 조회 실패:", error);
    failed = true;
  }

  // 카테고리 선택지는 features 테이블에 실제로 쓰이고 있는 값에서만 뽑는다(중복 제거).
  // 목록을 따로 적어두면 데이터와 어긋나기 때문이다. 대신 등록된 기능이 하나도 없으면
  // 고를 값도 없어진다 — 그때는 폼이 그 사정을 안내한다(components/feature-form.tsx).
  // 목록은 최신순이라 그대로 쓰면 기능이 늘고 줄 때마다 선택지 순서가 흔들려서,
  // 선택칸에서는 가나다순으로 세운다.
  const categories = [...new Set(features.map((feature) => feature.category))].sort(
    (a, b) => a.localeCompare(b, "ko")
  );

  return (
    <>
      <header className="flex flex-col gap-text-sm">
        <h1 className="text-title-1">기능 관리</h1>
        <p className="text-body-md text-muted-foreground">
          등록한 기능의 상태를 확인하고 정보를 수정하거나 내릴 수 있습니다.
        </p>
      </header>

      <section className="mt-section-md max-w-layout-md rounded-2xl border border-border bg-surface p-field-md">
        <h2 className="text-title-3">새 기능 등록</h2>

        <FeatureForm categories={categories} />
      </section>

      <section className="mt-section-md max-w-layout-md">
        <h2 className="text-title-3">등록된 기능</h2>

        {failed ? (
          <p className="mt-field-md text-body-md text-muted-foreground">
            기능 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        ) : (
          <FeatureList features={features} categories={categories} />
        )}
      </section>
    </>
  );
}
