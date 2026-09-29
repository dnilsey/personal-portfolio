import Image from "next/image";
import Link from "next/link";
import WithNavLayout from "../shared/layouts/WithNavLayout";

const STATS = [
  { value: "7+", label: "Years building software" },
  { value: "2", label: "Team lead roles" },
  { value: "7", label: "Production apps shipped" },
];

const FOCUS_AREAS = [
  {
    title: "Build",
    description:
      "Web and mobile apps from architecture through deployment, with a focus on performance and responsive, cross-device UI.",
    tools: ["Next.js", "React", "TypeScript", "React Native", "Tailwind CSS"],
  },
  {
    title: "Integrate",
    description:
      "Secure APIs for authentication, payments, and email, working closely with backend engineers on end-to-end features.",
    tools: ["Node.js", "REST APIs", "AWS", "MySQL", "CI/CD"],
  },
  {
    title: "Lead",
    description:
      "Running Agile teams, planning sprints, mentoring developers through code reviews, and working directly with international clients.",
    tools: ["Agile / Scrum", "Code reviews", "Mentoring", "Client communication"],
  },
];

const DETAILS = [
  {
    label: "Education",
    value: "BS Computer Science",
    note: "De La Salle University – Dasmariñas",
  },
  {
    label: "Languages",
    value: "English, Filipino",
    note: "Professional · Native",
  },
  {
    label: "Based in",
    value: "Tagaytay City",
    note: "Cavite, Philippines",
  },
];

const About = () => {
  return (
    <WithNavLayout>
      <div className="w-full font-poppins text-foreground px-6 sm:px-12 pt-6 md:pt-24 pb-24">
        {/* Intro */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative w-48 sm:w-60 md:w-72 lg:w-80 aspect-square">
              {/* Offset accent ring, matching the landing page portrait */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-full border-2 border-primary" />
              <div className="relative w-full h-full overflow-hidden rounded-full bg-surface border border-border shadow-lg">
                <Image
                  src="/images/about-page-image.jpg"
                  alt="Illustration of Nilsey Diaz"
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              About me
            </div>
            <h1 className="mt-3 font-zalando-sans-expanded font-bold tracking-wide text-3xl sm:text-4xl lg:text-5xl">
              Software Engineer &amp; Team Lead
            </h1>
            <div className="mt-6 max-w-prose space-y-4 text-base sm:text-lg leading-relaxed text-foreground">
              <p>
                I&apos;ve spent 7+ years building web and mobile products, from
                the interface people use to the APIs and cloud services behind
                it. I currently lead a front-end team at GSS Lab, and before
                that I was a Full Stack Team Lead at Klaudsol.
              </p>
              <p className="text-muted-foreground">
                I care about shipping reliable software and helping the people
                around me do their best work, whether that&apos;s mentoring a
                developer, planning a sprint, or clarifying requirements
                directly with a client.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 md:mt-24 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-surface">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-3 py-6 sm:py-8 text-center">
              <div className="font-zalando-sans-expanded font-bold text-primary text-3xl sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* What I do */}
        <section className="mt-16 md:mt-24">
          <h2 className="font-zalando-sans-expanded font-bold text-2xl sm:text-3xl">
            What I do
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOCUS_AREAS.map((area, index) => (
              <div
                key={area.title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary"
              >
                <div className="text-sm font-medium text-primary">
                  0{index + 1}
                </div>
                <h3 className="mt-2 text-xl font-semibold">{area.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {area.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full bg-surface-muted px-3 py-1 text-xs sm:text-sm text-foreground"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Details */}
        <section className="mt-16 md:mt-24">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="border-l-4 border-primary pl-4">
                <dt className="text-sm uppercase tracking-widest text-muted-foreground">
                  {detail.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold">{detail.value}</dd>
                <dd className="text-sm text-muted-foreground">{detail.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Call to action */}
        <section className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-surface-muted p-6 sm:p-10">
          <div>
            <h2 className="font-zalando-sans-expanded font-bold text-xl sm:text-2xl">
              Let&apos;s work together
            </h2>
            <p className="mt-2 text-muted-foreground">
              Have a project or a role in mind? I&apos;d love to hear about it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary-hover"
            >
              Get in touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium tracking-wide text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View projects
            </Link>
          </div>
        </section>
      </div>
    </WithNavLayout>
  );
};

export default About;
