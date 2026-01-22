"use client";

import { classNames } from "@/app/lib/classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Home from "../svgs/Home";
import About from "../svgs/About";
import Experience from "../svgs/Experience";
import Projects from "../svgs/Projects";
import Skills from "../svgs/Skills";
import Contact from "../svgs/Contact";

export default function SideNav() {
  const pathname = usePathname();

  const iconClass = "w-6 h-6 text-gray-900 dark:text-white";
  const pages = [
    { name: "Home", href: "/", icon: <Home className={iconClass} /> },
    { name: "About", href: "/about", icon: <About className={iconClass} /> },
    {name: "Experience", href: "/experience", icon: <Experience className={iconClass} />},
    { name: "Projects", href: "/projects", icon: <Projects className={iconClass} /> },
    { name: "Skills", href: "/skills", icon: <Skills className={iconClass} /> },
    { name: "Contact", href: "/contact", icon: <Contact className={iconClass} /> },
  ]
  return (
    <nav className="w-60 shadow-md h-full bg-primary dark:bg-gray-900 fixed top-0 left-0 z-10 flex inline-flex flex-col items-center justify-start gap-10 px-4 py-8">
      <div className="w-16 h-16 bg-white font-inter text-gray-900 font-bold text-lg rounded-full shadow-md flex items-center justify-center">
        ND
      </div>
      <ul className="flex flex-col justify-center items-start p-6 border-t w-full pt-10 border-white dark:border-white gap-8 font-inter font-bold text-lg">
        {pages.map((page) => (
          <li 
            key={page.name} 
          >
            <Link href={page.href} className="flex inline-flex gap-4 items-center">
              {page.icon}
              <div className={classNames(pathname === page.href ? "text-gray-900 border-b-2 border-gray-900 dark:border-white" : "text-gray-900", "hover:text-gray-900 dark:text-white cursor-pointer transition-colors duration-300")}>
                {page.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>      
    </nav>
  )
}