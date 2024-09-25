import { ProfileImage, Header, SubHeader } from "@/entities";
import { CircleRscService, UserRscService } from "@/shared";
import { formatDateString } from "@/utils";

import Link from "next/link";

const CircleMembers = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { getCircle, getCircleUsers } = CircleRscService();

  const circle = await getCircle(id);
  //const members = await getCircleUsers(id, "MEMBER");

  return (
    <>
      <div className="ml-[3%] mt-8 w-[90%] md:mt-[6%]">
        <Link href={"/circle/" + id} className="mb-4 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header bold>{circle.name} 총 부원</Header>
      </div>
    </>
  );
};

export default CircleMembers;
