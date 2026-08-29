"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fieldClass,
  primaryButtonClass,
  subtleButtonClass,
} from "@/components/control-styles";
import type { Feature } from "@/lib/features";

type Status = { ok: boolean; message: string };

type Props = {
  /** 카테고리 선택지. 어떤 목록을 쓸지는 이 폼을 그리는 화면이 정한다. */
  categories: string[];
  /** 넘기면 수정 모드 — 이 기능의 값으로 칸을 채우고 PUT으로 저장한다. 없으면 등록 모드. */
  feature?: Feature;
  /** 수정 모드에서 저장이 끝났을 때. 편집칸을 닫고 결과를 알리는 건 목록의 몫이다. */
  onSaved?: () => void;
  /** 수정 모드에서 취소를 눌렀을 때. */
  onCancel?: () => void;
};

/**
 * 기능 등록·수정 폼.
 *
 * 등록과 수정은 받는 항목이 같아서 한 컴포넌트가 겸한다 — feature를 넘기면 수정,
 * 안 넘기면 등록이다. 저장은 app/api/features(등록)와 app/api/features/[id](수정)로만
 * 한다 — 이 파일은 Supabase를 직접 열지 않는다.
 *
 * 입력칸은 값을 state로 붙들지 않고(비제어) 제출 시점에 FormData로 한 번에 읽는다.
 * 그래서 등록 후 비우는 것도 form.reset() 한 줄이면 되고, 수정 모드에서는
 * defaultValue만 채워 주면 된다.
 */
export function FeatureForm({ categories, feature, onSaved, onCancel }: Props) {
  const router = useRouter();
  // 등록 폼과 수정 폼이 한 화면에 같이 뜬다. id가 겹치면 label이 엉뚱한 칸을
  // 가리키므로, 폼마다 다른 앞자리를 받아 붙인다.
  const uid = useId();
  const [status, setStatus] = useState<Status | null>(null);
  const [saving, setSaving] = useState(false);

  const editing = feature !== undefined;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    // 이벤트 객체는 await를 넘기면 React가 회수해 currentTarget이 비므로 먼저 붙잡아 둔다.
    const form = event.currentTarget;
    const fields = new FormData(form);

    setSaving(true);
    setStatus(null);

    try {
      const response = await fetch(
        editing ? `/api/features/${feature.id}` : "/api/features",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fields.get("name"),
            description: fields.get("description"),
            category: fields.get("category"),
            price: fields.get("price"),
          }),
        }
      );

      if (!response.ok) {
        // 실패 사유는 서버가 알려준 문구로 로그에 남기고, 화면에는 고정 안내만 띄운다.
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? `저장 응답이 ${response.status}입니다.`);
      }

      // 목록은 서버가 다시 읽어 내려준다 — 방금 저장한 값이 아래 목록에 그대로 반영된다.
      router.refresh();

      if (editing) {
        // 편집칸을 닫는 것도, 결과를 알리는 것도 목록이 한다(이 폼은 곧 사라진다).
        onSaved?.();
        return;
      }

      form.reset();
      setStatus({ ok: true, message: "등록되었습니다." });
    } catch (error) {
      console.error(
        `[mypage/features] ${editing ? "수정" : "등록"} 실패:`,
        error
      );
      setStatus({
        ok: false,
        message: editing
          ? "수정하지 못했습니다. 잠시 후 다시 시도해 주세요."
          : "등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="mt-field-md" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-field-md">
        <div className="flex flex-col gap-field-sm">
          <label htmlFor={`${uid}-name`} className="text-label-md">
            기능 이름
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            defaultValue={feature?.name}
            // 수정은 목록의 버튼을 눌러 열린다 — 눌린 버튼이 사라지므로 첫 칸이 초점을 받는다.
            autoFocus={editing}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-field-sm">
          <label htmlFor={`${uid}-description`} className="text-label-md">
            한 줄 설명
          </label>
          <input
            id={`${uid}-description`}
            name="description"
            type="text"
            required
            defaultValue={feature?.description}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-field-sm">
          <label htmlFor={`${uid}-category`} className="text-label-md">
            카테고리
          </label>
          <select
            id={`${uid}-category`}
            name="category"
            required
            defaultValue={feature?.category ?? ""}
            aria-describedby={
              categories.length === 0 ? `${uid}-category-hint` : undefined
            }
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

          {/* 선택지는 features 테이블에 쓰이고 있는 값에서만 나온다. 기능이 하나도 없으면
              고를 값도 없어지는데, 빈 선택칸만 두면 고장으로 보여서 사정을 적어 둔다. */}
          {categories.length === 0 && (
            <p id={`${uid}-category-hint`} className="text-caption text-tertiary">
              등록된 기능이 없어 고를 카테고리가 없습니다.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-field-sm">
          <label htmlFor={`${uid}-price`} className="text-label-md">
            가격
          </label>
          <input
            id={`${uid}-price`}
            name="price"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            required
            defaultValue={feature?.price}
            aria-describedby={`${uid}-price-hint`}
            className={fieldClass}
          />
          <p id={`${uid}-price-hint`} className="text-caption text-tertiary">
            원 단위 숫자만 입력합니다.
          </p>
        </div>
      </div>

      {/* --gap-field-lg(30px) — 폼 영역과 제출 버튼 사이 */}
      <div className="mt-field-lg flex flex-wrap gap-inline-lg">
        <button type="submit" disabled={saving} className={primaryButtonClass}>
          {editing ? "저장하기" : "등록하기"}
        </button>

        {editing && (
          <button
            type="button"
            disabled={saving}
            onClick={onCancel}
            className={subtleButtonClass}
          >
            취소
          </button>
        )}
      </div>

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
