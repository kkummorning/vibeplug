import { Star } from "@/components/icons";

/**
 * 카드가 그리는 데이터.
 *
 * 이름·한 줄 설명·카테고리·가격만 필수이고 나머지는 선택이다. 화면마다 가진
 * 데이터가 다르기 때문에(랜딩은 레지스트리 메타까지, /features는 네 항목만),
 * 없는 값은 빈칸이나 임시값으로 채우지 않고 해당 줄을 통째로 그리지 않는다.
 */
export type BlockCardData = {
  name: string;
  category: string;
  /** 표시용 문자열 그대로 받는다 — "무료" 또는 "₩39,000" */
  price: string;
  summary: string;
  slug?: string;
  stack?: string[];
  files?: number;
  installs?: string;
  rating?: number;
  publisher?: string;
  official?: boolean;
  badge?: string;
};

export function BlockCard({
  block,
  href,
}: {
  block: BlockCardData;
  /** 상세 화면이 있는 곳에서만 넘긴다. 없으면 카드 전체 링크를 걸지 않는다. */
  href?: string;
}) {
  const hasFooter =
    block.publisher !== undefined ||
    block.rating !== undefined ||
    block.installs !== undefined ||
    block.files !== undefined;

  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-input hover:bg-surface-muted/60">
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-border bg-surface-muted px-2 py-1 text-[11px] text-muted-foreground">
          {block.category}
        </span>
        {block.badge && (
          <span className="rounded-md bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
            {block.badge}
          </span>
        )}
        <span
          className={`ml-auto text-[13px] font-semibold ${
            block.price === "무료" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
          }`}
        >
          {block.price}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <h3 className="text-[17px] font-semibold tracking-tight">{block.name}</h3>
        {block.official && (
          <span className="rounded border border-accent/30 px-1.5 py-0.5 text-[10px] font-medium text-accent">
            공식
          </span>
        )}
      </div>
      {block.slug && <p className="mt-1 font-mono text-[11px] text-tertiary">{block.slug}</p>}

      <p className="mt-3 flex-1 text-[14px] leading-7 text-muted-foreground">{block.summary}</p>

      {block.stack && block.stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {block.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-tertiary"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {hasFooter && (
        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-[12px] text-tertiary">
          {block.publisher && <span className="truncate text-muted-foreground">{block.publisher}</span>}
          {block.rating !== undefined && (
            <span className="flex items-center gap-1">
              <Star className="size-3 text-accent" />
              {block.rating}
            </span>
          )}
          {block.installs && <span>{block.installs} 설치</span>}
          {block.files !== undefined && <span className="ml-auto shrink-0">파일 {block.files}</span>}
        </div>
      )}

      {href && (
        <a
          href={href}
          className="absolute inset-0 rounded-2xl"
          aria-label={`${block.name} 블록 자세히 보기`}
        />
      )}
    </article>
  );
}
