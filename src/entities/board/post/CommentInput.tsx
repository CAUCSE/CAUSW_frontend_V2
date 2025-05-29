'use client';

import { useState } from 'react';

import Image from 'next/image';

interface CommentInputProps {
  handleAddComment: (content: string, isAnonymous: boolean) => void;
}

export const CommentInput = ({ handleAddComment }: CommentInputProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (commentContent.trim() === '') return;

    setCommentContent('');
    handleAddComment(commentContent, isAnonymous);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className="fixed bottom-[70px] flex w-full items-center justify-center px-3 xl:right-72 xl:bottom-2 xl:left-40 xl:mr-4 xl:w-auto">
      <div className="rounded-comment-input-br bg-comment-input flex grow items-center justify-between p-4">
        <div className="flex items-center space-x-2 pr-3">
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6 border-2 border-gray-300"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <div className="text-[16px] text-gray-400">익명</div>
        </div>
        <input
          type="text"
          placeholder="댓글을 입력해주세요!"
          className="bg-comment-input flex grow border-none text-[16px] text-black outline-hidden"
          value={commentContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button className="flex items-end" onClick={handleSubmit}>
          <Image src="/images/post/comment-input.svg" alt="Comment Input" width={20} height={20}></Image>
        </button>
      </div>
    </div>
  );
};
