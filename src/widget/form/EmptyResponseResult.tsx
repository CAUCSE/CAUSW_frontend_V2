import Image from 'next/image';

export const EmptyResponseResult = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
      <Image src="/images/puang-proud.png" alt="404" width={200} height={250}></Image>
      <span className="text-center">제출된 답변이 없습니다.</span>
    </div>
  );
};
