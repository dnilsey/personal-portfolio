"use client";
import { LANG_OPTIONS } from "@/constants/dropdown";
import { useSideNav } from "@/context/NavContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import GenericDropdown from "../inputs/GenericDropdown";
import Menu from "../svgs/Menu";
import Moon from "../svgs/Moon";
import Sun from "../svgs/Sun";

const FloatingActionButton = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggle, isOpen } = useSideNav();
  const [langOptionsOpen, setLangOptionsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setLangOptionsOpen(false);
    // TODO: integrate with i18n or language logic
  };
  return (
    <div className="fixed bottom-6 right-6 z-50 w-full flex inline-flex justify-between items-center">
      {!isOpen && (
        <button className="mr-4 block sm:hidden" onClick={toggle}>
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      )}
      <div className="flex justify-end items-center w-full gap-4 sm:gap-8">
        <GenericDropdown
          handleSelect={handleSelect}
          options={LANG_OPTIONS}
          isMenuOpen={langOptionsOpen}
          selectedValue={selectedLang}
          setIsMenuOpen={setLangOptionsOpen}
        />
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
    </div>
  );
};

export default FloatingActionButton;
