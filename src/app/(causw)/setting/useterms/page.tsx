"use client";
import { UseTerms } from "@/_deprecated/entities/home/useTerms";
import { useRouter } from "next/navigation";

const useTermsPage = () => {
  const router = useRouter();

  return (
    <UseTerms
      closeModal={() => {
        router.push("./");
      }}
    ></UseTerms>
  );
};

export default useTermsPage;
