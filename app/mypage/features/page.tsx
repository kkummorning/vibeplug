import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기능 관리",
  description: "등록한 기능을 관리하는 화면입니다.",
};

// 화면 뼈대만 있는 정적 페이지다. 기능 목록 조회·수정은 아직 붙이지 않았다.
export default function FeaturesPage() {
  return (
    <header className="flex flex-col gap-text-sm">
      <h1 className="text-title-1">기능 관리</h1>
      <p className="text-body-md text-muted-foreground">
        등록한 기능의 상태를 확인하고 정보를 수정하거나 내릴 수 있습니다.
      </p>
    </header>
  );
}
