import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API } from "@/shared";
import { useCalendarStore } from "../model";
import { calendarQueryKey } from "../config";

export const useDeleteCalendar = () => {
    const closeDeleteModal = useCalendarStore((state) => state.closeDeleteModal);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ calendarId, calendarYear }: { calendarId: string; calendarYear: number }) => {
        await API.delete(`/api/v1/calendars/${calendarId}`);
        return calendarYear;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: calendarQueryKey.year(data),
        });
        toast.success('캘린더가 삭제되었습니다');
      },
      onError: () => {
        toast.error('캘린더 삭제를 실패했습니다.');
      },
      onSettled: () => {
        closeDeleteModal();
      },
    });
  };