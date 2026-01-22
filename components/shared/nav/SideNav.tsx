"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { classNames } from "@/lib/classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSideNav } from "../../context/NavContext";
import About from "../svgs/About";
import Contact from "../svgs/Contact";
import Experience from "../svgs/Experience";
import Home from "../svgs/Home";
import Projects from "../svgs/Projects";
import Skills from "../svgs/Skills";
import XMark from "../svgs/Xmark";

const iconClass = "w-6 h-6 text-gray-900 dark:text-white";
const pages = [
  { name: "Home", href: "/", icon: <Home className={iconClass} /> },
  { name: "About", href: "/about", icon: <About className={iconClass} /> },
  {
    name: "Experience",
    href: "/experience",
    icon: <Experience className={iconClass} />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <Projects className={iconClass} />,
  },
  { name: "Skills", href: "/skills", icon: <Skills className={iconClass} /> },
  {
    name: "Contact",
    href: "/contact",
    icon: <Contact className={iconClass} />,
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { isOpen, close, toggle } = useSideNav();

  return (
    <div>
      {(isOpen || !isMobile) && (
        <nav className="w-full sm:w-60 shadow-md h-full bg-primary dark:bg-gray-900 fixed top-0 left-0 z-10 flex inline-flex flex-col items-center justify-start px-4 py-8">
          {isMobile && (
            <button
              className="flex justify-end items-center w-full"
              onClick={toggle}
            >
              <XMark className="w-6 h-6 text-gray-900 dark:text-white cursor-pointer" />
            </button>
          )}
          <div className="w-20 h-20 mb-10 bg-white font-inter text-gray-900 font-bold text-xl rounded-full shadow-md flex items-center justify-center">
            ND
          </div>
          <ul className="flex flex-col justify-center items-start p-6 border-t w-full pt-10 border-white dark:border-white gap-8 font-inter font-bold text-lg">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  href={page.href}
                  className="flex inline-flex gap-4 items-center"
                  onClick={close}
                >
                  {page.icon}
                  <div
                    className={classNames(
                      pathname === page.href
                        ? "text-gray-900 border-b-2 border-gray-900 dark:border-white"
                        : "text-gray-900",
                      "hover:text-gray-900 dark:text-white cursor-pointer transition-colors duration-300",
                    )}
                  >
                    {page.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
