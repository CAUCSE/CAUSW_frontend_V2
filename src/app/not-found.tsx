import Image from "next/image";

import HomeLayout from "./(causw)/layout";

const NotFound = () => (
  <HomeLayout>
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
      <Image
        src="/images/puang-proud.png"
        alt="404"
        width={200}
        height={250}
      ></Image>
      <span>페이지가 존재하지 않습니다.</span>
    </div>
  </HomeLayout>
);

export default NotFound;
