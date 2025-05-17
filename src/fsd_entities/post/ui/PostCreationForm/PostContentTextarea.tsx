'use client';

import clsx from 'clsx';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { PostSchema } from '@/fsd_entities/post';

import { usePostCreationStore } from '../../model';

export const PostContentTextarea = () => {
  const isVote = usePostCreationStore(state => state.isVote);
  const isApply = usePostCreationStore(state => state.isApply);
  const { control } = useFormContext<PostSchema>();

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: ControllerRenderProps<PostSchema, 'content'>,
  ) => {
    field.onChange(e.target.value);
  };

  return (
    <Controller
      name="content"
      control={control}
      render={({ field, fieldState }) => (
        <div className={clsx('relative', isVote || isApply ? 'h-60 flex-shrink-0' : 'flex-grow')}>
          <textarea
            value={field.value}
            onChange={e => handleContentChange(e, field)}
            placeholder={`내용을 입력하세요!
게시글과 댓글은 작성 후에는 수정할 수 없습니다.`}
            className={clsx(
              'h-full w-full resize-none bg-transparent p-2 text-2xl placeholder:text-2xl placeholder:text-create-post-text focus:outline-none',
            )}
          />
          {fieldState.error && <p className="absolute right-0 top-0 text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
};
