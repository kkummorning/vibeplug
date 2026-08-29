"use client";

import { useState } from "react";

// 입력창·선택창 공통 모양. 높이는 토큰 padding으로만 잡는다(고정 높이 토큰은 없음).
const fieldClass =
  "rounded-lg border border-border bg-surface px-grid-gutter-x py-field-sm text-body-md text-foreground transition-colors placeholder:text-tertiary hover:border-input focus:border-input";

type Status = { ok: boolean; message: string };

type Props = {
  /** 카테고리 선택지. 어떤 목록을 쓸지는 이 폼을 그리는 화면이 정한다. */
  categories: string[];
};

/**
 * 새 기능 등록 폼.
 *
 * 저장은 app/api/features의 POST로만 한다 — 이 파일은 Supabase를 직접 열지 않는다.
 * 입력칸은 값을 state로 붙들지 않고(비제어) 제출 시점에 FormData로 한 번에 읽는다.
 * 그래서 성공 후 비우는 것도 form.reset() 한 줄이면 된다.
 */
export function FeatureForm({ categories }: Props) {
  const [status, setStatus] = useState<Status | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    // 이벤트 객체는 await를 넘기면 React가 회수해 currentTarget이 비므로 먼저 붙잡아 둔다.
    const form = event.currentTarget;
    const fields = new FormData(form);

    setSaving(true);
    setStatus(null);

    try {
      const response = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          description: fields.get("description"),
          category: fields.get("category"),
          price: fields.get("price"),
        }),
      });

      if (!response.ok) {
        // 실패 사유는 서버가 알려준 문구로 로그에 남기고, 화면에는 고정 안내만 띄운다.
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? `등록 응답이 ${response.status}입니다.`);
      }

      form.reset();
      setStatus({ ok: true, message: "등록되었습니다." });
    } catch (error) {
      console.error("[mypage/features] 등록 실패:", error);
      setStatus({
        ok: false,
        message: "등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="mt-field-md" onSubmit={handleSubmit}>
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
        type="submit"
        disabled={saving}
        className="mt-field-lg rounded-lg bg-primary px-grid-gutter-x py-field-sm text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
      >
        등록하기
      </button>

      {/* 결과 안내. 읽어주는 순서가 밀리지 않도록 자리는 늘 두고 문구만 갈아끼운다 —
          비어 있는 동안에는 높이도 여백도 0이라 폼 모양은 그대로다. */}
      <p
        role="status"
        aria-live="polite"
        className={`text-body-md ${
          status
            ? `mt-field-md ${status.ok ? "text-success" : "text-destructive"}`
            : ""
        }`}
      >
        {status?.message}
      </p>
    </form>
  );
}
