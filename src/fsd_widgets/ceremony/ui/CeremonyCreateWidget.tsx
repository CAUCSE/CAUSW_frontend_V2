'use client';

import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { useCeremonyCreateForm } from '@/fsd_entities/ceremony';

import { ImageUploadField, InputBox, SelectBox } from '@/fsd_shared';
import { Button } from '@/shadcn/components/ui';
import { formatDateInput } from '@/utils';

import { categoryOptions } from '../config/ceremonyType';

export const CeremonyCreateWidget = () => {
  const methods = useForm<Ceremony.CreateCeremonyPayload>({
    defaultValues: {
      category: '',
      startDate: '',
      endDate: '',
      description: '',
      imageFileList: undefined,
    },
  });

  const { onSubmit } = useCeremonyCreateForm();
  const [resetImageUploader, setResetImageUploader] = useState(false);
  const handleFormSubmit = methods.handleSubmit(async (data) => {
    onSubmit(data);
    methods.reset();
    setResetImageUploader(true);
    setTimeout(() => setResetImageUploader(false), 0);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-medium">분류</p>
          <SelectBox
            options={categoryOptions}
            value={methods.watch('category')}
            onChange={(value) => methods.setValue('category', value as Ceremony.CreateCeremonyPayload['category'])}
            hint="-선택해주세요-"
            width="w-64"
            height="h-12"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-medium">경조사 기간</p>
          <div className="flex items-center gap-3.5">
            <InputBox
              hint="YYYY-MM-DD"
              value={methods.watch('startDate')}
              onChange={(value) => methods.setValue('startDate', value)}
              formatter={formatDateInput}
              inputType="single-line"
              height="h-8"
              width="w-36"
            />
            <span className="text-gray-500">~</span>
            <InputBox
              hint="YYYY-MM-DD"
              value={methods.watch('endDate')}
              onChange={(value) => methods.setValue('endDate', value)}
              formatter={formatDateInput}
              inputType="single-line"
              height="h-8"
              width="w-36"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-medium">내용</p>
          <InputBox
            hint="내용을 입력해 주세요"
            value={methods.watch('description')}
            onChange={(value) => methods.setValue('description', value)}
            inputType="multi-line"
            height="h-32"
            width="w-full"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-medium">사진 등록</p>
          <ImageUploadField
            name="imageFileList"
            setValue={methods.setValue}
            maxFiles={5}
            resetTrigger={resetImageUploader}
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="self-center bg-[rgba(107,190,236,1)] px-28 text-lg font-bold hover:bg-[rgba(107,190,236,0.9)] md:px-52"
        >
          저장
        </Button>
      </form>
    </FormProvider>
  );
};
