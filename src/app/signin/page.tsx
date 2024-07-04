import { VideoBackground, ImageBackground } from "@/entities";

const SignInPage = () => {
  return (
    <>
      <VideoBackground src="/videos/signin_background.mp4" />
      <ImageBackground
        src="/images/main_logo.png"
        alt="sign in page background img"
        darkBackground
      />
    </>
  );
};

export default SignInPage;
