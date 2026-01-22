"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { classNames } from "@/app/lib/classnames";

const languages = ["EN", "JP","UK","PH"];

export default function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const [langOptionsOpen, setLangOptionsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setLangOptionsOpen((prev) => !prev);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setLangOptionsOpen(false);
    // TODO: integrate with i18n or language logic
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("Current theme:", theme);


  return (
    <nav className="w-full h-18 bg-primary dark:bg-gray-900 fixed top-0 left-0 z-10 flex items-center justify-end px-8 py-4">
      <div className="flex justify-end items-center w-full gap-8"> 
        <div ref={dropdownRef} className="relative inline-block text-left">
          <button
            onClick={toggleOpen}
            className="flex items-center space-x-1 font-inter font-bold text-gray-900 dark:text-white focus:outline-none"
          >
            <span>{selectedLang}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${langOptionsOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {langOptionsOpen && (
            <ul className="absolute top-full right-0 mt-1 w-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg rounded-sm z-20">
              {languages.map((lang) => (
                <li
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className="cursor-pointer text-gray-900 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
    </nav>
  )
}