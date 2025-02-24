"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastWithMax } from "@/shared";

const queryClient = new QueryClient();

const QueryClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <QueryClientProvider client={queryClient}>
    <>
      <ToastWithMax/>
      {children}
    </>
  </QueryClientProvider>
);

export default QueryClientLayout;
