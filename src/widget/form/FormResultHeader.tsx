"use client";

import {
  DetailToggleBtn,
  ExcelDownloadBtn,
  FormStatusToggleBtn,
  LoadingComponent,
  SummaryToggleBtn,
} from "@/entities";
import { FormService, useFormResultStore } from "@/shared";

import { useParams } from "next/navigation";

export const FormResultHeader = () => {
  const params = useParams();
  const { formId } = params;

  const { useGetFormInfo } = FormService();
  const { isPending } = useGetFormInfo(formId as string);

  const formData = useFormResultStore((state) => state.formData);

  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <header>
      <p className="absolute top-6 w-full text-center text-[18px] font-bold sm:hidden">
        {formData?.title}
      </p>
      <div className="flex h-24 items-end justify-between pb-4 sm:flex-row">
        <p className="hidden pl-4 text-3xl font-bold sm:block">
          {formData?.title}
        </p>
        <div className="flex gap-2 sm:gap-4">
          <SummaryToggleBtn />
          <DetailToggleBtn />
        </div>
        <div className="flex gap-2 sm:gap-4 sm:pr-4">
          <FormStatusToggleBtn />
          <ExcelDownloadBtn />
        </div>
      </div>
    </header>
  );
};
