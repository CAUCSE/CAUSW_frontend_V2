import { ProfileImage, Header, SubHeader } from "@/entities";
import { CircleRscService, UserRscService } from "@/shared";

const Circle = async ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle } = CircleRscService();
  const { getUser } = UserRscService();

  const data = await getCircle(id);
  const leader = await getUser(data.leaderId);

  return (
    <>
      <div className="flex w-full items-center justify-center overflow-y-scroll md:h-screen">
        <div className="grid h-5/6 w-5/6 grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_5fr_1fr] gap-4">
          <Header bold>{data.name}</Header>
          <div className="col-span-2 flex items-center justify-end gap-3">
            <div className="flex h-full w-48 items-center justify-center rounded-2xl border-2 border-black text-lg">
              가입 신청 받기
            </div>
            <div className="flex h-full w-48 items-center justify-center rounded-2xl border-2 border-black text-lg">
              신청 현황 보기
            </div>
            <span className="icon-[icon-park-outline--write] text-4xl"></span>
          </div>

          <div className="row-span-3 flex h-64 w-64 items-center justify-center overflow-hidden rounded-xl">
            <img
              src={data.mainImage ?? "/images/signin-logo.png"}
              alt={"Circle Image"}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="col-span-2 flex flex-row items-end text-lg">
            <div className="mr-6 font-bold">동아리 회비</div>
            <div>40000만원</div>
          </div>

          <div className="col-span-2 flex flex-row items-center text-lg">
            <div className="mr-[39px] font-bold">모집 인원</div>
            <div>40000만원</div>
          </div>

          <div className="col-span-2 flex flex-row items-start text-lg">
            <div className="mr-[39px] font-bold">동아리원</div>
            <div>{data.numMember}명</div>
          </div>

          <div className="flex w-32 flex-col items-center gap-2">
            <div className="mb-6 mt-6 text-2xl font-bold">운영진</div>
            <ProfileImage src={leader.profileImage}></ProfileImage>
            <SubHeader bold>
              회장 {data.leaderName} ({leader.admissionYear % 100})
            </SubHeader>
          </div>

          <div className="col-span-2">
            <div className="mb-6 mt-6 text-2xl font-bold">설명</div>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>

          <div className="flex items-center justify-center rounded-2xl bg-account text-lg text-white">
            신청하기
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-barkblue text-lg text-white">
            동아리 게시판
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-default text-lg text-white">
            부원 명단 보기
          </div>
        </div>
      </div>
    </>
  );
};

export default Circle;
