import { headers } from "next/headers";
import type { Feature } from "@/lib/features";

/**
 * 기능 목록을 app/api/features로 받아온다 — 화면은 Supabase를 직접 열지 않는다.
 *
 * 자기 서버의 라우트를 부르는 fetch는 절대 URL이 필요한데, 빌드 시점에는 그 서버가
 * 아직 떠 있지 않다. headers()로 요청이 들어온 호스트를 읽으면 URL이 만들어지는
 * 동시에 이 함수를 부른 화면이 요청 시점 렌더링으로 넘어가서, 빌드 중 호출을 피할 수 있다.
 * 덕분에 기능 관리 화면의 router.refresh()도 매번 새 목록을 받아온다.
 *
 * next/headers를 쓰므로 서버에서만 부를 수 있다. 클라이언트 컴포넌트가 함께 쓰는
 * 타입(Feature)은 이 파일이 아니라 lib/features.ts에 있다.
 */
export async function fetchFeatures(): Promise<Feature[]> {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  const response = await fetch(`${protocol}://${host}/api/features`);
  if (!response.ok) {
    throw new Error(`기능 목록 응답이 ${response.status}입니다.`);
  }

  return response.json();
}
