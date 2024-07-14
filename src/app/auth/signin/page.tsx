"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { VideoBackground, ImageBackground } from "@/entities";

const SignInPage = () => {
  const [enterEmail, setEnterEmail] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<User.SignInRequestDto>({
    defaultValues: {
      email: "",
      password: "",
      auto: true,
    },
  });

  const emailEventHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") setEnterEmail(false);
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
        <div className="text-white text-5xl font-bold tracking-widest">
          우리들의 동문 네트워크
        </div>
      </div>
    </>
  );
};

export default SignInPage;
