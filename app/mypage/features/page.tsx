import type { Metadata } from "next";
import featuresData from "@/app/data/features.json";
import { FeatureForm } from "@/components/feature-form";

export const metadata: Metadata = {
  title: "기능 관리",
  description: "등록한 기능을 관리하는 화면입니다.",
};

// 선택지는 기능 데이터에 실제로 쓰인 카테고리에서 뽑는다(중복 제거, 등장 순서 유지).
// 목록을 따로 적어두면 데이터와 어긋날 수 있어서 여기서 파생시킨다.
const categories = [...new Set(featuresData.map((feature) => feature.category))];

// 폼만 클라이언트 컴포넌트로 떼어냈다. 이 페이지는 서버 컴포넌트로 남아
// metadata를 내보내고, features.json도 클라이언트 번들에 실리지 않는다.
export default function FeaturesPage() {
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
    </>
  );
}
