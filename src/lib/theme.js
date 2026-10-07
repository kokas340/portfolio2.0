// Site theme: "light" (default) or "dark" (terminal mode). Kept on <html> as the
// `dark` class (applied before first paint by the inline script in index.html)
// and in localStorage. Anything that changes it announces a `themechange` event,
// so the header toggle and the Dev Hub terminal stay in sync.

const KEY = "theme";

export function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode: the change still applies for this visit */
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export function toggleTheme() {
  const next = isDark() ? "light" : "dark";
  setTheme(next);
  return next;
}
