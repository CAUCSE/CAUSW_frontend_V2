'use client';

import { useFormContext } from 'react-hook-form';

interface SubjectiveOptionProps {
  questionIdx: number;
}

export const SubjectiveOption = ({ questionIdx }: SubjectiveOptionProps) => {
  const { register } = useFormContext<Form.QuestionReplyRequestDtoList>();

  return (
    <input
      type="text"
      className="flex w-full items-center border-b-[1px] border-black bg-white outline-none"
      placeholder="답변을 입력해주세요"
      {...register(`questionReplyRequestDtoList.${questionIdx}.questionReply`)}
    />
  );
};
