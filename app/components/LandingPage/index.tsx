import Image from "next/image";
import WithNavLayout from "../shared/layouts/WithNavLayout";

const LandingPage = () => {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/dnilsey", icon: "/icons/github.png" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/nilsey-diaz-359041165", icon: "/icons/linkedin.png" },
    { name: "Facebook", href: "https://www.facebook.com/nilsey.diaz", icon: "/icons/facebook.png" },
  ];
  return (
    <WithNavLayout>
      <div className="w-full h-full font-inter px-14 py-10">
        <div className="w-full h-full flex inline-flex gap-26 justify-start items-start border border-gray-900 p-8">
          <div className="flex flex-col justify-start items-start pt-20 pl-6 w-auto h-full font-inter">
            <div className="font-bold text-gray-900 text-4xl">Nilsey Diaz</div>
            <div className="text-xl font-justify mt-4">
              I&apos;m a Frontend Developer specializing in React, Next.js, and modern web technologies. I build responsive, high-performance web apps with clean, maintainable code.
            </div>

            <div className="flex gap-4 mt-20">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Image src={link.icon} alt={`${link.name} icon`} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-fit h-full bg-red-100 flex items-center justify-center">
            <Image
              src="/images/landing-page-portrait.jpg"
              alt="Nilsey Diaz Portrait"
              width={620}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </WithNavLayout>
  )
}

export default LandingPage;