'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import { formQueryKey } from '@/entities/form/config';

import { getFormResponseDto } from '../../api';
import { useFormResultStore } from '../stores';

export const useGetFormInfo = (formId: string) => {
  const { setFormData } = useFormResultStore(
    useShallow((state) => ({
      setFormData: state.setFormData,
    })),
  );
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: formQueryKey.detail(formId),
    queryFn: () => getFormResponseDto(formId),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFormData(data);
    }
  }, [isSuccess, data, setFormData]);

  return { data, isPending, isError, isSuccess };
};
