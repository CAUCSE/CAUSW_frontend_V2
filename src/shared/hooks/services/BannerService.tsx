'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { bannerQueryKey } from '@/shared/configs/query-key';

import { API, FORMAPI, useBannerStore } from '@/shared';

export const BannerService = () => {
  const useGetBannerList = () => {
    return useQuery({
      queryKey: bannerQueryKey.list(),
      queryFn: async () => {
        const { data }: { data: Banner.BannerListResponseDto } = await API.get('/api/v1/events');
        return data;
      },
    });
  };

  const useCreateBanner = () => {
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
      onMutate: async () => {
        toast.loading('이벤트 배너를 추가 중입니다.');
      },
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

  const useUpdateBanner = () => {
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
      onMutate: async () => {
        toast.loading('이벤트 배너를 수정 중입니다.');
      },
      onSuccess: async () => {
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

  const useDeleteBanner = () => {
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

  return {
    useGetBannerList,
    useCreateBanner,
    useUpdateBanner,
    useDeleteBanner,
  };
};
