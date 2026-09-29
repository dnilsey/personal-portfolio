"use client";

import GenericButton from "../shared/inputs/GenericButton";
import GenericInput from "../shared/inputs/GenericInput";
import GenericTextArea from "../shared/inputs/GenericTextArea";
import WithNavLayout from "../shared/layouts/WithNavLayout";
import ArrowRight from "../shared/svgs/ArrowRight";
import Email from "../shared/svgs/Email";
import Location from "../shared/svgs/Location";
import Mobile from "../shared/svgs/Mobile";
import SocialLinks from "../shared/SocialLinks";

const Contact = () => {
  return (
    <WithNavLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full h-full py-6 sm:py-10 gap-10 sm:gap-20 px-4 sm:px-8">
        <div className="w-full h-full flex flex-col justify-start items-center bg-surface text-foreground border border-border mt-6 sm:mt-10 rounded-lg shadow-lg px-4 sm:px-6 pt-6 pb-10">
          <div className="font-zalando-sans-expanded w-full text-center px-0 sm:px-2 font-extrabold text-primary text-6xl sm:text-6xl tracking-wide sm:tracking-widest">
            Get In Touch
          </div>
          <div className="w-full grid font-poppins font-bold font-md px-2 sm:px-6 grid-cols-1 sm:grid-cols-2 pt-10 gap-4 sm:gap-6">
            <div className="flex gap-4 justify-start items-start">
              <Mobile className="w-6 h-6 text-primary shrink-0" />
              <div>(+63) 967 243 5308</div>
            </div>
            <div className="flex gap-4 justify-start items-start">
              <Email className="w-6 h-6 text-primary shrink-0" />
              <div>d.nilsey@gmail.com</div>
            </div>
            <div className="flex gap-4 justify-start items-start">
              <Location className="w-7 h-7 text-primary shrink-0" />
              <div>Tagaytay City, Cavite, Philippines</div>
            </div>

            <SocialLinks className="pt-4 sm:pt-0 justify-end sm:justify-start" />
          </div>
        </div>
        <form className="w-full sm:w-[80%] px-4 sm:px-0 font-poppins text-foreground font-bold font-md grid grid-cols-1 sm:grid-cols-2 space-y-4  gap-x-6 pt-2 sm:pt-10">
          <div className="flex flex-col justify-start items-center w-full">
            <div className="w-full">Name</div>
            <GenericInput type="text" placeholder="Nilsey" />
          </div>
          <div className="flex flex-col justify-start items-center w-full">
            <div className="w-full">Email</div>
            <GenericInput type="email" placeholder="user@gmail.com" />
          </div>
          <div className="flex col-span-1 sm:col-span-2 flex-col justify-start items-center w-full">
            <div className="w-full">Message</div>
            <GenericTextArea placeholder="Your Message" />
          </div>

          <div className="w-full flex justify-end items-center col-span-1 sm:col-span-2 pt-0 sm:pt-4">
            <div className="w-full sm:w-fit">
              <GenericButton type="submit">
                Submit
                <ArrowRight className="w-6 h-6 ml-2" />
              </GenericButton>
            </div>
          </div>
        </form>
      </div>
    </WithNavLayout>
  );
};
export default Contact;
