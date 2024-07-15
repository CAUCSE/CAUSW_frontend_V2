"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useLayoutStore, AuthService, emailRegex } from "@/shared";
import {
  VideoBackground,
  ImageBackground,
  FormInput,
  FormSubmitButton,
} from "@/entities";

const SignInPage = () => {
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
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center">
        <div className="text-white text-xl mb-4">함께라면 더 밝은 미래로</div>
        <div className="text-white text-5xl font-bold tracking-widest mb-12">
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
              <div>
                <input type="checkbox" id="auto" {...register("auto")} />
                <label htmlFor="auto">자동 로그인</label>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default SignInPage;
