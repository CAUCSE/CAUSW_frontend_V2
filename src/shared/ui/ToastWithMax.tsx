"use client";

import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useEffect, useState } from "react";

export const ToastWithMax = () => {
  const { toasts } = useToasterStore();
  const [toastLimit] = useState(1);

  useEffect(() => {
    toasts
      .filter((toast) => toast.visible)
      .filter((_, index) => index >= toastLimit)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, toastLimit]);

  return <Toaster position="top-center" reverseOrder={false} />;
};
