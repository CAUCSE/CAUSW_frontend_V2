'use client';

import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import { CustomToggle } from './CustomToggle';

export const AnonymousToggle = () => {
  const { control } = useFormContext<PostSchema>();

  const toggleAnonymous = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'isAnonymous'>,
  ) => {
    field.onChange(e.target.checked);
  };

  return (
    <Controller
      name="isAnonymous"
      control={control}
      render={({ field }) => (
        <CustomToggle isChecked={field.value} onCheckedChange={(e) => toggleAnonymous(e, field)} text="익명" />
      )}
    />
  );
};
