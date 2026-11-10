/** Strict email check: ASCII addresses, sane lengths, no leading symbols (blocks spreadsheet formula tricks). */
export function normalizeEmail(v: string) { return v.trim().toLowerCase(); }
export function isValidEmail(v: string): boolean {
  if (v.length > 254) return false;
  const m = /^([a-z0-9][a-z0-9._%+-]{0,63})@((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24})$/i.exec(v);
  return !!m && !m[1].includes("..") && !m[1].endsWith(".");
}
