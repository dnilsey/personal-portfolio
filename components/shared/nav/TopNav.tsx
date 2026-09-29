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
          ? `${isOpen ? "h-full bg-background gap-10 items-center justify-start" : "h-14 bg-surface border-b border-border items-start justify-between"} px-4 py-3 w-full top-0 left-0 flex-col`
          : "top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-7xl h-12 items-center justify-end bg-surface border border-border rounded-full shadow-sm overflow-hidden",
        "fixed z-10 flex",
      )}
    >
      {!isOpen && (
        <button className="block sm:hidden" onClick={toggle}>
          <Menu className="w-8 h-8 text-foreground" />
        </button>
      )}

      {isMobile && isOpen && (
        <button
          className="flex justify-end items-center w-full"
          onClick={toggle}
        >
          <Xmark className="w-6 h-6 text-foreground cursor-pointer" />
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
                    : `${!isMobile ? "border-l border-border" : ""}`,
                  "flex inline-flex gap-4 justify-center h-12 w-full items-center",
                )}
                onClick={close}
              >
                <div
                  className={classNames(
                    pathname === page.href
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-muted",
                    `w-[300px] sm:w-full flex items-center justify-center tracking-widest text-center h-full cursor-pointer transition-colors duration-300 ${isMobile ? "rounded-full" : ""}`,
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
