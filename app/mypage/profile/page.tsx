import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 정보",
  description: "판매자 계정 정보를 확인하는 화면입니다.",
};

// 화면 뼈대만 있는 정적 페이지다. 계정 데이터 조회·수정은 아직 붙이지 않았다.
export default function ProfilePage() {
  return (
    <header className="flex flex-col gap-text-sm">
      <h1 className="text-title-1">내 정보</h1>
      <p className="text-body-md text-muted-foreground">
        판매자 계정 정보와 연락처를 확인하고 수정할 수 있습니다.
      </p>
    </header>
  );
}
