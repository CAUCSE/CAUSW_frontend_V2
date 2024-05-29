"use client";

import { VideoBackground, ImageBackground } from "@/entities";
import { useFetchData } from "@/shared";

const SignInPage = () => {
  const { data, error, loading } = useFetchData("/api/users/signIn");

  return (
    <>
      <VideoBackground src="/videos/signin_background.mp4" />
      <ImageBackground
        src="/images/main_logo.png"
        alt="sign in page background img"
      />
    </>
  );
};

export default SignInPage;
