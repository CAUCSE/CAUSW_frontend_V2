'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import AddIcon from '../../../../../public/icons/add_icon.svg';
import TrashcanIcon from '../../../../../public/icons/delete_icon.svg';
import { Option } from '../Option';

interface QuestionTypeToggleProps {
  questionIndex: number;
  questionType: 'OBJECTIVE' | 'SUBJECTIVE';
  questionTypeLabel: string;
}

const QuestionTypeToggle = ({
  questionIndex,
  questionType,
  questionTypeLabel,
}: QuestionTypeToggleProps) => {
  const { control } = useFormContext<PostSchema>();
  return (
    <Controller
      name={`formCreateRequestDto.questionCreateRequestDtoList.${questionIndex}.questionType`}
      control={control}
      render={({ field }) => (
        <label className="flex items-center p-2 text-sm sm:text-xl">
          <input
            type="radio"
            checked={field.value === questionType}
            value={questionType}
            onChange={field.onChange}
            className="peer h-0 w-0 cursor-pointer opacity-0"
          />
          <span className="mr-1 inline-block h-3 w-3 cursor-pointer rounded-full border-2 border-black peer-checked:bg-black peer-checked:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,1)] sm:m-4 sm:h-4 sm:w-4"></span>
          {questionTypeLabel}
        </label>
      )}
    />
  );
};

interface QuestionContentInputProps {
  questionIndex: number;
}

const QuestionContentInput = ({ questionIndex }: QuestionContentInputProps) => {
  const { control } = useFormContext<PostSchema>();
  return (
    <Controller
      name={`formCreateRequestDto.questionCreateRequestDtoList.${questionIndex}.questionText`}
      control={control}
      render={({ field, fieldState }) => (
        <div className="ml-4 flex flex-col">
          <input
            type="text"
            placeholder="질문 내용"
            value={field.value}
            onChange={field.onChange}
            className="w-3/4 border-b border-[#363434] bg-[#FCFCFC] placeholder:text-[#B4B1B1]"
          />
          {fieldState.error && (
            <p className="text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

interface MultipleChoiceOptionProps {
  questionIndex: number;
}

const MultipleChoiceOption = ({ questionIndex }: MultipleChoiceOptionProps) => {
  const { control } = useFormContext<PostSchema>();
  return (
    <Controller
      name={`formCreateRequestDto.questionCreateRequestDtoList.${questionIndex}.isMultiple`}
      control={control}
      render={({ field }) => (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={field.value}
            onChange={field.onChange}
            className="ml-4 h-4 w-4 cursor-pointer appearance-none rounded-xs border-2 border-solid border-black bg-size-[100%_100%] bg-center bg-no-repeat checked:bg-[url('/icons/checked_icon.png')]"
          />
          복수 선택 가능
        </label>
      )}
    />
  );
};

export const Question = ({ index, removeQuestion }: Form.QuestionProps) => {
  const { control, watch, getValues } = useFormContext<PostSchema>();

  const questionType = watch(
    `formCreateRequestDto.questionCreateRequestDtoList.${index}.questionType`,
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: `formCreateRequestDto.questionCreateRequestDtoList.${index}.optionCreateRequestDtoList`,
  });

  const addOption = () => {
    append({ optionText: '' });
  };

  const handleRemoveQuestion = () => {
    const questionList = getValues(
      'formCreateRequestDto.questionCreateRequestDtoList',
    );
    if (questionList.length === 1) return;
    removeQuestion();
  };

  return (
    <div className="flex min-h-[260px] w-3/4 min-w-[260px] flex-col gap-4 rounded-lg border border-black bg-[#FCFCFC] p-4 lg:min-w-[490px]">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <div className="flex sm:gap-4">
            <QuestionTypeToggle
              questionIndex={index}
              questionType="OBJECTIVE"
              questionTypeLabel="객관식"
            />
            <QuestionTypeToggle
              questionIndex={index}
              questionType="SUBJECTIVE"
              questionTypeLabel="주관식"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleRemoveQuestion}
          className="flex h-6 w-8 items-center justify-center rounded-3xl border border-black sm:h-8 sm:w-10"
        >
          <TrashcanIcon width={16} height={16} />
        </button>
      </div>
      <QuestionContentInput questionIndex={index} />
      {questionType === 'OBJECTIVE' && (
        <>
          <MultipleChoiceOption questionIndex={index} />
          {fields.map((option, optionIdx) => (
            <Option
              key={option.id}
              questionIndex={index}
              optionIndex={optionIdx}
              removeOption={() => {
                remove(optionIdx);
              }}
            />
          ))}
          <button
            type="button"
            onClick={addOption}
            className="ml-4 flex w-1/3 min-w-[150px] place-content-center rounded-md bg-[#D9D9D9] lg:min-w-[190px]"
          >
            <AddIcon width={28} height={28} />
          </button>
        </>
      )}
    </div>
  );
};
