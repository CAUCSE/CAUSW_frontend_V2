'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { SendHorizonal, SendHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCommentStore, usePostChildComment, usePostComment } from '@/fsd_entities/comment';
import { commentQueryKey } from '@/fsd_entities/comment/config';

import { Button } from '@/shadcn/components/ui';

interface CommentInputProps {
  postId: Post.PostDto['id'];
}

export const CommentInput = ({ postId }: CommentInputProps) => {
  const queryClient = useQueryClient();

  const { childCommentActiveId, setChildCommentActiveId } = useCommentStore();

  const [commentContent, setCommentContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { mutate: postComment } = usePostComment();
  const { mutate: postChildComment } = usePostChildComment();

  const handleSubmit = () => {
    if (commentContent.trim() === '') return;

    if (childCommentActiveId) {
      postChildComment(
        {
          dto: {
            content: commentContent,
            isAnonymous,
            parentCommentId: childCommentActiveId,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
            setChildCommentActiveId(undefined);
            setCommentContent('');
          },
          onError: (error: Error) => {
            if (isAxiosError(error)) {
              toast.error(error.response?.data.message ?? '댓글 작성에 실패했습니다.');
              return;
            }
            toast.error('댓글 작성에 실패했습니다.');
          },
        },
      );
      return;
    }

    postComment(
      {
        dto: {
          content: commentContent,
          isAnonymous,
          postId,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentQueryKey.list({ postId }) });
          setCommentContent('');
        },
        onError: (error: Error) => {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message ?? '댓글 작성에 실패했습니다.');
            return;
          }
          toast.error('댓글 작성에 실패했습니다.');
        },
      },
    );
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
    <div className="flex w-full items-center justify-center px-3">
      <div className="rounded-comment-input-br bg-comment-input flex grow items-center justify-between p-4">
        <label className="flex items-center space-x-2 pr-3">
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6 border-2 border-gray-300"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <div className="text-base text-gray-400 text-nowrap">익명</div>
        </label>
        <input
          type="text"
          placeholder="댓글을 입력해주세요!"
          className="bg-comment-input flex grow border-none text-base text-black outline-hidden"
          value={commentContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="ghost"
          size="icon"
          className="flex h-fit w-fit cursor-pointer items-end text-red-500"
          onClick={handleSubmit}
        >
          <SendHorizontal className="size-5" />
        </Button>
      </div>
    </div>
  );
};
