import SignupForm from "./components/SignupForm";
import HeroVisual from "./components/HeroVisual";
import { useEffect, useState } from "react";
import { dict, type Lang } from "./i18n";
import { GAME_NAME, KOFI_URL, SOCIALS, isHttpUrl, DEVELOPER_NAME, DEVELOPER_LOGO, DEVELOPER_URL, DOWNLOAD_URL, } from "./config";

const Logo = () => (
  <span className="flex items-center gap-2.5 font-display text-lg font-extrabold">
    {/* LOGO PLACEHOLDER: replace with your logo */}
<img src="/favicon.png" alt="" className="h-8 w-8 rounded-lg" />
    {GAME_NAME}
  </span>
);
const DeveloperBrand = () => {
  const inner = (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold text-white">
      {DEVELOPER_LOGO && <img src={DEVELOPER_LOGO} alt="" className="h-8 w-8 rounded-lg" />}
      {DEVELOPER_NAME}
    </span>
  );
  return isHttpUrl(DEVELOPER_URL)
    ? <a href={DEVELOPER_URL} target="_blank" rel="noopener noreferrer">{inner}</a>
    : inner;
};

const icon = "h-6 w-6 text-accent";
const icons = [
  { svg: <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 010 6.4M18 14.3c2 .7 3.5 2.4 3.5 5.7"/></svg> },
  { svg: <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21M9.2 9.3a2 2 0 113 1.7c-.7.4-1 .8-1 1.5"/></svg> },
  { svg: <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg> },
];

function initialLang(): Lang {
  try { const v = localStorage.getItem("lang"); if (v === "ar" || v === "en") return v; } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = dict[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
  }, [lang]);
  const kofiReady = isHttpUrl(KOFI_URL);
  const downloadReady = isHttpUrl(DOWNLOAD_URL);
  const socials = SOCIALS.filter((s) => isHttpUrl(s.url));
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#101625_0%,#080B14_60%)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-glow">{t.soon}</span>
          <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={t.toggleLabel}
            lang={lang === "ar" ? "en" : "ar"}
            className="rounded-full border border-white/15 px-3.5 py-1 text-sm font-semibold transition hover:border-accent hover:text-glow">{t.toggle}</button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:pt-16">
          <div className="hero-in flex flex-col items-start gap-6">
            <p className="text-xs font-bold tracking-[.18em] text-accent">{t.label}</p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">{t.h1}</h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted">{t.desc}</p>
            <SignupForm t={t} lang={lang} />
            {downloadReady ? (
              <a href={DOWNLOAD_URL} rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-accent px-6 py-3 text-sm font-bold tracking-wide text-accent transition hover:bg-accent hover:text-bg">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
                {t.downloadAndroid}
              </a>
            ) : (
              <button type="button" disabled aria-disabled="true" title={t.downloadTip}
                className="cursor-not-allowed rounded-xl border border-white/15 px-6 py-3 text-sm font-bold tracking-wide text-muted">
                {t.download}
              </button>
            )}
          </div>
          <HeroVisual hint={t.hint} />
        </section>

        <section aria-label="Features" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <ul className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-3">
            {icons.map((f, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-panel">{f.svg}</span>
                <div><h2 className="text-sm font-bold tracking-wide">{t.features[i][0]}</h2><p className="mt-1.5 text-muted">{t.features[i][1]}</p></div>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="how" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-panel text-center">
            <div className="h-[3px] bg-accent" />
            <div className="px-6 pb-9 pt-8">
              <h2 id="how" className="font-display text-2xl font-extrabold sm:text-[26px]">{t.howTitle}</h2>
              <div className="mb-8 mt-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[13px] text-glow">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18M2 8.8a15 15 0 014-2.4M22 8.8a15 15 0 00-8-3.7M5 12.9a10 10 0 015-2.7M19 12.9a10 10 0 00-2-1.6M8.5 16.4a5 5 0 017 0M12 20h.01"/></svg>
                  {t.howPill}
                </span>
              </div>
              <div className="relative">
                <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[18px] hidden border-t border-dashed border-accent/45 lg:block" />
                <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                  {t.steps.map(([title, text], i) => (
                    <li key={i}>
                      <span className={`mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full border bg-panel font-bold ${i === 3 ? "border-glow text-glow" : "border-accent text-accent"}`}>{i + 1}</span>
                      <h3 className="text-[15px] font-bold">{title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="support" className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-xl rounded-[20px] border border-accent/45 bg-panel px-7 py-9 text-center">
            <div className="mb-5 flex justify-center gap-2.5" aria-hidden="true">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h11v6a5 5 0 01-5 5h-1a5 5 0 01-5-5V8zM16 9h1.5a2.5 2.5 0 010 5H16M8 3v2M11 3v2"/></svg>
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-glow/10 text-glow">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>
              </span>
            </div>

            <h2 id="support" className="font-display text-2xl font-extrabold sm:text-[26px]">{t.loveTitle}</h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">{t.loveText}</p>
            <a href={kofiReady ? KOFI_URL : undefined} target="_blank" rel="noopener noreferrer"
              aria-disabled={!kofiReady} title={kofiReady ? undefined : t.supportTip}
              onClick={(e) => { if (!kofiReady) e.preventDefault(); }}
              className={`mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold tracking-wide transition ${kofiReady ? "bg-accent text-bg hover:bg-glow" : "cursor-not-allowed border border-white/15 text-muted"}`}>
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h11v6a5 5 0 01-5 5h-1a5 5 0 01-5-5V8zM16 9h1.5a2.5 2.5 0 010 5H16M8 3v2M11 3v2"/></svg>
              {t.support}
            </a>
            <p className="mt-3.5 text-[13px] text-muted">{t.supportNote}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
          <DeveloperBrand />
          <p>© {new Date().getFullYear()} {DEVELOPER_NAME}. {t.rights}</p>
          {socials.length > 0 && (
            <ul className="flex gap-4">{socials.map((s) => (
              <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.label}</a></li>))}
            </ul>)}
        </div>
      </footer>
    </div>
  );
}
