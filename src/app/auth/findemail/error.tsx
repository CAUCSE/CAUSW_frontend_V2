'use client';

import Image from 'next/image';

export const Error = () => {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
      <Image src="/images/puang-proud.png" alt="404" width={200} height={250}></Image>
      <span className="text-center">아이디 찾기 도중 에러가 발생했습니다.</span>
    </div>
  );
};
export default Error;
