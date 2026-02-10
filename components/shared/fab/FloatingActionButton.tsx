"use client";
import { LANG_OPTIONS } from "@/constants/dropdown";
import { useSideNav } from "@/context/NavContext";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useState } from "react";
import GenericDropdown from "../inputs/GenericDropdown";
import Menu from "../svgs/Menu";

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
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
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
          className="bg-white rounded-full p-2 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={toggleTheme}
        >
          <Image
            src={`/icons/${theme}.svg`}
            width={24}
            height={24}
            alt="theme"
          />
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;
