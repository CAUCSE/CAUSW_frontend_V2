import { RegisterOptions } from 'react-hook-form';

export const academicRecordValidationRules: Record<
  keyof User.CreateUserAcademicRecordApplicationRequestDto,
  RegisterOptions<User.CreateUserAcademicRecordApplicationRequestDto>
> = {
  targetAcademicStatus: {
    required: '학적 상태를 선택해주세요',
  },
  targetCompletedSemester: {
    required: '현재 학기를 입력해주세요.',
  },
  graduationYear: {
    required: '졸업 년도를 입력해주세요.',
  },
  graduationType: {
    required: '졸업 월을 입력해주세요.',
  },
  note: {
    maxLength: {
      value: 500,
      message: '500자 이내로 입력해주세요.',
    },
  },
  images: {
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
