import { ProfileImage, Header, SubHeader } from "@/entities";
import { CircleRscService, UserRscService } from "@/shared";
import { formatDateString } from "@/utils";

import Link from "next/link";

const CircleMembers = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { getCircleMembers } = CircleRscService();

  const data = await getCircleMembers(id);

  return (
    <>
      <div className="ml-[3%] mt-8 w-[97%] md:mt-[6%]">
        <Link href={"/circle/" + id} className="mb-4 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header bold>{data[0].circle.name} 총 부원</Header>

        <div className="flex flex-wrap gap-2">
          {data.map((element) => (
            <div
              key={element.user.id}
              className="flex h-44 w-36 flex-col items-center justify-center"
            >
              <ProfileImage src={element.user.profileImage}></ProfileImage>
              <SubHeader bold>
                {element.user.name} ({element.user.admissionYear % 100})
              </SubHeader>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CircleMembers;
