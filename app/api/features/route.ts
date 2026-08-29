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
