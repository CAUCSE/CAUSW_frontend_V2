import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

import { updateAttendanceUserNote } from '../..';

interface UserNotePayload {
  id: string;
  note: string;
}

export const useUpdateUserNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, note }: UserNotePayload) => {
      await updateAttendanceUserNote(id, note);
    },
    onMutate: () => {
      return toast.loading('저장 중...');
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      toast.success('학적 상태 저장에 성공했습니다');

      queryClient.invalidateQueries({ queryKey: ['attendance', 'users'] });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || '학적 상태 저장에 실패했습니다.',
        );
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
