'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { blockByChildComment, blockByComment, blockByPost } from '../../api';

type Invalidate = { queryKey: unknown[] };

// 공통 에러 토스트
const toastError = (e: unknown, fallback: string) => {
  if (isAxiosError(e)) {
    toast.error(e.response?.data?.message ?? fallback);
  } else {
    toast.error(fallback);
  }
};

type Opts = {
  // 성공 시 무효화할 키들 (예: commentQueryKey.list({ postId }))
  invalidate?: Invalidate[];
};

export function useBlockByPost(opts?: Opts) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => blockByPost(postId),
    onSuccess: () => {
      toast.success('해당 사용자를 차단했어요.');
      opts?.invalidate?.forEach(({ queryKey }) => qc.invalidateQueries({ queryKey }));
    },
    onError: (e) => toastError(e, '차단에 실패했습니다.'),
  });
}

export function useBlockByComment(opts?: Opts) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => blockByComment(commentId),
    onSuccess: () => {
      toast.success('해당 사용자를 차단했어요.');
      opts?.invalidate?.forEach(({ queryKey }) => qc.invalidateQueries({ queryKey }));
    },
    onError: (e) => toastError(e, '차단에 실패했습니다.'),
  });
}

export function useBlockByChildComment(opts?: Opts) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (childCommentId: string) => blockByChildComment(childCommentId),
    onSuccess: () => {
      toast.success('해당 사용자를 차단했어요.');
      opts?.invalidate?.forEach(({ queryKey }) => qc.invalidateQueries({ queryKey }));
    },
    onError: (e) => toastError(e, '차단에 실패했습니다.'),
  });
}
