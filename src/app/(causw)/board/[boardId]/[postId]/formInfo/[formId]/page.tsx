'use client';

import { PreviousButton, useFormResultStore } from '@/shared';
import { FormDetailResult, FormResultHeader, FormSummaryResult } from '@/widget';

const FormInfoPage = () => {
  const resultView = useFormResultStore(state => state.resultView);

  return (
    <>
      <PreviousButton />
      {
        <>
          <FormResultHeader />
          <main className="flex h-[calc(100%-6rem)] w-full flex-col items-center gap-8 overflow-auto pb-10 pt-4">
            {resultView === 'summary' && <FormSummaryResult />}
            {resultView === 'detail' && <FormDetailResult />}
          </main>
        </>
      }
    </>
  );
};

export default FormInfoPage;
