import Image from "next/image";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import { SOCIAL_LINKS } from "@/app/constants/socials";

const LandingPage = () => {
  return (
    <WithNavLayout>
      <div className="w-full h-full font-inter px-4 sm:px-8 py-4 sm:py-4">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-26 justify-end items-end border border-gray-900 dark:border-white p-4 sm:p-8">
          <div className="order-2 sm:order-1 flex flex-col justify-start items-start pt-10 sm:pt-20 pl-0 sm:pl-6 w-auto h-full font-inter">
            <div className="font-bold text-gray-900 dark:text-white text-4xl">Nilsey Diaz</div>
            <div className="text-md sm:text-xl text-justify sm:text-left text-gray-900 dark:text-white mt-4">
              I&apos;m a Frontend Developer specializing in React, Next.js, and modern web technologies. I build responsive, high-performance web apps with clean, maintainable code.
            </div>

            <div className="flex gap-4 mt-20">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Image src={link.icon} alt={`${link.name} icon`} width={28} height={28} />
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 bg-primary sm:order-2 w-full h-full flex items-center justify-center">
            <Image
              src="/images/landing-page-portrait.jpg"
              alt="Nilsey Diaz Portrait"
              width={320}
              height={320}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </WithNavLayout>
  )
}

export default LandingPage;