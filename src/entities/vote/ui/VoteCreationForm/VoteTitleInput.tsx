'use client';

import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/entities/post';

export const VoteTitleInput = () => {
  const { control } = useFormContext<PostSchema>();

  const handleVoteTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'voteCreateRequestDto.title'>,
  ) => {
    field.onChange(e.target.value);
  };

  return (
    <Controller
      name="voteCreateRequestDto.title"
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="투표 제목"
            value={field.value}
            onChange={(e) => handleVoteTitleChange(e, field)}
            className="border-b-post-title-input placeholder:text-create-post-text w-full border-black bg-transparent p-1 text-lg focus:outline-hidden md:text-2xl lg:p-2"
          />
          {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
};
