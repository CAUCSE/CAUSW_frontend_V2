"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { onClickAlert } from "@/shared";

import { useLayoutStore, AuthService, emailRegex } from "@/shared";
import {
  VideoBackground,
  ImageBackground,
  LoadingComponent,
} from "@/entities";
import "@/firebase-messaging-sw";
import { SignInInput, SignInSubmitButton } from "@/fsd_entities/auth";
import { SignInFooter } from "@/fsd_widgets/auth";

const routes = [
  { name: "회원가입하기", route: "/auth/signup" },
  { name: "아이디 찾기", route: "/auth/findemail" },
  { name: "비밀번호 찾기", route: "/auth/findpassword" },
  { name: "알림 허용하기", route: "/auth/test", handler: onClickAlert },
];

const SignInPage = () => {
  const router = useRouter();

  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);
  const { signin } = AuthService();

  const [enterEmail, setEnterEmail] = useState<boolean>(false);

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
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope,
          );
        })
        .catch((err) =>
          console.error("Service Worker registration failed: ", err),
        );
    }
  }, []);

  return (
    <>
      {false ? <LoadingComponent /> : null}
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
          className="text-md text-white sm:mb-3 sm:text-2xl"
        >
          함께라면 더 밝은 미래로
        </div>
        <div
          onClick={() => {
            setEnterEmail(false);
          }}
          className="mb-3 text-center text-2xl font-bold tracking-widest text-white sm:mb-8 sm:text-5xl"
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
              />
              <SignInSubmitButton />
            </>
          ) : (
            <>
              <div className="mt-1 flex w-full items-start justify-between pl-1 pr-1">
                <div className="flex items-center">
                  <input type="checkbox" id="auto" {...register("auto")} />
                  <label
                    htmlFor="auto"
                    className="ml-1 text-xs font-thin text-white sm:text-[16px]"
                  >
                    자동 로그인
                  </label>
                </div>
                <div className="flex flex-col items-end">
                  {routes.map((route) => (
                    <div
                      key={route.name}
                      onClick={() => {
                        if (route.handler) route.handler();
                        router.push(route.route);
                      }}
                      className="border-b-2-white font-boerder mb-2 border-b text-xs text-white sm:text-[16px] md:mt-1 md:hidden"
                    >
                      {route.name}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </form>

        {!enterEmail &&
          routes.map((route) => (
            <div
              key={route.name}
              onClick={() => {
                if (route.handler) route.handler();
                router.push(route.route);
              }}
              className="border-b-2-white font-boerder mt-2 hidden border-b text-white md:mt-1 md:block"
            >
              {route.name}
            </div>
          ))}
      </div>
      <div className="flex absolute w-full bottom-3 md:bottom-5 justify-end">
        <SignInFooter></SignInFooter>
      </div>
    </>
  );
};

export default SignInPage;
