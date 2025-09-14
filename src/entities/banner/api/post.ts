'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { FORMAPI, bannerQueryKey } from '@/shared';
import { useBannerStore } from '@/entities/banner';

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  const { closeEditBannerModal, resetSelectedBanner } = useBannerStore(
    useShallow((state) => ({
      closeEditBannerModal: state.closeEditBannerModal,
      resetSelectedBanner: state.resetSelectedBanner,
    })),
  );

  return useMutation({
    mutationFn: async ({ bannerImg, url }: { bannerImg: File; url: string }) => {
      const formData = new FormData();
      formData.append('eventCreateRequestDto', new Blob([JSON.stringify({ url })], { type: 'application/json' }));
      formData.append('eventImage', new Blob([bannerImg], { type: bannerImg.type }), bannerImg.name);

      await FORMAPI.post('/api/v1/events', formData);
    },
    onMutate: () => toast.loading('이벤트 배너를 추가 중입니다.'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKey.list() });
      toast.success('이벤트 배너가 추가되었습니다.');
      resetSelectedBanner();
      closeEditBannerModal();
    },
    onError: () => {
      toast.error('이벤트 배너 추가에 실패했습니다.');
    },
  });
};
