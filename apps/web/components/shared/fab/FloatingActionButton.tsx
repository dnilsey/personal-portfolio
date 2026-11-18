"use client";
import { useTheme } from "@/context/ThemeContext";
import Moon from "../svgs/Moon";
import Sun from "../svgs/Sun";

// TODO: re-add the language dropdown (GenericDropdown + LANG_OPTIONS) once
// i18n is wired up.
const FloatingActionButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 sm:gap-8">
      <button
        className="bg-surface text-foreground border border-border shadow-md rounded-full p-2 cursor-pointer hover:scale-105 hover:text-primary transition duration-200"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;
