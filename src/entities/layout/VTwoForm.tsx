'use client';

import { useForm } from 'react-hook-form';

import { Header, Line, SubHeader } from '@/entities';
import { AuthService, UserService, useUserStore } from '@/shared';

export const VTwoForm = () => {
  const checkVTwo = useUserStore((state) => state.checkVTwo);

  const { checkNicknameDuplicate } = AuthService();
  const { updateVTwo, updateInfo } = UserService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<{
    nickname: string;
    phoneNumberHyphen: string;
  }>({ mode: 'onBlur' });

  const handleNicknameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (!nickname) return; // 빈 값일 경우 무시

    // 닉네임 길이 및 형식 검사
    if (nickname.length < 1 || nickname.length > 16) {
      setError('nickname', {
        type: 'length',
        message: '닉네임은 1글자 이상 16글자 이내로 입력해주세요.',
      });
      return;
    } else {
      clearErrors('nickname');
    }

    // 닉네임 중복 검사
    const isDuplicate = await checkNicknameDuplicate(nickname);
    if (isDuplicate) {
      setError('nickname', {
        type: 'duplicate',
        message: '이미 사용 중인 닉네임입니다.',
      });
    } else {
      clearErrors('nickname');
    }
  };

  const onSubmit = async (data: { nickname: string; phoneNumberHyphen: string }) => {
    await updateInfo({
      nickname: data.nickname,
      phoneNumber: data.phoneNumberHyphen,
      profileImage: null,
    });
    await updateVTwo();
    window.location.href = '/home';
  };

  if (checkVTwo) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"></div>
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
            <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">연락처</label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 p-2"
              type="text"
              placeholder="-을 포함해서 작성해주세요. ex) 010-1234-1234"
              {...register('phoneNumberHyphen', {
                required: '연락처를 입력해주세요',
                pattern: {
                  value: /^(01[016789]-\d{3,4}-\d{4})$/,
                  message: `올바른 전화번호 형식이 아닙니다.\n예) 010-1234-5678`,
                },
              })}
            />
            <p className="text-error">
              {errors?.phoneNumberHyphen?.message?.split('\n').map((line, index) => (
                <div key={index} className="text-center">
                  {line}
                  <br />
                </div>
              ))}
            </p>
          </div>

          <div className="flex w-full flex-col items-center sm:w-1/2">
            <label className="mb-2 block text-lg font-bold text-gray-700 sm:text-xl">닉네임</label>
            <input
              className="w-full rounded-lg border-2 border-gray-300 p-2"
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
              })}
              onBlur={handleNicknameBlur}
            />
            {errors.nickname && <p className="text-error">{errors.nickname.message}</p>}
          </div>
        </div>
        <button className="mt-4 h-12 w-2/3 rounded bg-focus text-lg text-white hover:bg-blue-500">시작하기</button>
      </form>
    </>
  );
};
