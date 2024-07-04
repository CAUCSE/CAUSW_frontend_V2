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
