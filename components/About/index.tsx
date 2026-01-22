"use client";

import Image from "next/image";
import WithNavLayout from "../shared/layouts/WithNavLayout";

const About = () => {
  return (
    <WithNavLayout>
      <div className="flex flex-col justify-start items-center w-full h-full">
        <div>Profile</div>
        <div>
          I&apos;m a Front-End Developer specializing in building scalable,
          maintainable web applications using modern React and Next.js. I focus
          on delivering reliable, well-structured user interfaces that support
          real-world business requirements. I work closely with cross-functional
          teams to translate requirements into clean, predictable UI components,
          with an emphasis on code quality, performance, and long-term
          maintainability.
        </div>
        <div>Language</div>
        <div>Education</div>
        <Image
          src="/images/about-page-image.jpg"
          alt="About Me"
          width={300}
          height={300}
          className="rounded-full mb-8"
        />
      </div>
    </WithNavLayout>
  );
};

export default About;
