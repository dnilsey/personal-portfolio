"use client";

import React from "react";

const GenericTextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ ...props }) => {
  return (
    <textarea
      className="w-full font-poppins border text-md mt-1 font-normal text-gray-900 dark:text-white rounded-lg h-32 px-4 py-2"
      {...props}
    />
  );
};

export default GenericTextArea;
