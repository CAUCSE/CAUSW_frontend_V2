'use client';

import { useShallow } from 'zustand/react/shallow';

import { useFormResultStore } from '@/entities/form';

export const SummaryToggleBtn = () => {
  const { resultView, setResultView } = useFormResultStore(
    useShallow((state) => ({
      resultView: state.resultView,
      setResultView: state.setResultView,
    })),
  );

  const toggleSummaryBtn = () => {
    setResultView('summary');
  };

  return (
    <button
      className={`flex h-7 w-12 items-center justify-center rounded-3xl border border-black sm:h-10 sm:w-16 ${resultView === 'summary' ? 'bg-[#76C6D1]' : 'bg-white'}`}
      onClick={toggleSummaryBtn}
    >
      <p className="text-[12px] font-bold sm:text-[16px]">요약</p>
    </button>
  );
};
