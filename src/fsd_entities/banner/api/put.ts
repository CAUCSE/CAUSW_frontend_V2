'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { FORMAPI, bannerQueryKey } from '@/fsd_shared';
import { useBannerStore } from '@/fsd_entities/banner';

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  const { closeEditBannerModal, resetSelectedBanner } = useBannerStore(
    useShallow((state) => ({
      closeEditBannerModal: state.closeEditBannerModal,
      resetSelectedBanner: state.resetSelectedBanner,
    })),
  );

  return useMutation({
    mutationFn: async ({ id, bannerImg, url }: { id: string; bannerImg?: File | null; url: string }) => {
      const formData = new FormData();
      formData.append('eventUpdateRequestDto', new Blob([JSON.stringify({ url })], { type: 'application/json' }));
      if (bannerImg) {
        formData.append('eventImage', new Blob([bannerImg], { type: bannerImg.type }), bannerImg.name);
      }
      await FORMAPI.put(`/api/v1/events/${id}`, formData);
    },
    onMutate: () => toast.loading('이벤트 배너를 수정 중입니다.'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKey.list() });
      toast.success('이벤트 배너 수정이 완료되었습니다.');
      resetSelectedBanner();
      closeEditBannerModal();
    },
    onError: () => {
      toast.error('이벤트 배너 수정에 실패했습니다. 관리자에게 문의하세요');
    },
  });
};
