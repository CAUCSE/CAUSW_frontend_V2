import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FORMAPI } from '@/shared';
import { calendarQueryKey } from '../config';
import { useCalendarStore } from '../model';

export const useCreateCalendar = () => {
    const closeAddModal = useCalendarStore((state) => state.closeAddModal);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ calendarImg, year, month }: { calendarImg: File; year: number; month: number }) => {
        const formData = new FormData();
        formData.append(
            'calendarCreateRequestDto',
            new Blob([JSON.stringify({ year, month })], {
            type: 'application/json',
            }),
        );
        formData.append('image', new Blob([calendarImg], { type: calendarImg.type }), calendarImg.name);

        await FORMAPI.post('/api/v1/calendars', formData);
        return year;
        },
        onSuccess: (year) => {
        queryClient.invalidateQueries({
            queryKey: calendarQueryKey.year(year),
        });
        toast.success('캘린더가 추가되었습니다');
        closeAddModal();
        },
        onError: (error) => {
        if (error.message.includes('code 400')) {
            toast.error('해당 년도와 월의 캘린더가 이미 존재합니다.');
            return;
        }
        toast.error('캘린더 추가를 실패했습니다.');
        },
    });
};