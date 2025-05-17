'use client';

import React from 'react';

import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

import { CustomToggle } from './CustomToggle';

export const MultipleSelectionToggle = () => {
  const { control } = useFormContext<PostSchema>();

  const toggleMultipleChoice = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'voteCreateRequestDto.allowMultiple'>,
  ) => {
    field.onChange(e.target.checked);
  };

  return (
    <Controller
      control={control}
      name="voteCreateRequestDto.allowMultiple"
      render={({ field }) => (
        <CustomToggle isChecked={field.value} onCheckChanged={(e) => toggleMultipleChoice(e, field)} text="복수 선택" />
      )}
    />
  );
};
