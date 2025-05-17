'use client';

import { Controller, ControllerProps, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

import MinusIcon from '../../../../../public/icons/minus_icon.svg';

interface VoteOptionInputProps {
  index: number;
  option: string;
}

export const VoteOptionInput = ({ index, option }: VoteOptionInputProps) => {
  const { setValue, control, getValues } = useFormContext<PostSchema>();

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, `voteCreateRequestDto.options.${number}`>,
  ) => {
    field.onChange(e);
  };

  const removeVoteOption = (index: number) => {
    const optionList = getValues('voteCreateRequestDto.options');
    if (optionList.length <= 1) return;
    setValue(
      'voteCreateRequestDto.options',
      optionList.filter((_, idx) => idx !== index),
    );
  };

  return (
    <Controller
      control={control}
      name={`voteCreateRequestDto.options.${index}`}
      render={({ field, fieldState }) => (
        <div className="relative">
          <input
            type="text"
            placeholder="항목 입력"
            className="h-14 w-full rounded border-2 border-gray-300 pl-3 focus:border-gray-600 focus:outline-none"
            value={field.value}
            onChange={(e) => handleOptionChange(e, field)}
          />
          <button
            onClick={() => removeVoteOption(index)}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
          >
            <MinusIcon width={16} height={16} />
          </button>
          {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
};
