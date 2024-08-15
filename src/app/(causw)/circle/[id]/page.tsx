import { ProfileImage, Header, SubHeader } from "@/entities";
import { CircleRscService, UserRscService } from "@/shared";

const Circle = async ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle } = CircleRscService();
  const { getUser } = UserRscService();

  const data = await getCircle(id);
  const leader = await getUser(data.leaderId);

  return (
    <>
      <div
        className="flex items-center justify-center absolute top-32 left-0 w-full h-3/4 transform overflow-y-scroll bg-[#F8F8F8] rounded-3xl
        md:top-0 md:left-40 md:w-[71%] md:h-screen"
      >
        <div className="w-5/6 h-5/6 grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_2fr_2fr_5fr_1fr] gap-4">
          <Header bold>{data.name}</Header>
          <div className="bg-red-500 col-span-2">세 번째 요소</div>
          <div className="row-span-2 w-64 h-64 flex justify-center items-center overflow-hidden rounded-xl">
            <img
              src={data.mainImage ?? "/images/default_profile.png"}
              alt={"Circle Image"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-green-500 col-span-2">
            <div className="text-2xl font-bold w-72 ml-20 mt-6 md:mt-16">
              운영진
            </div>
          </div>

          <div className="bg-red-500 col-span-2">세 번째 요소</div>

          <div className="flex flex-col items-center w-32 gap-2">
            <div className="text-2xl font-bold mt-6 mb-6">운영진</div>
            <ProfileImage src={leader.profileImage}></ProfileImage>
            <SubHeader bold>
              회장 {data.leaderName} ({leader.admissionYear % 100})
            </SubHeader>
          </div>
          <div className="bg-purple-500 col-span-2">다섯 번째 요소</div>
          <div className="bg-purple-500">다섯 번째 요소</div>
          <div className="bg-purple-500">다섯 번째 요소</div>
          <div className="bg-purple-500">다섯 번째 요소</div>
        </div>
      </div>
    </>
  );
};

export default Circle;
