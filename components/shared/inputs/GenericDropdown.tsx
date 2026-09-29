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
          "flex items-center space-x-1 font-poppins font-bold text-foreground focus:outline-none",
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
            "absolute right-0 mb-2 w-20 bg-surface text-foreground border border-border shadow-lg rounded-md overflow-hidden z-20",
            style,
          )}
        >
          {options.map((lang) => (
            <li
              key={lang}
              onClick={() => handleSelect(lang)}
              className="cursor-pointer font-poppins px-4 py-2 hover:bg-surface-muted hover:text-primary"
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
