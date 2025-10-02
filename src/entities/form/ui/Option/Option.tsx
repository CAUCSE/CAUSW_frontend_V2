'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import TrashcanIcon from '../../../../../public/icons/delete_icon.svg';

export const Option = ({
  questionIndex,
  optionIndex,
  removeOption,
}: Form.OptionProps) => {
  const { control, getValues } = useFormContext<PostSchema>();

  const handleRemoveOption = () => {
    const questionList = getValues(
      'formCreateRequestDto.questionCreateRequestDtoList',
    );
    if (questionList[questionIndex].optionCreateRequestDtoList.length === 1)
      return;
    removeOption();
  };

  return (
    <Controller
      name={`formCreateRequestDto.questionCreateRequestDtoList.${questionIndex}.optionCreateRequestDtoList.${optionIndex}.optionText`}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <div className="ml-4 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p className="text-md">○</p>
              <input
                type="text"
                placeholder="항목 내용"
                value={field.value}
                onChange={field.onChange}
                className="w-1/3 min-w-[100px] border-b border-[#000000] bg-[#FCFCFC] placeholder:text-center"
              />
              <button type="button" onClick={handleRemoveOption}>
                <TrashcanIcon width={16} height={16} />
              </button>
            </div>
            {fieldState.error && (
              <p className="text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        </div>
      )}
    />
  );
};
