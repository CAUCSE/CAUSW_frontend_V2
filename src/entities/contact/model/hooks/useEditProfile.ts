import { useEffect } from 'react';

import { useFieldArray } from 'react-hook-form';

import { checkPhoneNumberDuplicate } from '@/entities/auth/api/get';
import {
  contactToFormData,
  formDataToPayload,
  ProfileFormData,
  useProfileForm,
  useUpdateMyProfileMutation,
} from '@/entities/contact';

const defaultCareerItem = { id: null, description: '', periodStart: '', periodEnd: '' };
const defaultSocialLinkItem = { value: '' };

export const useEditProfile = (contact: Contact.Contact | undefined) => {
  const { methods, fields: careerFields, append: appendCareer, remove: removeCareer } = useProfileForm();
  const { control, setError, clearErrors } = methods;
  const { mutate: updateProfile, isPending } = useUpdateMyProfileMutation();

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: 'socialLinks',
  });

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

  const addCareer = () => appendCareer(defaultCareerItem);
  const addSocialLink = () => appendSocialLink(defaultSocialLinkItem);

  return {
    methods,
    isPending,
    careerFields,
    addCareer,
    removeCareer,
    socialLinkFields,
    addSocialLink,
    removeSocialLink,
    handleFormSubmit: methods.handleSubmit(onSubmit),
  };
};
