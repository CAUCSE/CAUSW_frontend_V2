import Image from 'next/image';

export const SignInFooter = () => (
  <div className="flex flex-row items-center">
    <span className="mt-2 mr-1 text-end text-sm font-bold text-white sm:text-lg">
      중앙대학교 소프트웨어학부 <br /> ICT 위원회
    </span>
    <div className="mt-2 mr-3 flex flex-row justify-between md:mr-4">
      <Image
        onClick={() => {
          window.location.href = 'https://pf.kakao.com/_HYxjFj';
        }}
        src="/images/kakao.png"
        alt="kakao"
        width={50}
        height={50}
        className="mr-1 h-10 w-10 md:h-[50px] md:w-[50px]"
      ></Image>
      <Image
        onClick={() => {
          window.location.href = 'https://www.instagram.com/causwcse_dongne/';
        }}
        src="/images/instagram.png"
        alt="instagram"
        width={50}
        height={50}
        className="h-10 w-10 md:h-[50px] md:w-[50px]"
      ></Image>
    </div>
  </div>
);
