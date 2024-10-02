"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";

type Variant = "BLUE" | "RED" | "GRAY";

interface ButtonProp extends HTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  action: () => void;
}

const variantClass: Record<Variant, string> = {
  BLUE: "bg-[rgba(107,190,236,1)]",
  RED: "bg-[rgba(255,0,0,1)] text-white",
  GRAY: "bg-[rgba(186,186,186,1)]",
};

export function Button({ variant, action, className, children }: ButtonProp) {
  return (
    <button
      className={clsx(className, variantClass[variant], "rounded-[10px]")}
      onClick={action}
    >
      {children}
    </button>
  );
}
