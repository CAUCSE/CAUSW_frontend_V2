'use client';

import { useEffect } from 'react';

import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import { CustomCheckBox } from '../CustomCheckbox';

interface SemesterToggleForLeaveOfAbsenceProps {
  label: string;
  value: string;
  className?: string;
}

export const SemesterToggleForLeaveOfAbsence = ({
  label,
  value,
  className,
}: SemesterToggleForLeaveOfAbsenceProps) => {
  const { control, watch, setValue } = useFormContext<PostSchema>();

  const isLeaveOfAbsenceChecked = watch(
    'formCreateRequestDto.isAllowedLeaveOfAbsence',
  );

  useEffect(() => {
    if (!isLeaveOfAbsenceChecked) {
      setValue('formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList', []);
    }
  }, [isLeaveOfAbsenceChecked, setValue]);

  const handleCheckedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      PostSchema,
      'formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList'
    >,
  ) => {
    const { value } = e.target;
    const fieldValueSet = new Set(field.value);

    if (value === 'ALL_SEMESTER') {
      if (fieldValueSet.has(value)) {
        setValue(
          'formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList',
          [],
        );
        return;
      }
      setValue('formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList', [
        'ALL_SEMESTER',
      ]);
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

    setValue(
      'formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList',
      Array.from(fieldValueSet),
    );
  };

  return (
    <Controller
      name="formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList"
      control={control}
      render={({ field }) => (
        <CustomCheckBox
          label={label}
          value={value}
          isChecked={field.value?.includes(value)}
          onCheckedChange={(e) => handleCheckedChange(e, field)}
          className={className}
        />
      )}
    />
  );
};
