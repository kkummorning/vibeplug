"use client";

import { useMemo, useState } from "react";
import { BlockCard } from "@/components/block-card";
import { ArrowRight, Search } from "@/components/icons";
import { Container, SectionHeading } from "@/components/ui";
import { blocks, categories, type Category } from "@/lib/blocks";

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
      className="scroll-mt-20 border-t border-border bg-surface/40 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="마켓플레이스"
          title="필요한 기능은 대체로 이미 누군가 만들었습니다"
          description="공식 블록과 검증된 퍼블리셔의 블록을 함께 씁니다. 모든 블록은 설치 전에 소스 전체를 열어볼 수 있습니다."
        />

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-tertiary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="블록 검색 — 결제, RAG, Drizzle…"
              className="h-11 w-full rounded-xl border border-border bg-surface-muted/70 pl-10 pr-3 text-sm text-foreground placeholder:text-tertiary transition-colors hover:border-input focus:border-input"
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
                      : "border-border bg-surface-muted/60 text-muted-foreground hover:border-input hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 font-mono text-[12px] text-tertiary" aria-live="polite">
          {results.length}개 표시 중 · 전체 428개
        </p>

        {results.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((block) => (
              <BlockCard key={block.slug} block={block} href="#" />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface p-14 text-center">
            <p className="text-[15px] text-muted-foreground">
              &lsquo;{query}&rsquo; 에 맞는 블록이 아직 없습니다.
            </p>
            <p className="mt-2 text-[13px] text-tertiary">
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
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface-muted/60 px-5 py-3 text-sm font-medium transition-colors hover:border-input hover:bg-muted"
          >
            레지스트리 전체 보기
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
