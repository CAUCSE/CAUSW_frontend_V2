import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateMyProfile, contactQueryKey } from '@/fsd_entities/contact';

export const useUpdateMyProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
                   userInfoUpdateDto,
                   profileImage,
                 }: {
      userInfoUpdateDto: Contact.ContactUpdatePayload;
      profileImage?: File;
    }) => updateMyProfile({ userInfoUpdateDto, profileImage }),

    onSuccess: () => {
      toast.success('프로필이 성공적으로 저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: contactQueryKey.me() });
      queryClient.invalidateQueries({ queryKey: contactQueryKey.lists() });
    },
    onError: (error) => {
      toast.error(error.message || '프로필 저장에 실패했습니다.');
    },
  });
};
