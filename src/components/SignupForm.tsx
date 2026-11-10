import { useId, useState, type FormEvent } from "react";
import { SIGNUP_ENDPOINT } from "../config";
import { isValidEmail, normalizeEmail } from "../lib/email";
import type { Dict, Lang } from "../i18n";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupForm({ t, lang }: { t: Dict; lang: Lang }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msgKey, setMsgKey] = useState<keyof Dict | "">("");
  const id = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return; // block duplicates
    if ((new FormData(e.currentTarget).get("website") as string) || "") return; // honeypot
    const value = normalizeEmail(email);
    if (!isValidEmail(value)) { setStatus("error"); setMsgKey("invalid"); return; }
    if (!SIGNUP_ENDPOINT) { setStatus("error"); setMsgKey("notConfigured"); return; }
    setStatus("loading"); setMsgKey("");
    try {
      // text/plain keeps this a "simple" request, so Google Apps Script needs no CORS preflight.
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email: value, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || String(res.status));
      setStatus("success"); setMsgKey(data.duplicate ? "duplicate" : "success");
    } catch {
      setStatus("error"); setMsgKey("failed");
    }
  }

  const busy = status === "loading", done = status === "success";
  const text = msgKey ? (t[msgKey] as string) : t.reassure;
  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-xl">
      <label htmlFor={id} className="sr-only">{t.emailLabel}</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input id={id} type="email" name="email" dir="ltr" autoComplete="email" inputMode="email"
          placeholder={t.placeholder} value={email} disabled={busy || done}
          onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          aria-invalid={status === "error"} aria-describedby={`${id}-msg`}
          className="min-h-12 flex-1 rounded-xl border border-white/10 bg-panel px-4 text-start text-base text-white placeholder:text-muted/70 transition focus:border-accent disabled:opacity-60" />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={busy || done}
          className="min-h-12 rounded-xl bg-accent px-6 text-sm font-bold tracking-wide text-bg shadow-[0_8px_30px_-8px_rgb(249_115_22/.7)] transition hover:bg-glow disabled:cursor-not-allowed disabled:opacity-70">
          {busy ? t.joining : done ? t.joined : t.join}
        </button>
      </div>
      <p id={`${id}-msg`} role={status === "error" ? "alert" : "status"} aria-live="polite"
        className={`mt-3 min-h-5 text-sm ${status === "error" ? "text-red-400" : done ? "text-glow" : "text-muted"}`}>{text}</p>
    </form>
  );
}
