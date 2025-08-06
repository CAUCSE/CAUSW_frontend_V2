import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useSubmitAcademicRecord } from './useSubmitAcademicRecord';

interface userInfoProps {
  curAcademicStatus: string;
}

export const useAcademicRecordForm = ({ curAcademicStatus }: userInfoProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User.CreateUserAcademicRecordApplicationRequestDto>({ mode: 'onBlur' });

  const submitAcademicRecord = useSubmitAcademicRecord({ curAcademicStatus });

  const onSubmit = (data: User.CreateUserAcademicRecordApplicationRequestDto) => {
    if (data.targetAcademicStatus === 'ENROLLED' && !data.images) {
      toast.error('이미지를 첨부해주세요.');
      return;
    }
    submitAcademicRecord.mutate(data);
  };

  const onInvalid = () => {
    toast.error('모든 항목을 조건에 맞게 입력해주세요.');
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    onInvalid,
    setValue,
  };
};
