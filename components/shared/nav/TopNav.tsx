"use client";

import { useSideNav } from "@/context/NavContext";
import { classNames } from "@/lib/classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "../svgs/Menu";
import { useIsMobile } from "@/hooks/useIsMobile";
import Xmark from "../svgs/Xmark";

const pages = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "EXPERIENCE", href: "/experience" },
  { name: "PROJECTS", href: "/projects" },
  { name: "SKILLS", href: "/skills" },
  { name: "CONTACT", href: "/contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { close, isOpen, toggle } = useSideNav();
  return (
    <nav
      className={classNames(
        isMobile
          ? `${isOpen ? "h-full dark:bg-dark-gray gap-10 items-center justify-start" : "h-14 dark:bg-light-orange items-start justify-between"} px-4 py-3 w-full top-0 left-0 flex-col`
          : "top-10 dark:bg-light-orange left-1/2 -translate-x-1/2 w-[90vw] max-w-7xl h-12 items-center justify-end",
        "bg-gray-orange  fixed z-10 flex",
      )}
    >
      {!isOpen && (
        <button className="block sm:hidden" onClick={toggle}>
          <Menu className="w-8 h-8 text-gray-900 dark:text-black" />
        </button>
      )}

      {isMobile && isOpen && (
        <button
          className="flex justify-end items-center w-full"
          onClick={toggle}
        >
          <Xmark className="w-6 h-6 text-gray-900 dark:text-white cursor-pointer" />
        </button>
      )}
      {(isOpen || !isMobile) && (
        <ul
          className={classNames(
            isMobile ? "grid-cols-1" : "grid-cols-6 ",
            "grid w-full gap-0 font-poppins font-normal text-xl sm:text-lg",
          )}
        >
          {pages.map((page, index) => (
            <li key={page.name}>
              <Link
                href={page.href}
                className={classNames(
                  index == 0
                    ? ""
                    : `${!isMobile ? "border-l-[0.2px] dark:border-l border-gray-200" : ""}`,
                  "flex inline-flex gap-4 justify-center h-12 w-full items-center",
                )}
                onClick={close}
              >
                <div
                  className={classNames(
                    pathname === page.href
                      ? "bg-gray-brown dark:bg-pink font-bold"
                      : `bg-gray-orange ${!isMobile ? "dark:bg-light-orange" : "dark:bg-dark-gray"}`,
                    `w-[300px] sm:w-full flex items-center justify-center tracking-widest text-center h-full text-white ${!isMobile ? "dark:text-dark-gray" : "dark:text-white"} cursor-pointer transition-colors duration-300`,
                  )}
                >
                  {page.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
