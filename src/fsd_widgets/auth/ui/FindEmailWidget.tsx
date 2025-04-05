import { useShallow } from "zustand/react/shallow";
import { FindEmailForm } from "./FindEmailForm";
import { FindEmailResult } from "./FindEmailResult";
import { useFindAccountStore } from "@/shared";
import { useCallback } from "react";

export const FindEmailWidget = () => {
    const { email, resetFindAccountStore } =
    useFindAccountStore(
      useShallow((state) => ({
        email: state.email,
        resetFindAccountStore: state.resetFindAccountStore,
      })),
    );
  
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-boardPageBackground px-4 sm:px-0"
        ref={useCallback(() => {
          resetFindAccountStore();
        }, [])}
      >
        {email !== "" ? (
          <FindEmailResult />
        ) : (
          <FindEmailForm />
        )}
      </div>
    );};

