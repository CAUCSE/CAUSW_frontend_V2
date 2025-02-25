import Image from "next/image";

export const PostSearchIntro = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Image
        src="/images/search_bg.png"
        alt="검색화면배경사진"
        width={150}
        height={150}
      />
      <p className="text-2xl">게시물을 검색해주세요 !</p>
    </div>
  );
};
