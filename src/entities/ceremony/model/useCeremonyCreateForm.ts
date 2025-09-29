'use client';

import { toast } from 'react-hot-toast';

import { useAddCeremonyMutation } from '@/entities/notification';

export const useCeremonyCreateForm = () => {
  const { mutate: addCeremony, isPending } = useAddCeremonyMutation({
    onSuccess: () => {
      toast.success('경조사가 성공적으로 등록되었습니다.');
    },
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onError: (error: any) => {
      toast.error(error?.message || '등록에 실패했습니다.');
    },
  });

  const onSubmit = (formValues: Ceremony.CreateCeremonyPayload) => {
    addCeremony(formValues);
  };

  return {
    onSubmit,
    isPending,
  };
};
