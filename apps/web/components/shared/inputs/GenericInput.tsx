"use client";

import React from "react";

const GenericInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      className="w-full font-poppins border border-border bg-surface placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition mt-1 font-normal text-md text-foreground rounded-lg h-12 px-4"
      {...props}
    />
  );
};

export default GenericInput;
