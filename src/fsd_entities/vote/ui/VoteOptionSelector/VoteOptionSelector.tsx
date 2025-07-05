'use client';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

interface VoteOptionSelectorProps {
  option: Vote.VoteOption;
  allowMultiple: Vote.VoteResponseDto['allowMultiple'];
}

export const VoteOptionSelector = ({ option, allowMultiple }: VoteOptionSelectorProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={option.id}
      render={({ field }) => {
        return (
          <label key={option.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="vote"
              value={option.optionName}
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="hidden"
            />
            <span
              className={clsx(
                'border-comment-bw inline-block h-5 w-5 border-black transition-all duration-200',
                field.value && 'bg-vote-theme shadow-vote-option',
                allowMultiple ? 'rounded-none' : 'rounded-full',
              )}
            />
            <span className="text-[16px]">{option.optionName}</span>
          </label>
        );
      }}
    />
  );
};
