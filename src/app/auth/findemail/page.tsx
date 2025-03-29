"use client";

import { FindEmailResult, FindEmailForm } from "@/fsd_widgets/auth";
import { useFindAccountStore } from "@/shared";
import React, { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

const FindEmailPage = () => {
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
  );
};

export default FindEmailPage;
