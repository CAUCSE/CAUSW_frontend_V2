'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { SendHorizonal, SendHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCommentStore, usePostChildComment, usePostComment } from '@/entities/comment';
import { commentQueryKey } from '@/entities/comment/config';

import { Button } from '@/shadcn/components/ui';

interface CommentInputProps {
  postId: Post.PostDto['id'];
}

export const CommentInput = ({ postId }: CommentInputProps) => {
  const queryClient = useQueryClient();

  const { childCommentActiveId, setChildCommentActiveId } = useCommentStore();

  const [commentContent, setCommentContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { mutate: postComment, isPending: isChildComment } = usePostComment({
    setChildCommentActiveId,
    setCommentContent,
    postId,
  });
  const { mutate: postChildComment, isPending: isPostingChildComment } = usePostChildComment({
    setChildCommentActiveId,
    setCommentContent,
    postId,
  });

  const handleSubmit = () => {
    if (commentContent.trim() === '') return;

    if (childCommentActiveId) {
      postChildComment({
        dto: {
          content: commentContent,
          isAnonymous,
          parentCommentId: childCommentActiveId,
        },
      });
      return;
    }

    postComment({
      dto: {
        content: commentContent,
        isAnonymous,
        postId,
      },
    });
  };
  const isSubmitting = isChildComment || isPostingChildComment;
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
    <div className="flex w-full items-center justify-center px-3">
      <div className="rounded-comment-input-br bg-comment-input flex grow items-center justify-between p-4">
        <label className="flex shrink-0 items-center space-x-2 pr-3">
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6 border-2 border-gray-300"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <div className="text-base text-nowrap text-gray-400">익명</div>
        </label>

        {/* input을 div로 감싸서 overflow 제어 */}
        <div className="flex min-w-0 grow overflow-hidden">
          <input
            type="text"
            placeholder="댓글을 입력해주세요!"
            className="bg-comment-input w-full border-none text-base text-black outline-none placeholder:truncate"
            value={commentContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-2 flex h-fit w-fit shrink-0 cursor-pointer items-end text-red-500"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <SendHorizontal className="size-5" />
        </Button>
      </div>
    </div>
  );
};
