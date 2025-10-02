import { RegisterOptions } from 'react-hook-form';

export const admissionValidationRules: Record<
  keyof User.AdmissionCreateRequestDto,
  RegisterOptions<User.AdmissionCreateRequestDto>
> = {
  email: {
    required: '이메일을 입력해주세요',
  },
  description: {
    maxLength: {
      value: 500,
      message: '500자 이내로 입력해주세요.',
    },
  },
  attachImage: {
    required: '이미지를 첨부해주세요.',
    validate: {
      fileCount: (value) => {
        if (!value || !(value instanceof FileList))
          return '파일 형식이 올바르지 않습니다.';
        if (value.length === 0 || value.length > 5) {
          return '이미지는 최소 1개, 최대 5개까지 첨부 가능합니다.';
        }
        return true;
      },
    },
  },
};
