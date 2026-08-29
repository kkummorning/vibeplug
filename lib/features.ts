/**
 * Supabase public.features 테이블 한 줄.
 *
 * /api/features가 돌려주는 JSON의 형태이기도 하다 — 화면은 이 타입만 알고
 * 테이블이나 Supabase 클라이언트는 직접 건드리지 않는다.
 */
export type Feature = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};

/** id를 뺀 나머지 — 등록·수정이 주고받는 값 한 벌. */
export type FeatureInput = Omit<Feature, "id">;

/**
 * 라우트가 Supabase에서 읽어 오는 열 — 위 Feature와 짝이다.
 * created_at은 정렬에만 쓰고 화면으로 내보내지 않는다.
 */
export const featureColumns = "id, name, description, category, price";

// 폼 값은 전부 문자열로 넘어온다. 공백만 남는 값은 안 쓴 것으로 본다.
function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * 요청 본문을 테이블에 넣을 수 있는 값 한 벌로 추린다.
 *
 * 등록(POST /api/features)과 수정(PUT /api/features/[id])이 같은 항목을 받으므로
 * 검사도 한 곳에만 둔다. 화면의 required 표시는 믿지 않는다 — 두 경로 다 폼을 거치지
 * 않고 부를 수 있고, 값이 실제로 테이블 제약(price >= 0)에 맞는지는 여기가 마지막 관문이다.
 *
 * 실패는 예외 대신 결과로 돌려준다. 부르는 쪽이 문구를 그대로 400 응답에 실으면 된다.
 */
export function parseFeatureInput(
  body: unknown
): { ok: true; value: FeatureInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "요청 형식이 올바르지 않습니다." };
  }

  const fields = body as Record<string, unknown>;
  const name = readText(fields.name);
  const description = readText(fields.description);
  const category = readText(fields.category);

  if (!name || !description || !category) {
    return {
      ok: false,
      error: "기능 이름, 한 줄 설명, 카테고리를 모두 입력해 주세요.",
    };
  }

  // 숫자 입력칸이라도 값은 문자열로 온다. Number("")는 0이라 빈 가격이 0원으로
  // 통과해버리므로, 숫자로 바꾸기 전에 비어 있는지를 먼저 본다.
  const priceText =
    typeof fields.price === "number" ? String(fields.price) : readText(fields.price);
  const price = Number(priceText);

  if (!priceText || !Number.isInteger(price) || price < 0) {
    return { ok: false, error: "가격은 0 이상의 정수여야 합니다." };
  }

  return { ok: true, value: { name, description, category, price } };
}
