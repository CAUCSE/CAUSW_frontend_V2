'use client';

import { useParams } from 'next/navigation';

import { useExportExcelFile } from '@/fsd_entities/form/model';

export const ExcelDownloadBtn = () => {
  const params = useParams();
  const { formId } = params;

  const { mutate: downloadExcelFile } = useExportExcelFile();

  return (
    <button
      className={`flex h-7 w-24 items-center justify-center rounded-3xl border border-black bg-[##76C6D1] sm:h-10 sm:w-32`}
      onClick={() => downloadExcelFile({ formId: formId as string })}
    >
      <p className="text-[12px] font-bold sm:text-[16px]">Excel export</p>
    </button>
  );
};
