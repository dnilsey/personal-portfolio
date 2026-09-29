import Image from "next/image";
import Link from "next/link";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import SocialLinks from "../shared/SocialLinks";
import ArrowRight from "../shared/svgs/ArrowRight";

const LandingPage = () => {
  return (
    <WithNavLayout>
      <div className="w-full font-poppins px-6 sm:px-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-12 items-center pt-6 md:pt-24">
          <div className="order-2 md:order-1 flex flex-col items-start">
            <div className="font-light tracking-widest text-muted-foreground text-2xl sm:text-3xl">
              Hello, I&apos;m
            </div>
            <h1 className="font-bold pt-2 tracking-wider font-zalando-sans-expanded text-primary text-4xl sm:text-5xl lg:text-6xl">
              Nilsey Diaz
            </h1>
            <p className="max-w-prose text-base sm:text-lg leading-relaxed tracking-wide text-foreground mt-6">
              I&apos;m a Software Engineer and Team Lead with 7+ years of
              experience building web and mobile products end to end, from
              React, Next.js, and React Native front ends to Node.js APIs and AWS
              infrastructure. I lead Agile teams, work directly with international
              clients, and take products from architecture through deployment.
            </p>

            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary-hover"
              >
                View projects
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Contact me
              </Link>
            </div>

            <SocialLinks className="mt-8 sm:mt-10" />
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-40 sm:w-56 md:w-72 lg:w-80 aspect-square">
              {/* Offset accent ring behind the portrait */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-full border-2 border-primary" />
              <div className="relative w-full h-full overflow-hidden rounded-full bg-surface border border-border shadow-lg">
                <Image
                  src="/images/landing-page-portrait.webp"
                  alt="Portrait of Nilsey Diaz"
                  fill
                  priority
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, 320px"
                  className="object-cover object-top"
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
