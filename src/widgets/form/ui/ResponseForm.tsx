'use client';

import { useFormContext } from 'react-hook-form';

import { useResponseFormStore } from '@/entities/form/model/stores';

import { ResponseQuestion } from './ResponseQuestion';

interface ResponseFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => Promise<void>;
}

export const ResponseForm = ({ onSubmit }: ResponseFormProps) => {
  const form = useResponseFormStore((state) => state.form);
  const { handleSubmit } = useFormContext();

  return (
    <form
      className="mb-4 flex h-[calc(100%-6rem)] w-full flex-col items-center gap-8 overflow-y-auto pt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {form?.questionResponseDtoList
        .sort(
          (questionA, questionB) =>
            questionA.questionNumber - questionB.questionNumber,
        )
        .map((question: Post.QuestionResponseDto, questionIdx: number) => {
          return (
            <ResponseQuestion
              key={question.questionId}
              question={question}
              questionIdx={questionIdx}
            />
          );
        })}
      <button
        type="submit"
        className="min-h-[40px] w-[240px] rounded-md bg-[#6BBEEC] text-white"
      >
        제출하기
      </button>
    </form>
  );
};
