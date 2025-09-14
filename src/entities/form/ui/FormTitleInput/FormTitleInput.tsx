'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

export const FormTitleInput = () => {
  const { control } = useFormContext<PostSchema>();
  return (
    <Controller
      name="formCreateRequestDto.title"
      control={control}
      render={({ field, fieldState }) => (
        <div className="ml-2 flex w-56 flex-col items-center border-b border-black">
          <input
            type="text"
            value={field.value}
            placeholder="신청서 제목"
            onChange={field.onChange}
            className="h-10 bg-[#F8F8F8] text-xl placeholder:text-center"
          />
          {fieldState.error && <p className="text-sm text-red-500">신청서 제목을 입력해주세요</p>}
        </div>
      )}
    />
  );
};
