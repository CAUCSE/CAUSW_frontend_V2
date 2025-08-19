'use client';

import { useQuery } from '@tanstack/react-query';

import { getPostDetail } from '../../api';
import { postQueryKey } from '../../config';

interface UseGetPostDetailProps {
  postId: Post.PostDto['id'];
}

export const useGetPostDetail = ({ postId }: UseGetPostDetailProps) => {
  return useQuery({
    queryKey: postQueryKey.detail({ postId }),
    queryFn: () => getPostDetail({ postId }),
  });
};
