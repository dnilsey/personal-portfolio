import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ChevronDown from "../svgs/ChevronDown";
import { classNames } from "@/lib/classnames";

type IProps = {
  options: string[];
  handleSelect: (value: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectedValue: string;
  style?: string;
  controlStyle?: string;
};
const GenericDropdown = ({
  selectedValue,
  options,
  isMenuOpen,
  setIsMenuOpen,
  handleSelect,
  style = "bottom-full",
  controlStyle = "",
}: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleOpen}
        className={classNames(
          "flex items-center space-x-1 font-poppins font-bold text-gray-900 dark:text-white focus:outline-none",
          controlStyle,
        )}
      >
        <span>{selectedValue}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isMenuOpen && (
        <ul
          className={classNames(
            "absolute right-0 mb-2 w-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg rounded-md z-20",
            style,
          )}
        >
          {options.map((lang) => (
            <li
              key={lang}
              onClick={() => handleSelect(lang)}
              className="cursor-pointer text-gray-900 font-poppins dark:text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericDropdown;
