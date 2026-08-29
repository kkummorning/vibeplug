import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "등록한 기능을 확인하고 관리하는 판매자 페이지입니다.",
};

// 지금은 화면 뼈대만 있는 정적 페이지다. 데이터 조회·인증은 아직 붙이지 않았고,
// 아래 빈 영역이 나중에 등록한 기능 목록이 들어갈 자리다.
// 바깥 여백·본문 폭·사이드 메뉴는 app/mypage/layout.tsx가 갖고 있다.
export default function MyPage() {
  return (
    <>
      <header className="flex flex-col gap-text-sm">
        <h1 className="text-title-1">마이페이지</h1>
        <p className="text-body-md text-muted-foreground">
          내가 등록한 기능을 한곳에서 확인하고 관리할 수 있습니다.
        </p>
      </header>

      <div className="mt-section-md rounded-2xl border border-dashed border-border bg-surface px-grid-gutter-x py-section-lg text-center">
        <p className="text-body-sm text-tertiary">등록한 기능이 여기에 표시됩니다</p>
      </div>
    </>
  );
}
