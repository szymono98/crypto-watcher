"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      type="button"
      className="relative w-14 h-8 rounded-full border border-white/20 bg-white/10 dark:bg-black/20 shadow-lg backdrop-blur-md flex items-center transition-colors duration-300 focus:outline-none"
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-6 bg-black/80" : "translate-x-0 bg-white/90"
        }`}
        style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
      >
        <span className="flex items-center justify-center w-full h-full">
          <span
            className={`block w-2 h-2 rounded-full ${
              isDark ? "bg-yellow-300/80" : "bg-blue-500/80"
            } transition-colors duration-300`}
          ></span>
        </span>
      </span>
      <span
        className={`absolute left-0 top-0 w-full h-full rounded-full pointer-events-none transition-opacity duration-300 ${
          isDark ? "opacity-60" : "opacity-40"
        }`}
        style={{
          background: isDark
            ? "linear-gradient(90deg, #23243a 0%, #3a3b5a 100%)"
            : "linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)",
        }}
      />
    </button>
  );
}
