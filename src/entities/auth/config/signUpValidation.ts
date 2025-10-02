import { RegisterOptions } from 'react-hook-form';

import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  checkPhoneNumberDuplicate,
  checkStudentIdDuplicate,
} from '../api/get';

export const signUpValidationRules: Record<
  keyof User.SignUpForm,
  RegisterOptions<User.SignUpForm>
> = {
  email: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
    validate: async (value) => {
      if (typeof value !== 'string') return '이메일은 문자열이어야 합니다.';
      return (
        !(await checkEmailDuplicate(value)) || '이미 사용 중인 이메일입니다.'
      );
    },
  },
  name: {
    required: '이름을 입력해주세요.',
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
    pattern: {
      value:
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,16}$/,
      message:
        '비밀번호를 8~16자로 영문, 숫자, 특수기호를 조합해서 사용하세요.',
    },
  },
  pwConfirm: {
    required: '비밀번호 확인을 입력해주세요.',
    validate: (value, formValues) =>
      value === formValues.password || '비밀번호가 일치하지 않습니다.',
  },
  studentId: {
    validate: async (value) => {
      if (!value) return true;
      if (typeof value !== 'string' || !/^\d+$/.test(value))
        return '학번은 숫자여야 합니다.';
      return (
        !(await checkStudentIdDuplicate(value)) ||
        '이미 사용 중인 학번입니다다.'
      );
    },
  },
  admissionYearString: {
    required: '입학년도를 입력해주세요.',
  },
  nickname: {
    required: '닉네임을 입력해주세요.',
    validate: async (value) => {
      if (typeof value !== 'string') return '닉네임은 문자열이어야 합니다.';
      if (!value.trim()) return '올바른 닉네임이 아닙니다.';
      return (
        !(await checkNicknameDuplicate(value)) || '이미 사용 중인 닉네임입니다.'
      );
    },
  },
  department: {
    required: '학과/학부를 입력해주세요.',
  },
  agreeToTerms: {
    required: '약관에 동의해주세요.',
  },
  phoneNumber: {
    validate: async (value) => {
      if (!value) return '휴대폰 번호를 입력해주세요.';
      if (typeof value !== 'string' || !/^\d{3}-\d{3,4}-\d{4}$/.test(value))
        return 'ex) 010-1234-5678 형식으로 입력해주세요.';
      return (
        !(await checkPhoneNumberDuplicate(value)) ||
        '이미 사용 중인 휴대폰 번호입니다.'
      );
    },
  },
  agreeToPopup: {
    required: '알림에 동의해주세요.',
  },
};
