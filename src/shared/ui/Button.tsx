"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type Variant = "BLUE" | "RED" | "GRAY";

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  goBack?: boolean;
  action: () => void;
}

const variantClass: Record<Variant, string> = {
  BLUE: "bg-[rgba(107,190,236,1)]",
  RED: "bg-[rgba(255,0,0,1)] text-white",
  GRAY: "bg-[rgba(186,186,186,1)]",
};

export function Button({
  variant,
  action,
  className,
  goBack,
  children,
  ...props
}: ButtonProp) {
  return (
    <button
      className={clsx(className, variantClass[variant], "rounded-[10px]")}
      onClick={() => {
        action();
        goBack && window.history.back();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
