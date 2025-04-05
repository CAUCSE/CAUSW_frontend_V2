'use client';

import { useFormContext } from 'react-hook-form';

interface ObjectiveOptionProps {
  canSelectMultiple: boolean;
  questionIndex: number;
  optionValue: number;
  optionContent: string;
}

export const ObjectiveOption = ({
  canSelectMultiple,
  questionIndex,
  optionValue,
  optionContent,
}: ObjectiveOptionProps) => {
  const { register } = useFormContext<Form.QuestionReplyRequestDtoList>();

  return (
    <div className="flex gap-2">
      <input
        type={canSelectMultiple ? 'checkbox' : 'radio'}
        value={optionValue}
        {...register(`questionReplyRequestDtoList.${questionIndex}.selectedOptionList`)}
      />
      <p>{optionContent}</p>
    </div>
  );
};
