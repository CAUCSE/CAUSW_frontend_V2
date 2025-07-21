'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { SignInFooter } from '@/fsd_widgets/auth';

import { SignInInput, SignInSubmitButton } from '@/fsd_entities/auth';

import { LoadingComponent } from '@/entities';
import '@/firebase-messaging-sw';
import { Switch } from '@/shadcn/components/ui';
import { AuthService, emailRegex, getRccRefresh, useLayoutStore } from '@/shared';

const routes = [
  { name: '아이디찾기', route: '/auth/findemail' },
  { name: '비밀번호찾기', route: '/auth/findpassword' },
  { name: '회원가입', route: '/auth/signup' },
  // { name: "알림 허용하기", route: "/auth/test", handler: onClickAlert },
];

const SignInPage = () => {
  const router = useRouter();

  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);
  const { signin } = AuthService();

  const [enterEmail, setEnterEmail] = useState<boolean>(false);

  const { register, handleSubmit, control } = useForm<User.SignInRequestDto>({
    defaultValues: {
      email: '',
      password: '',
      auto: true,
    },
  });

  const onSubmit = (data: User.SignInRequestDto) => {
    if (!enterEmail) {
      if (emailRegex.test(data.email)) setEnterEmail(true);
      else setErrorMessage('이메일을 올바른 형식으로 입력해주세요!');
      return;
    }

    if (!data.password) {
      setErrorMessage('비밀번호를 입력해주세요!');
      return;
    }

    signin(data);
  };

  useEffect(() => {
    if (getRccRefresh()) router.replace('/home');
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {});
    }
  }, []);
  return (
    <>
      {false ? <LoadingComponent /> : null}
      <div className="flex h-screen w-full flex-1 flex-col items-center justify-between px-8 py-22">
        <div className="flex w-full flex-col items-center">
          <Image src={'/images/chungang_logo.svg'} width={250} height={34} alt="chuan-ang unviersity logo" priority />
          <div
            onClick={() => {
              setEnterEmail(false);
            }}
            className="font-pretendard mt-3 text-xs"
          >
            함께라면 더 밝은 미래로, 우리들의
          </div>
          <div
            onClick={() => {
              setEnterEmail(false);
            }}
            className="font-pretendard mt-1 mb-2 text-center text-sm font-bold tracking-widest sm:mb-8 sm:text-5xl"
          >
            동문네트워크
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-[#eef1f1] px-4 pt-3 pb-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-1 flex w-full flex-col items-center justify-center gap-1"
          >
            <SignInInput register={register} name="email" placeholder="이메일을 입력해주세요" />
            <SignInInput register={register} name="password" type="password" placeholder="비밀번호를 입력해주세요" />
            {/* <div className="mt-1 flex w-full items-center gap-2">
              <label htmlFor="auto" className="ml-1 text-xs font-thin sm:text-[16px]">
                자동로그인
              </label>
              <Switch id="attendance-type" {...register('auto')} />
            </div>
             */}
            <div className="mt-1 flex w-full items-center gap-2">
              <label htmlFor="auto" className="ml-1 text-xs font-thin sm:text-[16px]">
                자동로그인
              </label>
              <Controller
                name="auto"
                control={control}
                render={({ field }) => (
                  <Switch id="auto" checked={field.value ?? false} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <SignInSubmitButton />

            <div className="mt-2 flex w-full items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                {routes.map((route) => (
                  <div
                    key={route.name}
                    onClick={() => {
                      router.push(route.route);
                    }}
                    className="font-boerder text-xs"
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
