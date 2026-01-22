"use client";

import { classNames } from "@/app/lib/classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ]
  return (
    <nav className="w-full h-18 bg-alice-blue shadow-md fixed top-0 left-0 z-10 flex inline-flex items-center justify-between px-8 py-4">
      <div className="w-16 h-16 bg-deep-blue font-inter text-alice-blue font-bold text-lg rounded-full shadow-md flex items-center justify-center">
        ND
      </div>
      <div className="grid grid-cols-1 w-fit">
        <ul className="flex space-x-20 font-inter font-bold text-lg">
          {pages.map((page) => (
            <li 
              key={page.name} 
              className={classNames(pathname === page.href ? "text-black" : "text-deep-blue", "hover:text-sky-dancer cursor-pointer transition-colors duration-300")}
            >
              <Link href={page.href}>
                {page.name}
              </Link>
            </li>
          ))}
        </ul>      
      </div>
    </nav>
  )
}