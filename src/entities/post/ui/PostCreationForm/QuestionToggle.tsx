'use client';

import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import { CustomToggle } from './CustomToggle';

export const QuestionToggle = () => {
  const { control } = useFormContext<PostSchema>();
  const toggleQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'isQuestion'>,
  ) => {
    field.onChange(e.target.checked);
  };

  return (
    <Controller
      name="isQuestion"
      control={control}
      render={({ field }) => (
        <CustomToggle
          isChecked={field.value}
          onCheckedChange={(e) => toggleQuestion(e, field)}
          text="질문"
        />
      )}
    />
  );
};
