"use client";

import { SOCIAL_LINKS } from "@/constants/socials";
import ExternalLink from "../shared/svgs/ExternalLink";
import Location from "../shared/svgs/Location";
import Mobile from "../shared/svgs/Mobile";
import { CONTACT } from "./data";
import { useLocalTime } from "@/hooks/useLocalTime";
import { ContactCard } from "./ContactCard";
import { EmailCard } from "./EmailCard";

const ContactDetails = () => {
  const localTime = useLocalTime();

  return (
    <div className="flex flex-col gap-4">
      <EmailCard />

      <ContactCard icon={<Mobile className="w-5 h-5" />} label="Phone">
        <a
          href={CONTACT.phoneHref}
          className="font-semibold hover:text-primary transition-colors duration-200"
        >
          {CONTACT.phone}
        </a>
      </ContactCard>

      <ContactCard icon={<Location className="w-5 h-5" />} label="Based in">
        <div className="font-semibold">{CONTACT.location}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          {localTime ? `It's ${localTime} here · ` : ""}
          {CONTACT.timeZoneLabel} · Open to remote
        </div>
      </ContactCard>

      <div className="grid grid-cols-2 gap-4">
        {SOCIAL_LINKS.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-primary"
          >
            <span className="flex items-center gap-3 font-semibold">
              <Icon className="w-6 h-6 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
              {name}
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
