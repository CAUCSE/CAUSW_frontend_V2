import { useEffect } from 'react';

import { checkPhoneNumberDuplicate } from '@/fsd_entities/auth/api/get';
import {
  contactToFormData,
  formDataToPayload,
  ProfileFormData,
  useProfileForm,
  useUpdateMyProfileMutation,
} from '@/fsd_entities/contact';

const defaultCareerItem = { id: null, description: '', periodStart: '', periodEnd: '' };

export const useEditProfile = (contact: Contact.Contact | undefined) => {
  const { methods, fields, append, remove } = useProfileForm();
  const { mutate: updateProfile, isPending } = useUpdateMyProfileMutation();
  const { setError, clearErrors } = methods;

  useEffect(() => {
    if (contact) {
      methods.reset(contactToFormData(contact));
    }
  }, [contact, methods.reset]);

  const onSubmit = async (formData: ProfileFormData) => {
    if (formData.phoneNumber && formData.phoneNumber !== contact?.phoneNumber) {
      const isDuplicate = await checkPhoneNumberDuplicate(formData.phoneNumber);
      if (isDuplicate) {
        setError('phoneNumber', {
          type: 'duplicate',
          message: '이미 사용 중인 휴대폰 번호입니다.',
        });
        return;
      } else {
        clearErrors('phoneNumber');
      }
    }

    const { userInfoUpdateDto, profileImage } = formDataToPayload(formData);
    updateProfile({ userInfoUpdateDto, profileImage });
  };

  const addCareer = () => append(defaultCareerItem);

  return {
    methods,
    isPending,
    fields,
    addCareer,
    removeCareer: remove,
    handleFormSubmit: methods.handleSubmit(onSubmit),
  };
};
