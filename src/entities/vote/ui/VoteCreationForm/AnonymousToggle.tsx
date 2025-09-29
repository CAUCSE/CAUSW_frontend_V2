'use client';

import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import { CustomToggle } from './CustomToggle';

export const AnonymousToggle = () => {
  const { control } = useFormContext<PostSchema>();

  const toggleAllowAnonymous = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'voteCreateRequestDto.allowAnonymous'>,
  ) => {
    field.onChange(e.target.checked);
  };

  return (
    <Controller
      control={control}
      name="voteCreateRequestDto.allowAnonymous"
      render={({ field }) => (
        <CustomToggle isChecked={field.value} onCheckChanged={(e) => toggleAllowAnonymous(e, field)} text="익명 투표" />
      )}
    />
  );
};
