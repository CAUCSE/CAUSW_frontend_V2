'use client';

import { useCallback, useState } from 'react';

import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

export const PostTitleInput = () => {
  const { control } = useFormContext<PostSchema>();
  const [title, setTitle] = useState<string>('');

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PostSchema, 'title'>,
  ) => {
    field.onChange(e);
    setTitle(e.target.value);
  };

  const autoFocusOnInput = useCallback((node: HTMLInputElement) => {
    if (node) {
      node.focus();
    }
  }, []);

  return (
    <Controller
      name="title"
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-grow flex-col">
          <input
            {...field}
            type="text"
            placeholder="제목"
            value={title}
            onChange={e => handleTitleChange(e, field)}
            className="mb-2 w-full flex-grow border-b border-black border-b-black bg-transparent pb-2 text-2xl placeholder:text-[#b7b7b7] focus:outline-none lg:p-2"
            ref={autoFocusOnInput}
          />
          {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
};
