'use client';

import { useEffect } from 'react';

import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

import { CustomCheckBox } from '../CustomCheckbox';

interface SemesterToggleProps {
  label: string;
  value: string;
  className?: string;
}

export const SemesterToggle = ({ label, value, className }: SemesterToggleProps) => {
  const { control, setValue, watch } = useFormContext<PostSchema>();

  const isEnrolledChecked = watch('formCreateRequestDto.isAllowedEnrolled');

  useEffect(() => {
    if (!isEnrolledChecked) {
      setValue('formCreateRequestDto.enrolledRegisteredSemesterList', []);
    }
  }, [isEnrolledChecked, setValue]);

  const handleCheckedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'formCreateRequestDto.enrolledRegisteredSemesterList'>,
  ) => {
    const { value } = e.target;
    const fieldValueSet = new Set(field.value);

    if (value === 'ALL_SEMESTER') {
      if (fieldValueSet.has(value)) {
        setValue('formCreateRequestDto.enrolledRegisteredSemesterList', []);
        return;
      }
      setValue('formCreateRequestDto.enrolledRegisteredSemesterList', ['ALL_SEMESTER']);
      return;
    }

    if (fieldValueSet.has(value)) {
      fieldValueSet.delete(value);
    } else {
      fieldValueSet.add(value);
      fieldValueSet.delete('ALL_SEMESTER');
    }

    if (fieldValueSet.size === 9) {
      fieldValueSet.clear();
      fieldValueSet.add('ALL_SEMESTER');
    }

    setValue('formCreateRequestDto.enrolledRegisteredSemesterList', Array.from(fieldValueSet));
  };

  return (
    <Controller
      name="formCreateRequestDto.enrolledRegisteredSemesterList"
      control={control}
      render={({ field }) => (
        <CustomCheckBox
          label={label}
          value={value}
          className={className}
          isChecked={field.value?.includes(value)}
          onCheckedChange={e => handleCheckedChange(e, field)}
        />
      )}
    />
  );
};
