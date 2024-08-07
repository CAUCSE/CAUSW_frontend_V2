import clsx from "clsx";
import { ReactNode } from "react";

export const CardBox = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        className,
        "rounded-[15px] p-[4px] shadow-[0,0px,10px,0px,rgba(0,0,0,0.14)]",
      )}
    >
      {children}
    </div>
  );
};
