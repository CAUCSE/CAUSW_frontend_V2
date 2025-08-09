import { useEffect } from 'react';
import { useProfileForm, useUpdateMyProfileMutation, contactToFormData, formDataToPayload, ProfileFormData } from '@/fsd_entities/contact';

const defaultCareerItem = { id: null, description: "", periodStart: "", periodEnd: "" };

export const useEditProfile = (contact: Contact.Contact | undefined) => {
  const { methods, fields, append, remove } = useProfileForm();
  const { mutate: updateProfile, isPending } = useUpdateMyProfileMutation();

  useEffect(() => {
    if (contact) {
      methods.reset(contactToFormData(contact));
    }
  }, [contact, methods.reset]);

  const onSubmit = (formData: ProfileFormData) => {
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
