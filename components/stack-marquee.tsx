import { stacks } from "@/lib/blocks";
import { Container } from "@/components/ui";

export function StackMarquee() {
  const loop = [...stacks, ...stacks];

  return (
    <section className="border-y border-border bg-surface/60 py-10">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
          이미 쓰고 있는 스택 위에 그대로 얹힙니다
        </p>
      </Container>
      <div className="mask-fade-x mt-6 flex overflow-hidden">
        <ul
          className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
          aria-hidden
        >
          {loop.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap font-mono text-[15px] text-muted-foreground"
            >
              {name}
              <span className="size-1 rounded-full bg-input" />
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">
        지원 스택: {stacks.join(", ")}
      </span>
    </section>
  );
}
