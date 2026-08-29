"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dangerButtonClass, subtleButtonClass } from "@/components/control-styles";
import { FeatureForm } from "@/components/feature-form";
import type { Feature } from "@/lib/features";

// price는 숫자(9000)라 표시용 문자열로만 바꾼다. /features 카드와 같은 "₩39,000" 표기.
const priceFormat = new Intl.NumberFormat("ko-KR");

type Status = { ok: boolean; message: string };

type Props = {
  /** 서버가 읽어 온 전체 목록. 수정·삭제 뒤에는 router.refresh()로 다시 내려온다. */
  features: Feature[];
  /** 수정 폼에 넘길 카테고리 선택지 — 등록 폼과 같은 목록을 쓴다. */
  categories: string[];
};

/**
 * 등록된 기능 목록.
 *
 * 수정은 등록과 같은 폼(FeatureForm)을 그 자리에 펼쳐서 하고, 삭제는 버튼 자리를
 * 확인 문구로 바꿔 한 번 더 물어본 다음에 지운다.
 * 요청은 app/api/features/[id]로만 보낸다 — 이 파일도 Supabase를 직접 열지 않는다.
 */
export function FeatureList({ features, categories }: Props) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  // 편집칸과 삭제 확인은 한 번에 하나만 열어 둔다 — 어느 줄을 만지는 중인지 흐려지지 않게.
  function startEditing(id: number) {
    setEditingId(id);
    setConfirmingId(null);
    setStatus(null);
  }

  function askDelete(id: number) {
    setConfirmingId(id);
    setEditingId(null);
    setStatus(null);
  }

  async function handleDelete(id: number) {
    if (deletingId !== null) return;

    setDeletingId(id);
    setStatus(null);

    try {
      const response = await fetch(`/api/features/${id}`, { method: "DELETE" });

      if (!response.ok) {
        // 실패 사유는 서버가 알려준 문구로 로그에 남기고, 화면에는 고정 안내만 띄운다.
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? `삭제 응답이 ${response.status}입니다.`);
      }

      setConfirmingId(null);
      // 지운 줄이 빠진 목록을 서버에서 다시 받아온다.
      router.refresh();
      setStatus({ ok: true, message: "삭제되었습니다." });
    } catch (error) {
      console.error("[mypage/features] 삭제 실패:", error);
      setStatus({
        ok: false,
        message: "삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-field-md">
      {features.length === 0 ? (
        <p className="text-body-md text-muted-foreground">
          아직 등록된 기능이 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-field-md">
          {features.map((feature) => (
            <li
              key={feature.id}
              className="rounded-2xl border border-border bg-surface p-field-md"
            >
              {editingId === feature.id ? (
                <>
                  <h3 className="text-title-3">기능 수정</h3>
                  <FeatureForm
                    categories={categories}
                    feature={feature}
                    onSaved={() => {
                      setEditingId(null);
                      setStatus({ ok: true, message: "수정되었습니다." });
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-inline-md">
                    <span className="rounded-md border border-border bg-surface-muted px-field-sm py-inline-md text-caption text-muted-foreground">
                      {feature.category}
                    </span>
                    <span className="ml-auto text-label-lg">
                      ₩{priceFormat.format(feature.price)}
                    </span>
                  </div>

                  <h3 className="mt-text-lg text-body-lg">{feature.name}</h3>
                  <p className="mt-text-sm text-body-md text-muted-foreground">
                    {feature.description}
                  </p>

                  {confirmingId === feature.id ? (
                    /* 삭제는 되돌릴 수 없다 — 버튼 자리를 한 번 더 묻는 자리로 바꾼다. */
                    <div className="mt-field-md flex flex-wrap items-center gap-inline-lg">
                      <p className="text-body-md">
                        <strong className="font-medium">{feature.name}</strong>
                        을(를) 삭제할까요? 되돌릴 수 없습니다.
                      </p>
                      <button
                        type="button"
                        disabled={deletingId !== null}
                        onClick={() => handleDelete(feature.id)}
                        // 눌렀던 삭제 버튼이 사라지므로, 확인 버튼이 초점을 이어받는다.
                        autoFocus
                        className={dangerButtonClass}
                      >
                        삭제합니다
                      </button>
                      <button
                        type="button"
                        disabled={deletingId !== null}
                        onClick={() => setConfirmingId(null)}
                        className={subtleButtonClass}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="mt-field-md flex flex-wrap gap-inline-lg">
                      <button
                        type="button"
                        onClick={() => startEditing(feature.id)}
                        className={subtleButtonClass}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => askDelete(feature.id)}
                        className={dangerButtonClass}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 수정·삭제 결과. 폼과 같은 방식으로, 자리는 늘 두고 문구만 갈아끼운다. */}
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
    </div>
  );
}
