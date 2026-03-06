"use client";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    function toggle() {
        const next = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    return (
        <div className="flex items-center gap-2">
            <Sun size={15} className="theme-toggle-sun" />
            <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="theme-toggle-track relative w-11 h-6 rounded-full transition-colors duration-300 outline-none cursor-pointer"
            >
                <span className="theme-toggle-knob absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300" />
            </button>
            <Moon size={15} className="theme-toggle-moon" />
        </div>
    );
}
