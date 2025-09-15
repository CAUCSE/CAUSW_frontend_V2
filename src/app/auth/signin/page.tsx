'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SignInFooter } from '@/widgets/auth';

import { SignInInput, SignInSubmitButton, useRecoverAccount } from '@/entities/auth';
import { useLogin } from '@/entities/auth/model/hooks/useLogin';
import { usePushNotification } from '@/entities/notification/model/usePushNotification';

import { ActionModal } from '@/shared/ui/ActionModal';

import '@/firebase-messaging-sw';
import { emailRegex, getRccRefresh } from '@/shared';

const routes = [
  { name: '아이디찾기', route: '/auth/findemail' },
  { name: '비밀번호찾기', route: '/auth/findpassword' },
  { name: '회원가입', route: '/auth/signup' },
  // { name: "알림 허용하기", route: "/auth/test", handler: onClickAlert },
];

const SignInPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const router = useRouter();
  const login = useLogin({ onDeletedAccount: handleOpenModal });
  const { mutate: recoverAccountMutate } = useRecoverAccount();

  const { compareFCMToken } = usePushNotification();

  const { register, handleSubmit, control, watch } = useForm<User.SignInRequestDto>({
    defaultValues: {
      email: '',
      password: '',
      auto: true,
    },
  });

  const onSubmit = async (data: User.SignInRequestDto) => {
    if (!emailRegex.test(data.email)) {
      toast.error('이메일을 올바른 형식으로 입력해주세요!');
      return;
    }

    if (!data.password) {
      toast.error('비밀번호를 입력해주세요!');
      return;
    }

    await login.mutateAsync(data);
    await compareFCMToken();
  };

  useEffect(() => {
    const checkLogin = async () => {
      const refreshToken = await getRccRefresh();

      if (refreshToken) {
        router.replace('/home');
      }
    };

    checkLogin();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {});
    }
  }, []);

  const formEmail = watch('email');

  const handleRecover = () => {
    if (formEmail) {
      recoverAccountMutate({ email: formEmail });
      setIsModalOpen(false);
    }
  };
  return (
    <>
      {isModalOpen && (
        <ActionModal
          closeModal={() => {
            setIsModalOpen(false);
          }}
          headTitle="탈퇴한 유저입니다"
          subTitle="계정 복구를 진행하시겠습니까?"
          topBtnLabel="닫기"
          BottomBtnLabel="복구"
          bottomBtnOnClick={handleRecover}
        />
      )}
      <div className="mx-auto flex h-screen w-full max-w-[502px] flex-1 flex-col items-center justify-between gap-5 px-8 py-18 sm:px-5">
        <div className="flex w-full flex-col items-center gap-1.5 sm:gap-3">
          <div className="relative h-[34px] w-[250px] sm:h-[68px] sm:w-[500px]">
            <Image
              src="/images/chungang_logo.svg"
              alt="chungang university logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="font-pretendard text-xs font-normal sm:text-2xl sm:font-medium">
            함께라면 더 밝은 미래로, 우리들의
          </div>
          <div className="font-pretendard mb-2 text-center text-sm font-bold tracking-widest sm:mt-[-4px] sm:text-[26px]">
            동문네트워크
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-[20px] bg-[#eef1f1] p-[15px] sm:p-7.5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-1 flex w-full flex-col items-center justify-center gap-1 sm:gap-3.5"
          >
            <SignInInput register={register} name="email" placeholder="이메일을 입력해주세요" />
            <SignInInput register={register} name="password" type="password" placeholder="비밀번호를 입력해주세요" />

            <div className="mt-1 flex w-full items-center gap-2"></div>
            <SignInSubmitButton />

            <div className="mt-2 flex w-full items-center justify-center">
              <div className="mb-4 flex flex-col items-center gap-2.5 sm:gap-5">
                {routes.map((route) => (
                  <div
                    key={route.name}
                    onClick={() => {
                      router.push(route.route);
                    }}
                    className="cursor-pointer text-[9px] font-medium sm:text-xs sm:font-normal"
                  >
                    {route.name}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="flex w-full">
          <SignInFooter></SignInFooter>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
