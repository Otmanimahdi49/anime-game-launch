// ===== EDIT THIS FILE to configure the site =====
export const GAME_NAME = "SHINRA";
/** Developer name and logo shown in the footer. Put the logo file in /public, e.g. "/developer-logo.png". Leave empty to hide the logo. */
export const DEVELOPER_NAME = "OXTR";
export const DEVELOPER_LOGO = "/logo1.png";
export const DEVELOPER_URL = ""; // optional link to your profile
/** Ko-fi page URL. Replace the placeholder with your real link, e.g. "https://ko-fi.com/yourname" */
export const KOFI_URL = "https://ko-fi.com/oxtr";
/** Social links. Leave a value empty to hide it. */
export const SOCIALS: { label: string; url: string }[] = [
  { label: "Discord", url: "" },
  { label: "X", url: "" },
  { label: "Instagram", url: "" },
];
/** Set via .env (VITE_SIGNUP_ENDPOINT). Empty = signup is not connected. */
export const SIGNUP_ENDPOINT: string = import.meta.env.VITE_SIGNUP_ENDPOINT ?? "";
export const isHttpUrl = (v: string) => /^https?:\/\//i.test(v);
/** Direct link to the APK. Leave empty to keep the download button disabled. */
export const DOWNLOAD_URL = "https://github.com/Otmanimahdi49/anime-game-launch/releases/latest/download/shinra.apk";