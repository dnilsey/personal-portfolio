"use client";
import { useSideNav } from "@/context/NavContext";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import Menu from "../svgs/Menu";
import ChevronDown from "../svgs/ChevronDown";
import { LANG_OPTIONS } from "@/constants/dropdown";
import Image from "next/image";

const FloatingActionButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [langOptionsOpen, setLangOptionsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toggle, isOpen } = useSideNav();

  const toggleOpen = () => setLangOptionsOpen((prev) => !prev);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setLangOptionsOpen(false);
    // TODO: integrate with i18n or language logic
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 w-full flex inline-flex justify-between items-center">
      {!isOpen && (
        <button className="mr-4 block sm:hidden" onClick={toggle}>
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
      )}
      <div className="flex justify-end items-center w-full gap-4 sm:gap-8">
        <div ref={dropdownRef} className="relative inline-block text-left">
          <button
            onClick={toggleOpen}
            className="flex items-center space-x-1 font-poppins font-bold text-gray-900 dark:text-white focus:outline-none"
          >
            <span>{selectedLang}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${langOptionsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {langOptionsOpen && (
            <ul className="absolute bottom-full right-0 mb-2 w-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg rounded-md z-20">
              {LANG_OPTIONS.map((lang) => (
                <li
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className="cursor-pointer text-gray-900 dark:text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
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
