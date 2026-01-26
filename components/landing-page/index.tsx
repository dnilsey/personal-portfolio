import Image from "next/image";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import { SOCIAL_LINKS } from "@/constants/socials";

const LandingPage = () => {
  return (
    <WithNavLayout>
      <div className="w-full h-full font-poppins px-4 py-8 sm:py-20">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 justify-center items-center p-4 sm:p-8">
          <div className="order-2 sm:order-1 flex flex-col justify-start items-start pt-10 sm:pt-20 pl-0 sm:pl-6 w-auto h-full">
            <div className="font-thin font-poppins tracking-widest text-gray-900 dark:text-white text-2xl sm:text-4xl">
              Hello, I&apos;m
            </div>
            <div className="font-bold pt-2 tracking-widest font-zalando-sans-expanded text-gray-900 dark:text-white text-4xl sm:text-5xl">
              Nilsey Diaz
            </div>
            <div className="text-md sm:text-xl pt-4 sm:pt-6 font-poppins tracking-wide text-left text-gray-900 dark:text-white mt-4">
              I&apos;m a Frontend Developer specializing in React, Next.js, and
              modern web technologies. I build responsive, high-performance web
              apps with clean, maintainable code.
            </div>

            <div className="flex gap-4 mt-20">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={link.icon}
                    alt={`${link.name} icon`}
                    width={28}
                    height={28}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center w-full order-1 sm:order-2">
            <div className="ml-0 sm:ml-4 bg-white p-2 sm:p-10 overflow-hidden rounded-full w-[200px] sm:w-[300px] transform rotate-[35deg] h-[300px] sm:h-[400px] flex items-center justify-center">
              <div className="w-[250px] mt-20 sm:w-[300px] h-[340px] sm:h-[400px] overflow-hidden rotate-[-35deg]">
                <Image
                  src="/images/landing-page-portrait.png"
                  alt="Nilsey Diaz Portrait"
                  fill
                  className="object-cover pl-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithNavLayout>
  );
};

export default LandingPage;
