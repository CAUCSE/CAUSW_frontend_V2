"use client";

import { useResponseFormStore, useTruncateParagraph } from "@/shared";

import { ObjectiveOptionList } from "@/_deprecated/widget";
import { SubjectiveOption } from "@/_deprecated/entities";
import { useFormContext } from "react-hook-form";

interface ResponseQuestionProps {
  question: Post.QuestionResponseDto;
  questionIdx: number;
}

export const ResponseQuestion = ({
  question,
  questionIdx,
}: ResponseQuestionProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const form = useResponseFormStore((state) => state.form);
  form?.questionResponseDtoList;
  const { textRefs, isTruncated } =
    useTruncateParagraph<Post.QuestionResponseDto>(
      form?.questionResponseDtoList,
    );

  return (
    <div key={question.questionId} className="w-3/4">
      <div
        className={`group relative flex w-full items-center ${question.isMultiple ? "justify-between" : "justify-start"}`}
      >
        <div className="relative w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
          <p
            className="truncate text-[14px] group-hover:block sm:text-xl"
            ref={(el) => {
              textRefs.current[questionIdx] = el;
            }}
          >
            {question.questionText}
          </p>
          {isTruncated[questionIdx] && (
            <span className="absolute left-0 top-full hidden w-max bg-gray-800 p-1 text-xs text-white group-hover:block">
              {question.questionText}
            </span>
          )}
        </div>
        {question.isMultiple && (
          <p className="text-xs text-[#909090] sm:text-sm">복수 선택 가능</p>
        )}
      </div>

      <div
        className={`${question.questionType === "SUBJECTIVE" ? "justify-end" : ""} flex min-h-[50px] w-full flex-col gap-2 rounded-sm border border-black bg-white px-4 py-2 sm:min-w-[400px]`}
      >
        {question.questionType === "OBJECTIVE" ? (
          <ObjectiveOptionList
            question={question}
            questionIndex={questionIdx}
          />
        ) : (
          <SubjectiveOption questionIdx={questionIdx} />
        )}
        {errors?.questionReplyRequestDtoList?.[questionIdx]?.questionReply && (
          <p className="text-sm text-red-500">
            {
              errors!.questionReplyRequestDtoList[questionIdx]!.questionReply!
                .message
            }
          </p>
        )}
        {errors?.questionReplyRequestDtoList?.[questionIdx]
          ?.selectedOptionList && (
          <p className="text-sm text-red-500">
            {
              errors!.questionReplyRequestDtoList[questionIdx]!
                .selectedOptionList!.message
            }
          </p>
        )}
      </div>
      <input
        type="hidden"
        value={question.questionId}
        {...register(`questionReplyRequestDtoList.${questionIdx}.questionId`)}
      />
    </div>
  );
};
