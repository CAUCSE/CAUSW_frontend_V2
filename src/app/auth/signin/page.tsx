"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useLayoutStore, AuthService, emailRegex } from "@/shared";
import {
  VideoBackground,
  ImageBackground,
  SignInInput,
  SignInSubmitButton,
  LoadingComponent,
} from "@/entities";

const SignInPage = () => {
  const router = useRouter();

  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);
  const { signin } = AuthService();

  const [enterEmail, setEnterEmail] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<User.SignInRequestDto>({
    defaultValues: {
      email: "",
      password: "",
      auto: true,
    },
  });

  const onSubmit = (data: User.SignInRequestDto) => {
    if (!enterEmail) {
      if (emailRegex.test(data.email)) setEnterEmail(true);
      else setErrorMessage("이메일을 올바른 형식으로 입력해주세요!");
      return;
    }

    if (!data.password) {
      setErrorMessage("비밀번호를 입력해주세요!");
      return;
    }

    setLoading(true);
    signin(data);
  };

  if (loading) <LoadingComponent />;

  return (
    <>
      <VideoBackground src="/videos/signin-background.mp4" />
      <ImageBackground
        src="/images/signin-logo.png"
        alt="sign in page background img"
        darkBackground
      />
      <div className="absolute left-1/2 top-1/3 flex w-full -translate-x-1/2 transform flex-col items-center justify-center">
        <div className="mb-4 text-xl text-white">함께라면 더 밝은 미래로</div>
        <div className="mb-10 text-center text-3xl font-bold tracking-widest text-white sm:text-5xl">
          우리들의 동문 네트워크
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <SignInInput
            register={register}
            name="email"
            placeholder="이메일을 입력해주세요"
          ></SignInInput>

          {enterEmail ? (
            <>
              <SignInInput
                register={register}
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              ></SignInInput>
              <SignInSubmitButton />
            </>
          ) : (
            <>
              <div className="flex flex-row items-center">
                <input type="checkbox" id="auto" {...register("auto")} />
                <label
                  htmlFor="auto"
                  className="ml-1 text-sm font-thin text-white"
                >
                  자동 로그인
                </label>
              </div>
            </>
          )}
        </form>
        {!enterEmail &&
          routes.map((route) => (
            <div
              key={route.name}
              onClick={() => {
                router.push(route.route);
              }}
              className="mt-2 text-sm font-thin text-white underline md:mt-1"
            >
              {route.name}
            </div>
          ))}
      </div>
      <div className="absolute bottom-10 flex w-full flex-col items-center md:bottom-5 md:flex-row md:justify-end">
        <span className="mt-2 text-lg font-bold text-white md:mr-7">
          문의하기
        </span>
        <div className="mt-2 flex w-32 flex-row justify-between md:mr-4">
          <Image
            onClick={() => {
              window.location.href = "https://pf.kakao.com/_HYxjFj";
            }}
            src="/images/kakao.png"
            alt="kakao"
            width={50}
            height={50}
          ></Image>
          <Image
            onClick={() => {
              window.location.href =
                "https://www.instagram.com/causwcse_dongne/";
            }}
            src="/images/instagram.png"
            alt="instagram"
            width={50}
            height={50}
          ></Image>
        </div>
      </div>
    </>
  );
};

const routes = [
  { name: "회원가입하기", route: "/auth/signup" },
  { name: "아이디 찾기", route: "/auth/findemail" },
  { name: "비밀번호 찾기", route: "/auth/findpassword" },
];

export default SignInPage;
