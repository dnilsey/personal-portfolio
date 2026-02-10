import { classNames } from "@/lib/classnames";
import { Dispatch, SetStateAction } from "react";

export const steps = [
  { id: 1, label: "2019" },
  { id: 2, label: "2019 ~ 2021" },
  { id: 3, label: "2021 ~ 2023" },
  { id: 4, label: "2023 ~ Present" },
];
const DesktopStepper = ({
  active,
  setActive,
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full mx-auto max-w-2xl relative mb-8 pt-10">
      <div className="absolute md:top-1/2 md:left-0 md:right-0 md:h-1 md:ml-3 md:w-[calc(100%-70px)] md:mr-13 top-0 left-3 md:left-0 w-1 h-full bg-gray-brown" />

      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => setActive(step.id)}
          className="relative z-10 flex flex-row sm:flex-col items-center md:items-center cursor-pointer focus:outline-none mb-6 md:mb-0"
        >
          <span
            className={classNames(
              active === step.id
                ? "bg-gray-orange border-gray-brown dark:bg-pink dark:border-white"
                : "bg-white border-gray-brown dark:bg-white dark:border-white",
              "w-4 h-4 rounded-full border-2",
            )}
          />
          <span
            className={classNames(
              active === step.id
                ? "text-gray-brown dark:text-pink text-md font-bold"
                : "text-md font-medium dark:text-white",
              "font-poppins mt-0 sm:mt-3 text-center",
            )}
          >
            {step.label}
          </span>
        </button>
      ))}
    </div>
  );
};
export default DesktopStepper;
