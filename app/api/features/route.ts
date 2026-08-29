import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

/**
 * 기능 목록 조회.
 *
 * 화면(app/features)은 Supabase를 직접 열지 않고 이 경로로만 데이터를 받아간다.
 * 접속 정보는 utils/supabase/server.ts가 .env.local의
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY에서 읽는다.
 */
export async function GET() {
  const supabase = createClient(await cookies());

  // 최신 등록이 맨 앞. created_at만으로는 값이 같은 행들의 순서가 보장되지 않아
  // 요청마다 뒤바뀔 수 있으므로, id를 두 번째 기준으로 붙여 순서를 고정한다.
  // id는 증가하는 identity라 내림차순이 곧 "나중에 들어온 것 먼저"가 된다.
  const { data, error } = await supabase
    .from("features")
    .select("id, name, description, category, price")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    // 실패 원인은 서버 로그로만 남긴다 — 응답에 DB 내부 사정을 실어 보내지 않는다.
    console.error("[api/features] 조회 실패:", error);
    return Response.json(
      { error: "기능 목록을 불러오지 못했습니다." },
      { status: 500 }
    );
  }

  return Response.json(data);
}

// 폼 값은 전부 문자열로 넘어온다. 공백만 남는 값은 안 쓴 것으로 본다.
function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * 기능 등록.
 *
 * 기능 관리 화면(app/mypage/features)의 등록 폼이 이 경로로 JSON을 보낸다.
 * 화면의 required 표시는 믿지 않고 여기서 다시 검사한다 — 이 경로는 폼을 거치지 않고도
 * 부를 수 있고, 값이 실제로 테이블 제약(price >= 0)에 맞는지는 여기가 마지막 관문이다.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  const name = readText(fields.name);
  const description = readText(fields.description);
  const category = readText(fields.category);

  if (!name || !description || !category) {
    return Response.json(
      { error: "기능 이름, 한 줄 설명, 카테고리를 모두 입력해 주세요." },
      { status: 400 }
    );
  }

  // 숫자 입력칸이라도 값은 문자열로 온다. Number("")는 0이라 빈 가격이 0원으로
  // 통과해버리므로, 숫자로 바꾸기 전에 비어 있는지를 먼저 본다.
  const priceText =
    typeof fields.price === "number" ? String(fields.price) : readText(fields.price);
  const price = Number(priceText);

  if (!priceText || !Number.isInteger(price) || price < 0) {
    return Response.json(
      { error: "가격은 0 이상의 정수여야 합니다." },
      { status: 400 }
    );
  }

  const supabase = createClient(await cookies());

  // 넣은 행을 그대로 돌려준다 — id와 created_at은 DB가 채우므로 여기서는 알 수 없다.
  const { data, error } = await supabase
    .from("features")
    .insert({ name, description, category, price })
    .select("id, name, description, category, price")
    .single();

  if (error) {
    // GET과 같은 원칙 — 실패 원인은 서버 로그로만 남긴다.
    // 에러 객체를 그대로 넘기면 dev 로거가 {}로 직렬화해 원인이 사라진다. 풀어서 적는다.
    console.error(
      `[api/features] 등록 실패: ${error.code} ${error.message} ${error.hint ?? ""}`
    );
    return Response.json({ error: "기능을 등록하지 못했습니다." }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
