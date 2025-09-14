import { API } from '@/shared';

const USER_INFO_URI = '/api/v1/users-info';

/**
 * 내 프로필 정보 및 이미지 수정
 */
export const updateMyProfile = async ({
                                        userInfoUpdateDto,
                                        profileImage,
                                      }: {
  userInfoUpdateDto: Contact.ContactUpdatePayload;
  profileImage?: File;
}): Promise<Contact.Contact> => {
  const formData = new FormData();

  const dtoBlob = new Blob([JSON.stringify(userInfoUpdateDto)], {
    type: 'application/json',
  });
  formData.append('userInfoUpdateDto', dtoBlob);

  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  try {
    const response = await API.put(`${USER_INFO_URI}/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('프로필 업데이트에 실패했습니다.');
  }
};
