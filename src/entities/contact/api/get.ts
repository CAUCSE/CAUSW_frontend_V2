import { API } from '@/shared';

const USER_INFO_URI = '/api/v1/users-info';

// 일반 전체 조회
export const getAllContacts = async (
  pageNum: number,
): Promise<Contact.PaginatedContactsResponse> => {
  const response = await API.get(USER_INFO_URI, { params: { pageNum } });
  return response.data;
};

/**
 * 동문수첩 목록 조회 (검색 기능 포함)
 */
export const getContacts = async ({
  pageNum = 0,
  filters,
}: {
  pageNum: number;
  filters: Contact.ContactFilters;
}): Promise<Contact.PaginatedContactsResponse> => {
  try {
    const response = await API.get(USER_INFO_URI, {
      params: {
        pageNum,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('동문 목록을 불러오는데 실패했습니다.');
  }
};

/**
 * 내 프로필 상세 정보 조회
 */
export const getMyProfile = async (): Promise<Contact.Contact> => {
  try {
    const response = await API.get(`${USER_INFO_URI}/me`);
    return response.data;
  } catch (error) {
    throw new Error('내 프로필 정보를 불러오는데 실패했습니다.');
  }
};

/**
 * 다른 사용자 프로필 상세 정보 조회
 * @param userId - 조회할 사용자의 ID
 */
export const getContactById = async (
  userId: string,
): Promise<Contact.Contact> => {
  try {
    const response = await API.get(`${USER_INFO_URI}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('사용자 정보를 불러오는데 실패했습니다.');
  }
};
