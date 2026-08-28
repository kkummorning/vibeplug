const written = [
  "app/(auth)/sign-in/page.tsx",
  "app/api/auth/[...biblelo]/route.ts",
  "components/auth/passkey-button.tsx",
  "components/auth/device-list.tsx",
  "db/schema/credentials.ts",
  "db/migrations/0004_passkey.sql",
  "lib/auth/session.ts",
];

function Step({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5">
      <span className="text-accent">◇</span>
      <span className="text-foreground/85">{label}</span>
      <span className="text-subtle">{detail}</span>
    </div>
  );
}

/** Static replay of an install — the fastest way to explain what Biblelo does. */
export function TerminalDemo() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-8 bottom-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(255,194,71,0.10),transparent_75%)] blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-line bg-ink-1 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3 border-b border-line bg-ink-2/70 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/12" />
            <span className="size-2.5 rounded-full bg-white/12" />
            <span className="size-2.5 rounded-full bg-white/12" />
          </div>
          <span className="font-mono text-[11px] text-subtle">
            ~/projects/acme — biblelo
          </span>
        </div>

        <div className="space-y-3 p-5 font-mono text-[12px] leading-6 sm:text-[13px]">
          <div className="flex gap-2.5">
            <span className="text-accent">$</span>
            <span className="text-foreground">
              npx biblelo@latest add auth-passkey
            </span>
          </div>

          <Step label="프로젝트 감지" detail="Next.js 16 · Drizzle · Postgres" />
          <Step label="의존성 3개 설치" detail="@simplewebauthn/server, jose, zod" />
          <Step label="파일 24개 쓰기" detail="충돌 0건" />

          <div className="space-y-1 border-l border-line pl-4">
            {written.map((path) => (
              <div key={path} className="flex gap-2.5">
                <span className="text-emerald-400/80">+</span>
                <span className="truncate text-muted">{path}</span>
              </div>
            ))}
            <div className="pl-[22px] text-subtle">… 17개 더</div>
          </div>

          <Step label=".env.example 갱신" detail="BIBLELO_AUTH_SECRET" />

          <div className="flex flex-wrap items-baseline gap-x-2.5 pt-1">
            <span className="text-emerald-400">✔</span>
            <span className="text-foreground/85">완료</span>
            <span className="text-subtle">4.2초</span>
          </div>

          <div className="flex gap-2.5 pt-1">
            <span className="text-accent">$</span>
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent/80 animate-caret" />
          </div>
        </div>
      </div>
    </div>
  );
}
