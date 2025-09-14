'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { API } from '@/shared';
import { bannerQueryKey } from '../config';
import { useBannerStore } from '@/entities/banner';

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  const { closeDeleteBannerModal, resetSelectedBanner } = useBannerStore(
    useShallow((state) => ({
      closeDeleteBannerModal: state.closeDeleteBannerModal,
      resetSelectedBanner: state.resetSelectedBanner,
    })),
  );

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await API.delete(`/api/v1/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKey.list() });
      toast.success('이벤트 배너가 삭제되었습니다.');
      resetSelectedBanner();
      closeDeleteBannerModal();
    },
    onError: () => {
      toast.error('이벤트 배너 삭제에 실패했습니다. 관리자에게 문의하세요.');
    },
  });
};
