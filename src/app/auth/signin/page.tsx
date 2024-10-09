"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  useLayoutStore,
  AuthService,
  emailRegex,
  getRscRefresh,
} from "@/shared";
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

  const [loading, onLoading] = useState(true);

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

    signin(data);
  };

  useEffect(() => {
    getRscRefresh().then((res) => {
      if (res) router.push("/home");
      else onLoading(false);
    });
  }, []);

  if (loading) <LoadingComponent />;

  return (
    <>
      <VideoBackground src="/videos/signin-background.mp4" />
      <ImageBackground
        src="/images/signin-logo.png"
        alt="sign in page background img"
        darkBackground
      />
      <div className="absolute left-1/2 top-[35%] flex w-full -translate-x-1/2 transform flex-col items-center justify-center">
        <div
          onClick={() => {
            setEnterEmail(false);
          }}
          className="mb-3 text-2xl text-white"
        >
          함께라면 더 밝은 미래로
        </div>
        <div
          onClick={() => {
            setEnterEmail(false);
          }}
          className="mb-8 text-center text-3xl font-bold tracking-widest text-white sm:text-5xl"
        >
          우리들의 동문 네트워크
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-1 flex flex-col items-center justify-center gap-1"
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
                <label htmlFor="auto" className="ml-1 font-thin text-white">
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
              className="border-b-2-white font-boerder mt-2 border-b text-white md:mt-1"
            >
              {route.name}
            </div>
          ))}
      </div>

      <div className="absolute bottom-10 flex w-full flex-col items-center md:bottom-5 md:flex-row md:justify-end">
        <span className="mt-2 text-end text-lg font-bold text-white md:mr-7">
          중앙대학교 소프트웨어학부 ICT 위원회
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
