'use client';

import { FormDetailResult, FormResultHeader, FormSummaryResult } from '@/widgets/form/ui';

import { useFormResultStore } from '@/entities/form';

import { PreviousButton } from '@/shared';

const FormInfoPage = () => {
  const resultView = useFormResultStore((state) => state.resultView);

  return (
    <div className="h-full w-full pt-3">
      <PreviousButton className="pl-5" />
      <FormResultHeader />
      <main className="flex h-[calc(100%-6rem)] w-full flex-col items-center gap-8 overflow-auto pt-4 pb-10">
        {resultView === 'summary' && <FormSummaryResult />}
        {resultView === 'detail' && <FormDetailResult />}
      </main>
    </div>
  );
};

export default FormInfoPage;
