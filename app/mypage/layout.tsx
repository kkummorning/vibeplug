import { MypageNav } from "@/components/mypage-nav";

// /mypage 아래 모든 화면이 공유하는 껍데기다. 바깥 여백·본문 폭·사이드 메뉴가
// 여기 한 곳에만 있고, 각 page.tsx는 본문만 채운다.
export default function MypageLayout({ children }: LayoutProps<"/mypage">) {
  return (
    <section className="py-section-lg">
      {/* --layout-max-width-lg(1200px) — 사이드바를 포함하는 본문 기준 폭 */}
      <div className="mx-auto w-full max-w-layout-lg px-grid-gutter-x">
        <div className="flex flex-col gap-section-md lg:flex-row">
          <MypageNav />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
