"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Star } from "@/components/icons";
import { Container, SectionHeading } from "@/components/ui";
import { blocks, categories, type Block, type Category } from "@/lib/blocks";

function BlockCard({ block }: { block: Block }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-line bg-ink-1 p-6 transition-colors hover:border-line-strong hover:bg-ink-2/60">
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-line bg-ink-2 px-2 py-1 text-[11px] text-muted">
          {block.category}
        </span>
        {block.badge && (
          <span className="rounded-md bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
            {block.badge}
          </span>
        )}
        <span
          className={`ml-auto text-[13px] font-semibold ${
            block.price === "무료" ? "text-emerald-400" : "text-foreground"
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
      <p className="mt-1 font-mono text-[11px] text-subtle">{block.slug}</p>

      <p className="mt-3 flex-1 text-[14px] leading-7 text-muted">{block.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {block.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-ink-3 px-2 py-1 font-mono text-[11px] text-subtle"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 text-[12px] text-subtle">
        <span className="truncate text-muted">{block.publisher}</span>
        <span className="flex items-center gap-1">
          <Star className="size-3 text-accent" />
          {block.rating}
        </span>
        <span>{block.installs} 설치</span>
        <span className="ml-auto shrink-0">파일 {block.files}</span>
      </div>

      <a
        href="#"
        className="absolute inset-0 rounded-2xl"
        aria-label={`${block.name} 블록 자세히 보기`}
      />
    </article>
  );
}

export function Marketplace() {
  const [category, setCategory] = useState<Category>("전체");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blocks.filter((block) => {
      const inCategory = category === "전체" || block.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      return [block.name, block.slug, block.summary, ...block.stack]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, query]);

  return (
    <section
      id="marketplace"
      className="scroll-mt-20 border-t border-line bg-ink-1/40 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="마켓플레이스"
          title="필요한 기능은 대체로 이미 누군가 만들었습니다"
          description="공식 블록과 검증된 퍼블리셔의 블록을 함께 씁니다. 모든 블록은 설치 전에 소스 전체를 열어볼 수 있습니다."
        />

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="블록 검색 — 결제, RAG, Drizzle…"
              className="h-11 w-full rounded-xl border border-line bg-ink-2/70 pl-10 pr-3 text-sm text-foreground placeholder:text-subtle transition-colors hover:border-line-strong focus:border-line-strong"
            />
            <span className="sr-only">블록 검색</span>
          </label>

          <div
            className="flex flex-wrap gap-2 lg:ml-auto"
            role="group"
            aria-label="블록 카테고리"
          >
            {categories.map((item) => {
              const active = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item)}
                  className={`h-9 rounded-lg border px-3 text-[13px] transition-colors ${
                    active
                      ? "border-accent/40 bg-accent/15 font-medium text-accent"
                      : "border-line bg-ink-2/60 text-muted hover:border-line-strong hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 font-mono text-[12px] text-subtle" aria-live="polite">
          {results.length}개 표시 중 · 전체 428개
        </p>

        {results.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-line bg-ink-1 p-14 text-center">
            <p className="text-[15px] text-muted">
              &lsquo;{query}&rsquo; 에 맞는 블록이 아직 없습니다.
            </p>
            <p className="mt-2 text-[13px] text-subtle">
              필요한 블록을 요청하면 퍼블리셔에게 전달됩니다.
            </p>
            <a
              href="#publish"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:underline"
            >
              블록 요청하기
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/60 px-5 py-3 text-sm font-medium transition-colors hover:border-line-strong hover:bg-ink-3"
          >
            레지스트리 전체 보기
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
