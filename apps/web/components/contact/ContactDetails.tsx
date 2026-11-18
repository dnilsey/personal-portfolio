"use client";

import { SOCIAL_LINKS } from "@/constants/socials";
import { useState, useSyncExternalStore } from "react";
import Email from "../shared/svgs/Email";
import ExternalLink from "../shared/svgs/ExternalLink";
import Location from "../shared/svgs/Location";
import Mobile from "../shared/svgs/Mobile";
import { CONTACT } from "./data";

// --- Live local time ----------------------------------------------------------

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: CONTACT.timeZone,
});

const subscribeToMinute = (onChange: () => void) => {
  const timer = setInterval(onChange, 15_000);
  return () => clearInterval(timer);
};

// Only rendered in the browser; the server has no idea what time it is for the visitor.
const useLocalTime = () =>
  useSyncExternalStore(
    subscribeToMinute,
    () => timeFormatter.format(new Date()),
    () => null,
  );

// --- Cards -------------------------------------------------------------------

const Card = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-primary">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

const actionClass =
  "text-sm font-medium text-primary hover:text-primary-hover cursor-pointer";

const EmailCard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the address is still visible to copy by hand.
    }
  };

  return (
    <Card icon={<Email className="w-5 h-5" />} label="Email">
      <div className="font-semibold break-all">{CONTACT.email}</div>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button type="button" onClick={copy} className={actionClass}>
          {copied ? "Copied" : "Copy address"}
        </button>
        <a href={`mailto:${CONTACT.email}`} className={actionClass}>
          Open mail app
        </a>
        <span role="status" className="sr-only">
          {copied ? "Email address copied" : ""}
        </span>
      </div>
    </Card>
  );
};

const ContactDetails = () => {
  const localTime = useLocalTime();

  return (
    <div className="flex flex-col gap-4">
      <EmailCard />

      <Card icon={<Mobile className="w-5 h-5" />} label="Phone">
        <a
          href={CONTACT.phoneHref}
          className="font-semibold hover:text-primary transition-colors duration-200"
        >
          {CONTACT.phone}
        </a>
      </Card>

      <Card icon={<Location className="w-5 h-5" />} label="Based in">
        <div className="font-semibold">{CONTACT.location}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          {localTime ? `It's ${localTime} here · ` : ""}
          {CONTACT.timeZoneLabel} · Open to remote
        </div>
      </Card>

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
