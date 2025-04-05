'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { eventQueryKey } from '@/shared/configs/query-key/eventQueryKey';
import { useEventStore } from '@/shared/hooks/stores/event/useEventStore';

import { API, FORMAPI } from '@/shared';

export const HomeService = () => {
  const useGetEventList = () => {
    const setEventList = useEventStore(state => state.setEventList);
    const { data, isLoading, isSuccess } = useQuery({
      queryKey: eventQueryKey.list(),
      queryFn: async () => {
        const { data }: { data: Home.GetEventsResponseDto } = await API.get('/api/v1/events');
        return data.events;
      },
    });

    useEffect(() => {
      if (data && isSuccess) {
        setEventList(data);
      }
    }, [data, isSuccess]);
    return { data, isLoading };
  };

  const useCreateEvent = () => {
    return useMutation({
      mutationFn: async ({ bannerImg, url }: { bannerImg: File; url: string }) => {
        const formData = new FormData();
        formData.append('eventCreateRequestDto', new Blob([JSON.stringify({ url })], { type: 'application/json' }));

        formData.append('eventImage', new Blob([bannerImg], { type: bannerImg.type }), bannerImg.name);

        await FORMAPI.post('/api/v1/events', formData);
      },
      onMutate: async () => {
        toast.loading('이벤트 배너 추가 중입니다.');
      },
      onSuccess: () => {
        toast.success('이벤트 배너가 추가되었습니다.');
        window.location.href = '/setting/home/event';
      },
      onError: () => {
        toast.error('이벤트 배너 추가에 실패했습니다.');
      },
    });
  };

  const useUpdateEvent = () => {
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
        toast.loading('이벤트 배너 수정 중입니다.');
      },
      onSuccess: async () => {
        toast.success('이벤트 배너 수정이 완료되었습니다.');
        window.location.href = '/setting/home/event';
      },
      onError: () => {
        toast.error('이벤트 배너 수정에 실패했습니다. 관리자에게 문의하세요');
      },
    });
  };

  const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id }: { id: string }) => {
        await API.delete(`/api/v1/events/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: eventQueryKey.list() });
        toast.success('이벤트 배너가 삭제되었습니다.');
      },
      onError: () => {
        toast.error('이벤트 배너 삭제에 실패했습니다. 관리자에게 문의하세요.');
      },
    });
  };

  return { useGetEventList, useCreateEvent, useUpdateEvent, useDeleteEvent };
};
