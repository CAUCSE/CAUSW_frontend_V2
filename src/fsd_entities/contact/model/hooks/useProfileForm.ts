import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '../profile.schema';

export const useProfileForm = () => {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profileImage: null,
      email: '',
      phoneNumber: '',
      description: '',
      job: '',
      userCareer: [],
      githubLink: '',
      linkedInLink: '',
      blogLink: '',
      notionLink: '',
      instagramLink: '',
      isPhoneNumberVisible: false,
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'userCareer',
  });

  return {
    methods,
    fields,
    append,
    remove,
  };
};
