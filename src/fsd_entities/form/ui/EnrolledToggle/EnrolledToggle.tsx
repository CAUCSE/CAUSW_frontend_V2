'use client';

import { useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

import { CustomCheckBox } from '../CustomCheckbox';

export const EnrolledToggle = () => {
  const { control, watch, setValue } = useFormContext<PostSchema>();

  const isSemesterChecked = watch('formCreateRequestDto.enrolledRegisteredSemesterList')?.length > 0;
  const isCouncilFeeChecked = watch('formCreateRequestDto.isNeedCouncilFeePaid');

  useEffect(() => {
    if (isSemesterChecked || isCouncilFeeChecked) {
      setValue('formCreateRequestDto.isAllowedEnrolled', true);
    }
  }, [isSemesterChecked, isCouncilFeeChecked, setValue]);

  return (
    <Controller
      name="formCreateRequestDto.isAllowedEnrolled"
      control={control}
      render={({ field }) => (
        <CustomCheckBox
          label="재학생"
          value="ENROLLED"
          isChecked={field.value}
          onCheckedChange={field.onChange}
          className="col-span-1"
        />
      )}
    />
  );
};
