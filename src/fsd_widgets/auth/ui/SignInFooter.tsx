import Image from 'next/image';

export const SignInFooter = () => (
  <div className="flex w-full flex-col items-center gap-1">
    <span className="font-pretendard text-xs font-normal sm:text-2xl sm:font-medium">
      중앙대학교 소프트웨어학부 ICT 위원회
    </span>
    <div className="mt-2 flex flex-row justify-between gap-6 sm:mr-4">
      <Image
        onClick={() => {
          window.location.href = 'https://pf.kakao.com/_HYxjFj';
        }}
        src="/images/kakao.png"
        alt="kakao"
        width={50}
        height={50}
        className="mr-1 h-10 w-10 sm:h-[44px] sm:w-[44px]"
      ></Image>
      <Image
        onClick={() => {
          window.location.href = 'https://www.instagram.com/causwcse_dongne/';
        }}
        src="/images/instagram.png"
        alt="instagram"
        width={50}
        height={50}
        className="h-10 w-10 sm:h-[44px] sm:w-[44px]"
      ></Image>
    </div>
  </div>
);
