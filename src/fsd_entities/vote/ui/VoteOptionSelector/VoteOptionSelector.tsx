'use client';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

interface VoteOptionSelectorProps {
  option: Vote.VoteOption;
  allowMultiple: Vote.VoteResponseDto['allowMultiple'];
  allOptionIds: string[];
}

export const VoteOptionSelector = ({ option, allowMultiple, allOptionIds }: VoteOptionSelectorProps) => {
  const { control, setValue, getValues } = useFormContext();
  return (
    <Controller
      control={control}
      name={option.id}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (allowMultiple) {
            field.onChange(e.target.checked);
          } else {
            if (e.target.checked) {
              allOptionIds.forEach((id) => {
                setValue(id, id === option.id, { shouldValidate: true, shouldDirty: true });
              });
              field.onChange(true);
            } else {
              setValue(option.id, false, { shouldValidate: true, shouldDirty: true });
              field.onChange(false);
            }
          }
        };

        return (
          <label key={option.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="vote"
              value={option.optionName}
              checked={field.value || false}
              onChange={handleChange}
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
