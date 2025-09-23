import { ProfileFormData } from './profile.schema';

/**
 * API에서 받은 contact 데이터를 react-hook-form의 초기값 형태로 변환합니다.
 * @param contact API에서 받은 원본 contact 데이터
 * @returns react-hook-form의 reset() 함수에 사용될 폼 데이터
 */
export const contactToFormData = (contact: Contact.Contact): Partial<ProfileFormData> => {
  const initialSocialLinks = contact.socialLinks?.map((link) => ({ value: link })) || [];
  return {
    ...contact,
    profileImage: null,
    description: contact.description ?? '',
    job: contact.job ?? '',
    phoneNumber: contact.phoneNumber ?? '',
    socialLinks: initialSocialLinks.length > 0 ? initialSocialLinks : [{ value: '' }],
    isPhoneNumberVisible: contact.isPhoneNumberVisible ?? false,
    userCareer: contact.userCareer.map((c) => ({
      id: c.id,
      description: c.description ?? '',
      // ex: 2023, 8 -> '202308'
      periodStart: c.startYear ? `${c.startYear}${String(c.startMonth).padStart(2, '0')}` : '',
      periodEnd: c.endYear && c.endMonth ? `${c.endYear}${String(c.endMonth).padStart(2, '0')}` : '',
    })),
  };
};

/**
 * react-hook-form의 데이터를 API에 전송할 payload 형태로 변환합니다.
 * @param formData 폼에서 제출된 데이터
 * @returns API의 update 함수에 전달될 payload 객체
 */
export const formDataToPayload = (formData: ProfileFormData) => {
  const { userCareer, profileImage, email, socialLinks, ...userInfoUpdateDto } = formData;

  const filteredUserCareer =
    userCareer?.filter(
      (c) => c.description?.trim() !== '' || c.periodStart?.trim() !== '' || c.periodEnd?.trim() !== '',
    ) || [];
  const filteredSocialLinks =
    socialLinks?.map((link) => link.value).filter((value) => value.trim() !== '') || [];

  const payload: Omit<Contact.ContactUpdatePayload, 'profileImage'> = {
    ...userInfoUpdateDto,
    phoneNumber: formData.phoneNumber ?? '', // null/undefined 방지
    isPhoneNumberVisible: formData.isPhoneNumberVisible ?? false, // null 방지
    description: formData.description ?? '',
    job: formData.job ?? '',
    socialLinks: filteredSocialLinks,
    userCareer: filteredUserCareer.map((c) => ({
      id: c.id || null,
      startYear: c.periodStart ? Number(c.periodStart.substring(0, 4)) : 0,
      startMonth: c.periodStart ? Number(c.periodStart.substring(4, 6)) : 1,
      endYear: c.periodEnd ? Number(c.periodEnd.substring(0, 4)) : null,
      endMonth: c.periodEnd ? Number(c.periodEnd.substring(4, 6)) : null,
      description: c.description ?? '',
    })),
  };

  return {
    userInfoUpdateDto: payload,
    profileImage: profileImage instanceof File ? profileImage : undefined,
  };
};
