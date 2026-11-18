"use client";

import React from "react";

const GenericTextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ ...props }) => {
  return (
    <textarea
      className="w-full font-poppins border border-border bg-surface placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-md mt-1 font-normal text-foreground rounded-lg h-32 px-4 py-2"
      {...props}
    />
  );
};

export default GenericTextArea;
