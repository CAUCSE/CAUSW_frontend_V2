'use client';

import { useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

import { CustomCheckBox } from '../CustomCheckbox';

export const LeaveOfAbsenceToggle = () => {
  const { control, watch, setValue } = useFormContext<PostSchema>();

  const isSemesterChecked = watch('formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList')?.length > 0;

  useEffect(() => {
    if (isSemesterChecked) {
      setValue('formCreateRequestDto.isAllowedLeaveOfAbsence', true);
    }
  }, [isSemesterChecked, setValue]);

  return (
    <Controller
      name="formCreateRequestDto.isAllowedLeaveOfAbsence"
      control={control}
      render={({ field }) => (
        <CustomCheckBox
          label="휴학생"
          value="LEAVE_OF_ABSENCE"
          isChecked={field.value}
          onCheckedChange={field.onChange}
          className="col-span-1"
        />
      )}
    />
  );
};
