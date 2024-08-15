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
        <div className="w-5/6 h-5/6 grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_5fr_1fr] gap-4">
          <Header bold>{data.name}</Header>
          <div className="col-span-2 flex justify-end items-center gap-3">
            <div className="w-48 h-full flex rounded-2xl items-center justify-center text-lg border-2 border-black">
              가입 신청 받기
            </div>
            <div className="w-48 h-full flex rounded-2xl items-center justify-center text-lg border-2 border-black">
              신청 현황 보기
            </div>
            <span className="icon-[icon-park-outline--write] text-4xl"></span>
          </div>

          <div className="row-span-3 w-64 h-64 flex justify-center items-center overflow-hidden rounded-xl">
            <img
              src={data.mainImage ?? "/images/signin-logo.png"}
              alt={"Circle Image"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-2 flex flex-row items-end text-lg">
            <div className="font-bold mr-6">동아리 회비</div>
            <div>40000만원</div>
          </div>

          <div className="col-span-2 flex flex-row items-center text-lg">
            <div className="font-bold mr-[39px]">모집 인원</div>
            <div>40000만원</div>
          </div>

          <div className="col-span-2 flex flex-row items-start text-lg">
            <div className="font-bold mr-[39px]">동아리원</div>
            <div>{data.numMember}명</div>
          </div>

          <div className="flex flex-col items-center w-32 gap-2">
            <div className="text-2xl font-bold mt-6 mb-6">운영진</div>
            <ProfileImage src={leader.profileImage}></ProfileImage>
            <SubHeader bold>
              회장 {data.leaderName} ({leader.admissionYear % 100})
            </SubHeader>
          </div>

          <div className="col-span-2">
            <div className="text-2xl font-bold mt-6 mb-6">설명</div>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>

          <div className="flex bg-account rounded-2xl items-center justify-center text-lg text-white">
            신청하기
          </div>
          <div className="flex bg-barkblue rounded-2xl items-center justify-center text-lg text-white">
            동아리 게시판
          </div>
          <div className="flex bg-default rounded-2xl items-center justify-center text-lg text-white">
            부원 명단 보기
          </div>
        </div>
      </div>
    </>
  );
};

export default Circle;
