'use client';

import { useTruncateParagraph } from '@/fsd_shared';

interface FormSummaryResultQuestionHeaderProps {
  summaryFormResult?: Form.QuestionSummaryResponseDto[];
  question: Form.QuestionSummaryResponseDto;
  questionIndex: number;
}

export const FormSummaryResultQuestionHeader = ({
  summaryFormResult,
  question,
  questionIndex,
}: FormSummaryResultQuestionHeaderProps) => {
  const { textRefs, isTruncated } = useTruncateParagraph<Form.QuestionSummaryResponseDto>(summaryFormResult);

  return (
    <div className={`group relative flex w-full items-center justify-start`}>
      <div className="relative w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
        <p
          className="truncate text-[14px] group-hover:block sm:text-xl"
          ref={(el) => {
            textRefs.current[questionIndex] = el;
          }}
        >
          {question.questionText}
        </p>
        {isTruncated[questionIndex] && (
          <span className="absolute top-full left-0 hidden w-max bg-gray-800 p-1 text-xs text-white group-hover:block">
            {question.questionText}
          </span>
        )}
      </div>
    </div>
  );
};
