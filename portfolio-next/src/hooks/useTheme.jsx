"use client";

import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  // Load saved theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // your console branding (keep it)
  useEffect(() => {
    console.log(
      "%c ✦ Welcome to Ubaid's Premium Portfolio ✦ ",
      "font-size: 18px; font-weight: bold; color: #10b981; text-shadow: 0 0 10px rgba(16, 185, 129, 0.6); background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 8px;"
    );

    console.log(
      "%cCrafted with ❤️ using Premium Glassmorphism Design",
      "font-size: 13px; color: #3b82f6; font-weight: 600;"
    );

    console.log(
      "%cFull Stack Developer | MERN Stack | Blockchain Explorer | UI Architect",
      "font-size: 11px; color: #a0aec0; font-style: italic;"
    );
  }, []);

  return { theme, toggleTheme };
}