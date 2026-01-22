"use client";

import Image from "next/image";
import WithNavLayout from "../shared/layouts/WithNavLayout";

const About = () => {
  return (
    <WithNavLayout>
      <div className="font-inter text-gray-900 dark:text-white p-4 w-full h-full">
        <div className="flex flex-col border-2 py-6 sm:py-10 border-primary justify-start items-center gap-4 px-6 sm:px-14">
          <h1 className="font-bold w-full text-center font-inter text-3xl">
            ABOUT ME
          </h1>
          <div className="italic text-justify font-normal pt-4 sm:pt-2">
            I&apos;m a <b className="text-violet-500">Front-End Developer</b>{" "}
            specializing in building scalable, maintainable web applications
            using modern <b className="text-violet-500">React and Next.js.</b> I
            focus on delivering reliable, well-structured user interfaces that
            support real-world business requirements. I work closely with
            cross-functional teams to translate requirements into clean,
            predictable UI components, with an emphasis on code quality,
            performance, and long-term maintainability.
          </div>
          <div className="w-full flex flex-col-reverse sm:flex-row justify-start items-start gap-10 pt-8 sm:pt-10">
            <Image
              src="/images/about-page-image.jpg"
              alt="About Me"
              width={300}
              height={300}
              className="rounded-full mb-8"
            />
            <div className="flex flex-col justify-start items-start w-full gap-8 pt-4 sm:pt-8">
              <div className="border-l-4 border-violet-500 font-normal italic text-md sm:text-lg font-inter pl-4 ml-0 sm:ml-6">
                <b className="font-bold not-italic text-xl">Languages</b>
                <br /> English (Professional), Filipino (Native)
              </div>
              <div className="border-l-4 font-normal border-violet-500 italic text-md sm:text-lg font-inter pl-4 ml-0 sm:ml-6">
                <b className="font-bold not-italic text-xl">Education</b>
                <br /> Bachelor of Science in Computer Science
                <br />{" "}
                <span className="text-sm text-gray-600 dark:text-white">
                  De La Salle University – Dasmariñas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithNavLayout>
  );
};

export default About;
