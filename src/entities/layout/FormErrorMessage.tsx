"use client";

import { useEffect } from "react";
import { useLayoutStore } from "@/shared";
import React from "react";

interface FormErrorMessageProps {
  message?: string;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  message,
}) => {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-500">{message}</p>;
};
