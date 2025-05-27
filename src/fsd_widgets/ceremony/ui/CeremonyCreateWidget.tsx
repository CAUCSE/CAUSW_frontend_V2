'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { CeremonyFormValues, useCeremonyCreateForm } from '@/fsd_entities/notification/model/useCelemonyCreateForm';

import { ImageUploadField } from '@/fsd_shared/ui/ImageUploadField';
import { InputBox } from '@/fsd_shared/ui/InputBox';
import { SelectBox } from '@/fsd_shared/ui/SelectBox';

import { Button } from '@/fsd_shared';

const categoryOptions = [
  { label: '결혼', value: 'MARRIAGE' },
  { label: '장례식', value: 'FUNERAL' },
  { label: '졸업', value: 'GRADUATION' },
  { label: '기타', value: 'ETC' },
];

export const CeremonyCreateWidget = () => {
  const methods = useForm<CeremonyFormValues>({
    defaultValues: {
      category: '',
      startDate: '',
      endDate: '',
      description: '',
      attachedImageList: [],
    },
  });

  const { onSubmit, loading } = useCeremonyCreateForm();

  // react-hook-form submit wrapper
  const handleFormSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-medium">분류</p>
          <SelectBox
            options={categoryOptions}
            value={methods.watch('category')}
            onChange={(value) => methods.setValue('category', value)}
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
              inputType="single-line"
              height="h-8"
              width="w-36"
            />
            <span className="text-gray-500">~</span>
            <InputBox
              hint="YYYY-MM-DD"
              value={methods.watch('endDate')}
              onChange={(value) => methods.setValue('endDate', value)}
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
          <ImageUploadField name="attachedImageList" setValue={methods.setValue} maxFiles={5} />
        </div>

        <Button variant="BLUE" type="submit" className="px-20 py-1 text-lg font-bold" disabled={loading}>
          저장
        </Button>
      </form>
    </FormProvider>
  );
};
