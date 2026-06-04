"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo component chỉ render sau khi đã mount trên client để tránh lỗi giao diện
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-yellow-600 transition-colors focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          theme === "dark" ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
