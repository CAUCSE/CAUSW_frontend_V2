"use client";

import { ObjectiveOption } from "@/_deprecated/entities";

interface ObjectiveOptionListProps {
  question: Post.QuestionResponseDto;
  questionIndex: number;
}

export const ObjectiveOptionList = ({
  question,
  questionIndex,
}: ObjectiveOptionListProps) => {
  return question.optionResponseDtoList
    .sort((optionA, optionB) => optionA.optionNumber - optionB.optionNumber)
    .map((option: Post.OptionResponseDto) => {
      return (
        <ObjectiveOption
          canSelectMultiple={question.isMultiple}
          questionIndex={questionIndex}
          optionValue={option.optionNumber}
          optionContent={option.optionText}
          key={option.optionId}
        />
      );
    });
};
