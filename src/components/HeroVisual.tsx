// PLACEHOLDER ARTWORK: replace with real character art / screenshots (see README).
const cells = Array.from({ length: 12 }, (_, i) => i);
const PICKED = 6;

export default function HeroVisual({ hint }: { hint: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative rounded-3xl border border-white/10 bg-panel/80 p-4 backdrop-blur">
        <div className="grid grid-cols-4 gap-3">
          {cells.map((i) => (
            <div key={i}
              className={`flex aspect-[3/4] items-end justify-center overflow-hidden rounded-xl bg-bg ${i === PICKED ? "pick border border-accent" : "border border-white/5"}`}>
              <svg viewBox="0 0 40 52" className={`w-3/4 ${i === PICKED ? "text-accent" : "text-white/10"}`} fill="currentColor">
                <circle cx="20" cy="17" r="10" /><path d="M2 52c0-13 8-21 18-21s18 8 18 21z" />
              </svg>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-bg px-4 py-3 text-sm">
          <span className="text-muted">{hint}</span>
          <span className="font-bold text-glow">?</span>
        </div>
      </div>
    </div>
  );
}
