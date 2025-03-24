"use client";

import { useEffect } from "react";
import { useLayoutStore } from "@/shared";

export const ErrorMessage = () => {
  const { errorMessage, setErrorMessage } = useLayoutStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <div
      className={`${
        errorMessage ? "block" : "hidden"
      } w-72 fixed top-8 left-1/2 transform -translate-x-1/2 bg-error text-center text-white px-5 py-2.5 rounded shadow-md text-sm z-50 transition-opacity duration-500 md:w-80 md:text-base`}
    >
      {errorMessage}
    </div>
  );
};
