'use client';

import { AuthFormSubmitButton, AuthInput, useV2Form } from '@/fsd_entities/auth';

import { Header, Line, SubHeader } from '@/entities';

export const VTwoForm = () => {
  const { register, handleSubmit, errors, onSubmit, checkVTwo, checkNicknameDuplicate } = useV2Form();

  if (checkVTwo) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-16"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed left-1/2 top-1/2 z-50 flex h-4/5 w-screen max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white"
      >
        <Header bold>CAUSW 동문 네트워크 V2</Header>
        <SubHeader big>두번째 이야기에 오신것을 환영합니다.</SubHeader>
        <div className="mb-5 mt-3 w-2/3">
          <Line />
        </div>
        <SubHeader>더 좋은 품질의 서비스를 위해</SubHeader>
        <SubHeader>추가적인 정보를 입력해주세요.</SubHeader>
        <div className="mt-2 flex w-2/3 flex-col justify-between gap-3 sm:flex-row">
          <div className="flex w-full flex-col items-center sm:w-1/2">
            <AuthInput
              register={register}
              name="phoneNumberHyphen"
              label="연락처"
              placeholder="-을 포함해서 작성해주세요. ex) 010-1234-1234"
              rules={{
                required: '연락처를 입력해주세요',
                pattern: {
                  value: /^(01[016789]-\d{3,4}-\d{4})$/,
                  message: `올바른 전화번호 형식이 아닙니다.\n예) 010-1234-5678`,
                },
              }}
              errorMessage={errors.phoneNumberHyphen?.message}
            />
          </div>

          <div className="flex w-full flex-col items-center sm:w-1/2">
            <AuthInput
              register={register}
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              rules={{
                required: '닉네임을 입력해주세요',
                validate: async value => {
                  if (typeof value !== 'string') return '닉네임은 문자열이어야 합니다.';
                  const isAvailable = await checkNicknameDuplicate(value);
                  return isAvailable || '이미 사용 중인 닉네임입니다.';
                },
              }}
              errorMessage={errors.nickname?.message}
            />
          </div>
        </div>
        <AuthFormSubmitButton content="시작하기" />
      </form>
    </>
  );
};
