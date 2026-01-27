"use client";

import React from "react";

const GenericInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      className="w-full font-poppins border mt-1 font-normal text-md text-gray-900 dark:text-white rounded-lg h-12 px-4"
      {...props}
    />
  );
};

export default GenericInput;
