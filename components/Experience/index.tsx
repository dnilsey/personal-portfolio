"use client";

import { YEARS_OF_EXPERIENCE } from "@/constants/dropdown";
import { useIsMobile } from "@/hooks/useIsMobile";
import { classNames } from "@/lib/classnames";
import { useEffect, useRef, useState } from "react";
import GenericDropdown from "../shared/inputs/GenericDropdown";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import DesktopStepper, { steps } from "./DesktopStepper";

const items = [
  {
    id: 1,
    image: "/images/magna-carta.jpg",
    title: "Magna Carta",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    image: "/images/black-death.jpg",
    title: "The Black Death",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    image: "/images/war-of-roses.jpg",
    title: "War of the Roses",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    image: "/images/columbus.jpg",
    title: "Columbus Discovers America",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const Experience = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<number>(1);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [yearOptionsOpen, setYearOptionsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("ALL");

  useEffect(() => {
    const card = cardRefs.current.get(active);
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  const handleSelect = (year: string) => {
    setActive(steps.find((step) => step.label === year)?.id || 1);
    setSelectedYear(year);
    setYearOptionsOpen(false);
    // TODO: integrate with i18n or language logic
  };

  return (
    <WithNavLayout>
      {!isMobile && <DesktopStepper active={active} setActive={setActive} />}
      <div className="sm:max-h-full max-h-[80vh]">
        {isMobile && (
          <div className="flex w-full justify-start items-center py-4 px-4">
            <GenericDropdown
              handleSelect={handleSelect}
              options={YEARS_OF_EXPERIENCE}
              isMenuOpen={yearOptionsOpen}
              selectedValue={selectedYear}
              setIsMenuOpen={setYearOptionsOpen}
              style="top-full w-50"
              controlStyle="border px-2 h-12 rounded w-50 shadow-lg justify-between"
            />
          </div>
        )}
        <div className="flex sm:max-h-[100%] max-h-[80vh] sm:pb-0 pb-20 sm:overflow-y-hidden overflow-y-auto sm:flex-row px-4 flex-col gap-6 overflow-x-hidden sm:overflow-x-auto py-6 scrollbar-hide">
          {items.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current.set(item.id, el);
              }}
              className={classNames(
                item.id === active
                  ? "border-blue-500 scale-105"
                  : "border-gray-200",
                "min-w-fit sm:min-w-[320px] rounded-xl p-4 shadow-md border transition-all",
              )}
            >
              <img src={item.image} className="rounded-lg mb-3" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-4 sm:line-clamp-30">
                {item.description}
              </p>
              <button className="text-blue-600 text-sm mt-2">
                read more ↓
              </button>
            </div>
          ))}
        </div>
      </div>
    </WithNavLayout>
  );
};

export default Experience;
