import { CONTACT } from "@/components/contact/data";
import { useSyncExternalStore } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: CONTACT.timeZone,
});

const subscribeToMinute = (onChange: () => void) => {
  const timer = setInterval(onChange, 15_000);
  return () => clearInterval(timer);
};

export const useLocalTime = () =>
  useSyncExternalStore(
    subscribeToMinute,
    () => timeFormatter.format(new Date()),
    () => null,
  );
