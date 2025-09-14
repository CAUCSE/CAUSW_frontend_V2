'use client';

import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { formQueryKey } from '@/entities/form/config';
import { useResponseFormStore } from '../stores';
import { getFormResponseDto } from '../../api';
import { getCanReply } from '../../api';

export const useGetFormResponseInfo = (formId: string) => {
  const setForm = useResponseFormStore((state) => state.setForm);
  const { data, isPending, isError, isSuccess } = useQueries({
    queries: [
      {
        queryKey: formQueryKey.detail(formId),
        queryFn: () => getFormResponseDto(formId),
      },
      {
        queryKey: formQueryKey.canReply(formId),
        queryFn: () => getCanReply(formId),
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
        isError: results.some((result) => result.isError),
        isSuccess: results.every((result) => result.isSuccess),
      };
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setForm(data[0] as Post.FormResponseDto);
    }
  }, [isSuccess, data, setForm]);

  return { data, isPending, isError };
};