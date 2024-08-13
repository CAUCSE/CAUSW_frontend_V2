"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useLayoutStore, AuthService, emailRegex } from "@/shared";
import {
  VideoBackground,
  ImageBackground,
  FormInput,
  FormSubmitButton,
} from "@/entities";

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

  return (
    <>
      <VideoBackground src="/videos/signin-background.mp4" />
      <ImageBackground
        src="/images/signin-logo.png"
        alt="sign in page background img"
        darkBackground
      />
      <div className="absolute top-1/3 left-1/2 w-full transform -translate-x-1/2 flex flex-col justify-center items-center">
        <div className="text-white text-xl mb-4">함께라면 더 밝은 미래로</div>
        <div className="text-center text-white text-3xl font-bold tracking-widest mb-10 sm:text-5xl ">
          우리들의 동문 네트워크
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-4"
        >
          <FormInput
            register={register}
            name="email"
            placeholder="이메일을 입력해주세요"
          ></FormInput>

          {enterEmail ? (
            <>
              <FormInput
                register={register}
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              ></FormInput>
              <FormSubmitButton />
            </>
          ) : (
            <>
              <div className="flex flex-row items-center">
                <input type="checkbox" id="auto" {...register("auto")} />
                <label
                  htmlFor="auto"
                  className="text-white text-sm ml-1 font-thin"
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
              className="text-white text-sm mt-2 underline font-thin md:mt-1"
            >
              {route.name}
            </div>
          ))}
      </div>
      <div className="w-full absolute bottom-10 flex flex-col items-center md:flex-row md:justify-end md:bottom-5">
        <span className="text-white text-lg font-bold mt-2 md:mr-7">
          문의하기
        </span>
        <div className="w-32 flex flex-row justify-between mt-2 md:mr-4">
          <Image
            src="/images/kakao.png"
            alt="kakao"
            width={50}
            height={50}
          ></Image>
          <Image
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
