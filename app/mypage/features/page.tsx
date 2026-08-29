import type { Metadata } from "next";
import featuresData from "@/app/data/features.json";

export const metadata: Metadata = {
  title: "기능 관리",
  description: "등록한 기능을 관리하는 화면입니다.",
};

// 선택지는 기능 데이터에 실제로 쓰인 카테고리에서 뽑는다(중복 제거, 등장 순서 유지).
// 목록을 따로 적어두면 데이터와 어긋날 수 있어서 여기서 파생시킨다.
const categories = [...new Set(featuresData.map((feature) => feature.category))];

// 입력창·선택창 공통 모양. 높이는 토큰 padding으로만 잡는다(고정 높이 토큰은 없음).
const fieldClass =
  "rounded-lg border border-border bg-surface px-grid-gutter-x py-field-sm text-body-md text-foreground transition-colors placeholder:text-tertiary hover:border-input focus:border-input";

// 화면 뼈대만 있는 정적 페이지다. 등록 버튼은 아직 아무 동작도 하지 않으므로
// type="submit"이 아니라 type="button"이다 — 누르면 폼이 전송되지 않는다.
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

        <form className="mt-field-md">
          <div className="flex flex-col gap-field-md">
            <div className="flex flex-col gap-field-sm">
              <label htmlFor="feature-name" className="text-label-md">
                기능 이름
              </label>
              <input
                id="feature-name"
                name="name"
                type="text"
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-field-sm">
              <label htmlFor="feature-description" className="text-label-md">
                한 줄 설명
              </label>
              <input
                id="feature-description"
                name="description"
                type="text"
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-field-sm">
              <label htmlFor="feature-category" className="text-label-md">
                카테고리
              </label>
              <select
                id="feature-category"
                name="category"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  선택하세요
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-field-sm">
              <label htmlFor="feature-price" className="text-label-md">
                가격
              </label>
              <input
                id="feature-price"
                name="price"
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                required
                aria-describedby="feature-price-hint"
                className={fieldClass}
              />
              <p id="feature-price-hint" className="text-caption text-tertiary">
                원 단위 숫자만 입력합니다.
              </p>
            </div>
          </div>

          {/* --gap-field-lg(30px) — 폼 영역과 제출 버튼 사이 */}
          <button
            type="button"
            className="mt-field-lg rounded-lg bg-primary px-grid-gutter-x py-field-sm text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
          >
            등록하기
          </button>
        </form>
      </section>
    </>
  );
}
