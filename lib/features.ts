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
