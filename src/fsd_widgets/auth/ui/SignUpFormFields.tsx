import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { AuthInput, SignUpCheckbox, SignUpSelect, signUpValidationRules } from '@/fsd_entities/auth';

interface Props {
  register: UseFormRegister<User.SignUpForm>;
  errors: FieldErrors<User.SignUpForm>;
  watch: UseFormWatch<User.SignUpForm>;
}

export const SignUpFormFields = ({ register, errors, watch }: Props) => {
  const password = watch('password');

  return (
    <>
      <div className="grid grid-cols-1 place-items-center lg:grid lg:grid-cols-2 gap-y-2 max-w-3xl w-full p-8">
        <AuthInput
          register={register}
          name="email"
          rules={signUpValidationRules.email}
          label="아이디"
          placeholder="이메일 형식으로 입력해주세요"
          errorMessage={errors.email?.message}
        />
        <AuthInput
          register={register}
          name="nickname"
          rules={signUpValidationRules.nickname}
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          errorMessage={errors.nickname?.message}
        />
        <AuthInput
          register={register}
          name="password"
          type="password"
          rules={signUpValidationRules.password}
          label="비밀번호"
          placeholder="8자리 이상, 영어/숫자/특수 문자"
          errorMessage={errors.password?.message}
        />
        <SignUpSelect
          register={register}
          name="admissionYearString"
          label="입학년도"
          rules={{ required: '입학 년도를 선택해주세요' }}
          errorMessage={errors.admissionYearString?.message}
          options={Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return { value: `${year}`, label: `${year}` };
          })}
        />
        <AuthInput
          register={register}
          name="pwConfirm"
          type="password"
          rules={{
            ...signUpValidationRules.pwConfirm,
            validate: value => value === password || '비밀번호가 일치하지 않습니다.',
          }}
          label="비밀번호 확인"
          placeholder="8자리 이상, 영어/숫자/특수 문자"
          errorMessage={errors.pwConfirm?.message}
        />
        <AuthInput
          register={register}
          name="studentId"
          rules={signUpValidationRules.studentId}
          label="학번"
          placeholder="학번 8자리를 입력해주세요"
          errorMessage={errors.studentId?.message}
        />

        <AuthInput
          register={register}
          name="name"
          rules={signUpValidationRules.name}
          label="이름"
          placeholder="이름을 입력해주세요"
          errorMessage={errors.name?.message}
        />
        <AuthInput
          register={register}
          name="major"
          rules={signUpValidationRules.major}
          label="학부/학과"
          placeholder="ex) 소프트웨어학부, 컴퓨터공학부"
          errorMessage={errors.major?.message}
        />

        <AuthInput
          register={register}
          name="phoneNumber"
          rules={signUpValidationRules.phoneNumber}
          label="연락처"
          placeholder="-을 포함해서 작성해주세요. ex) 010-1234-5678"
          errorMessage={errors.phoneNumber?.message}
        />
      </div>
      <SignUpCheckbox
        register={register}
        name="agreeToTerms"
        label="[필수] 이용 약관에 동의합니다."
        rules={{ required: '약관에 동의해야 합니다.' }}
        errorMessage={errors.agreeToTerms?.message}
      />
    </>
  );
};
