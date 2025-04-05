'use client';

import { useParams } from 'next/navigation';

import { FormService, useFormResultStore } from '@/shared';

export const FormStatusToggleBtn = () => {
  const params = useParams();
  const { formId } = params;
  const { useUpdateFormClosedStatus } = FormService();
  const { mutate: updateFormClosedStatus } = useUpdateFormClosedStatus();
  const formData = useFormResultStore(state => state.formData);

  const setFormState = () => {
    updateFormClosedStatus({ formId: formId as string });
  };

  return (
    <button
      className={`flex h-7 w-12 items-center justify-center rounded-3xl border border-black bg-[##76C6D1] sm:h-10 sm:w-16`}
      onClick={setFormState}
    >
      <p className="text-xs font-bold sm:text-base">{formData?.isClosed ? '재시작' : '마감'}</p>
    </button>
  );
};
