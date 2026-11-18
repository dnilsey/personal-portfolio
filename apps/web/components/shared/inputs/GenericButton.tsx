"use client";

import React from "react";

const GenericButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      className="flex justify-center items-center w-full font-poppins font-bold text-md text-primary-foreground bg-primary hover:bg-primary-hover rounded-full h-12 px-6 hover:scale-105 cursor-pointer transition"
      {...props}
    >
      {children}
    </button>
  );
};

export default GenericButton;
