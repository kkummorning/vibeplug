import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { featureColumns, parseFeatureInput } from "@/lib/features";

type Supabase = ReturnType<typeof createClient>;

/** 테이블의 id는 1부터 증가하는 identity다. 경로에 그 모양이 아닌 값이 오면 볼 것도 없다. */
function readId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * 수정·삭제가 한 줄도 건드리지 못했을 때의 응답.
 *
 * RLS가 막으면 Postgres는 오류가 아니라 "0줄 바뀜"으로 답한다 — 없는 번호를 보냈을
 * 때와 구분이 안 된다. 조회는 열려 있으니 같은 번호를 한 번 더 읽어 보고,
 * 행이 보이면 정책 문제(403), 안 보이면 없는 기능(404)으로 가른다.
 */
async function noRowResponse(supabase: Supabase, id: number, action: "수정" | "삭제") {
  const { data } = await supabase
    .from("features")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    return Response.json({ error: "해당 기능을 찾을 수 없습니다." }, { status: 404 });
  }

  // 원인은 서버 로그로만 남긴다 — 응답에 DB 내부 사정을 실어 보내지 않는다.
  console.error(
    `[api/features/${id}] ${action} 거부: 행은 있는데 반영되지 않았다 —` +
      ` features 테이블에 ${action === "수정" ? "UPDATE" : "DELETE"} 정책이 있는지 확인할 것.`
  );
  return Response.json(
    { error: `이 기능을 ${action}할 권한이 없습니다.` },
    { status: 403 }
  );
}

/** Supabase가 돌려준 오류를 상태 코드로 옮긴다. 42501은 권한 거부 — 서버 사정이 아니다. */
function failure(id: number, action: "수정" | "삭제", error: { code: string; message: string; hint: string | null }) {
  console.error(
    `[api/features/${id}] ${action} 실패: ${error.code} ${error.message} ${error.hint ?? ""}`
  );

  return error.code === "42501"
    ? Response.json({ error: `이 기능을 ${action}할 권한이 없습니다.` }, { status: 403 })
    : Response.json({ error: `기능을 ${action}하지 못했습니다.` }, { status: 500 });
}

/**
 * 기능 수정.
 *
 * 기능 관리 화면(app/mypage/features)의 수정 폼이 등록과 같은 항목을 통째로 보낸다 —
 * 일부만 고치는 PATCH가 아니라 값 한 벌을 갈아끼우는 PUT인 이유다.
 * 값 검사는 등록과 같은 lib/features.ts의 parseFeatureInput이 맡는다.
 */
export async function PUT(request: Request, ctx: RouteContext<"/api/features/[id]">) {
  const id = readId((await ctx.params).id);
  if (id === null) {
    return Response.json({ error: "기능 번호가 올바르지 않습니다." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const parsed = parseFeatureInput(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const supabase = createClient(await cookies());

  // 고친 행을 그대로 돌려준다. 한 줄도 안 바뀌면 오류 없이 data가 null이다(maybeSingle).
  const { data, error } = await supabase
    .from("features")
    .update(parsed.value)
    .eq("id", id)
    .select(featureColumns)
    .maybeSingle();

  if (error) {
    return failure(id, "수정", error);
  }

  if (!data) {
    return noRowResponse(supabase, id, "수정");
  }

  return Response.json(data);
}

/**
 * 기능 삭제.
 *
 * 정말 지울지 묻는 건 화면(components/feature-list.tsx)의 몫이고, 여기까지 온 요청은
 * 확인을 마친 것으로 본다. 지운 뒤에는 돌려줄 내용이 없어 204로 답한다.
 */
export async function DELETE(_request: Request, ctx: RouteContext<"/api/features/[id]">) {
  const id = readId((await ctx.params).id);
  if (id === null) {
    return Response.json({ error: "기능 번호가 올바르지 않습니다." }, { status: 400 });
  }

  const supabase = createClient(await cookies());

  // 지운 행을 돌려받아 "정말 한 줄이 지워졌는지"를 확인한다 — select 없이는
  // 없는 번호를 보내도, 정책에 막혀도 똑같이 성공처럼 보인다.
  const { data, error } = await supabase
    .from("features")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return failure(id, "삭제", error);
  }

  if (!data) {
    return noRowResponse(supabase, id, "삭제");
  }

  return new Response(null, { status: 204 });
}
