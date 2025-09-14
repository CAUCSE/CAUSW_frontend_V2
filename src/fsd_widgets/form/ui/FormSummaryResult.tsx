'use client';

import { useParams } from 'next/navigation';

import {
  FormSummaryResultQuestionHeader,
  ObjectiveQuestionSummaryResult,
  SubjectiveQuestionSummaryResult,
} from '@/entities/form/ui';
import { useGetFormSummaryResult } from '@/entities/form/model';
import { useFormResultStore } from '@/entities/form/model/stores';
import { LoadingComponent } from '@/fsd_shared';

export const FormSummaryResult = () => {
  const params = useParams();
  const { formId } = params;

  const { data: summaryFormResult, isPending, isSuccess } = useGetFormSummaryResult(formId as string);

  const sortedQuestionIdList = useFormResultStore((state) => state.sortedQuestionIdList);

  const summaryFormResultMap = new Map<string, Form.QuestionSummaryResponseDto>();

  if (isSuccess && summaryFormResult) {
    summaryFormResult.forEach((result) => {
      summaryFormResultMap.set(result.questionId, result);
    });
  }

  if (isPending) {
    return <LoadingComponent />;
  }

  return sortedQuestionIdList?.map((questionId, resultIdx: number) => {
    const result = summaryFormResultMap.get(questionId);
    if (!result) {
      return <div key={resultIdx}>질문 조회 실패</div>;
    }

    const objectiveQuestion = {
      id: result.questionId,
      data: result.optionSummarieList
        ?.sort((a, b) => a.optionNumber - b.optionNumber)
        .map((option) => ({
          optionText: option.optionText,
          selectedCount: option.selectedCount,
        })),
    };
    return (
      <section key={result.questionId} className="w-3/4">
        <FormSummaryResultQuestionHeader
          summaryFormResult={summaryFormResult}
          question={result}
          questionIndex={resultIdx}
        />
        <div
          className={`flex min-h-[50px] w-full flex-col gap-2 rounded-xs border border-black bg-white px-3 py-2 sm:min-w-[400px]`}
        >
          {result.questionType === 'OBJECTIVE' ? (
            <ObjectiveQuestionSummaryResult objectiveQuestion={objectiveQuestion} />
          ) : (
            <SubjectiveQuestionSummaryResult question={result} />
          )}
        </div>
      </section>
    );
  });
};
