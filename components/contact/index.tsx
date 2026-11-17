import WithNavLayout from "../shared/layouts/WithNavLayout";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import { CONTACT } from "./data";

const Contact = () => {
  return (
    <WithNavLayout>
      <div className="w-full font-poppins text-foreground px-6 sm:px-12 pt-6 md:pt-24 pb-24">
        <header>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Contact
          </div>
          <h1 className="mt-3 font-zalando-sans-expanded font-bold tracking-wide text-3xl sm:text-4xl lg:text-5xl">
            Let&apos;s work together
          </h1>
          <p className="mt-4 max-w-prose text-base sm:text-lg leading-relaxed text-muted-foreground">
            Hiring for a front-end or senior engineering role, or have a project
            in mind? Send me a message. I usually reply within a day or two.
          </p>
          {CONTACT.openToOpportunities && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Open to new opportunities
            </div>
          )}
        </header>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-6 lg:gap-10 items-start">
          {/* Form first on mobile: it's the main action */}
          <div className="lg:order-2">
            <ContactForm />
          </div>
          <section aria-label="Contact details" className="lg:order-1">
            <ContactDetails />
          </section>
        </div>
      </div>
    </WithNavLayout>
  );
};

export default Contact;
