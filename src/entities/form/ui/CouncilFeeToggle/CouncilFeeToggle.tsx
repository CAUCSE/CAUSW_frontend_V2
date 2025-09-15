'use client';

import { useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

import { CustomCheckBox } from '../CustomCheckbox';

export const CouncilFeeToggle = () => {
  const { control, watch, setValue } = useFormContext<PostSchema>();

  const isEnrolledChecked = watch('formCreateRequestDto.isAllowedEnrolled');

  useEffect(() => {
    if (!isEnrolledChecked) {
      setValue('formCreateRequestDto.isNeedCouncilFeePaid', false);
    }
  }, [isEnrolledChecked, setValue]);

  return (
    <Controller
      name="formCreateRequestDto.isNeedCouncilFeePaid"
      control={control}
      render={({ field }) => (
        <CustomCheckBox
          label="학생회비 납부자"
          value="COUNCIL_FEE_PAID"
          isChecked={field.value}
          className="col-span-1 lg:col-span-4"
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
};
