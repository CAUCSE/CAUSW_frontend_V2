'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import { CustomCheckBox } from '../CustomCheckbox';

export const GraduationToggle = () => {
  const { control } = useFormContext<PostSchema>();

  return (
    <Controller
      name="formCreateRequestDto.isAllowedGraduation"
      control={control}
      render={({ field }) => (
        <CustomCheckBox
          label="졸업생"
          value="GRADUATION"
          isChecked={field.value}
          onCheckedChange={field.onChange}
          className="col-span-1 lg:col-span-4"
        />
      )}
    />
  );
};
