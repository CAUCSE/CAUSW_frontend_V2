'use client';

import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { usePostCreationStore } from '../../model';

export const PostContentTextarea = () => {
  const { content, isVote, setContent } = usePostCreationStore(
    useShallow(state => ({
      content: state.content,
      isVote: state.isVote,
      setContent: state.setContent,
    })),
  );

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <textarea
      value={content}
      onChange={handleContentChange}
      placeholder={`내용을 입력하세요!
게시글과 댓글은 작성 후에는 수정할 수 없습니다.`}
      className={clsx(
        'w-full resize-none bg-transparent p-2 text-2xl placeholder:text-2xl placeholder:text-create-post-text focus:outline-none',
        isVote ? 'h-60 flex-shrink-0' : 'h-full',
      )}
    />
  );
};
