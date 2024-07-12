import Image from "next/image";

const NotFound = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-xl font-bold">
    <Image
      src="/images/puang-proud.png"
      alt="404"
      width={200}
      height={250}
    ></Image>
    <span>페이지가 존재하지 않거나,</span>
    <span>권한이 없습니다.</span>
  </div>
);

export default NotFound;
