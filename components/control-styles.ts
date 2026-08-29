/**
 * 기능 관리 화면의 폼과 목록이 함께 쓰는 컨트롤 모양.
 *
 * 색·여백·둥글기·글자는 전부 globals.css의 토큰이다. 등록 폼과 수정 폼, 목록 버튼이
 * 같은 자를 쓰도록 클래스 문자열을 한 곳에 모아 둔다.
 * 높이는 고정 높이 토큰이 없어 padding으로만 잡는다.
 */

/** 입력창·선택창. */
export const fieldClass =
  "rounded-lg border border-border bg-surface px-grid-gutter-x py-field-sm text-body-md text-foreground transition-colors placeholder:text-tertiary hover:border-input focus:border-input";

/** 주 동작 — 등록·저장. */
export const primaryButtonClass =
  "rounded-lg bg-primary px-grid-gutter-x py-field-sm text-label-lg text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60";

/** 곁다리 동작 — 수정·취소. */
export const subtleButtonClass =
  "rounded-lg border border-border bg-surface-muted px-grid-gutter-x py-field-sm text-label-lg text-foreground transition-colors hover:border-input hover:bg-muted disabled:opacity-60";

/**
 * 되돌릴 수 없는 동작 — 삭제.
 * 채움 대신 테두리로 쓴다. --destructive 위에 올릴 글자색 토큰이 없어서,
 * 채우면 다크(#f85149)에서 대비가 모자란다.
 */
export const dangerButtonClass =
  "rounded-lg border border-destructive px-grid-gutter-x py-field-sm text-label-lg text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60";
