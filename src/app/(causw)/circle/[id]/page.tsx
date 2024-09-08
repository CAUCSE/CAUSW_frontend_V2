import { ProfileImage, Header, SubHeader } from "@/entities";
import { CircleRscService, UserRscService } from "@/shared";

const Circle = async ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle } = CircleRscService();
  const { getUser } = UserRscService();

  const data = await getCircle(id);
  const leader = await getUser(data.leaderId);

  return (
    <>
      <div className="lg:h- ml-[3%] mt-8 grid h-[800px] w-[90%] grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_1fr_4fr_6fr_1fr_1fr_1fr_1fr_1fr] gap-4 md:mt-[6%] md:h-[90%] lg:h-5/6">
        <div className="col-span-2 md:col-span-1 md:row-span-2">
          <Header bold>{data.name}</Header>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-3 md:col-span-2 md:row-span-2">
          <div className="hidden h-full w-48 items-center justify-center rounded-xl border-2 border-black text-lg md:flex">
            가입 신청 받기
          </div>
          <div className="hidden h-full w-48 items-center justify-center rounded-xl border-2 border-black text-lg md:flex">
            신청 현황 보기
          </div>
          <span className="icon-[icon-park-outline--write] text-3xl md:text-4xl"></span>
        </div>

        <div className="row-span-4 flex min-w-36 items-center overflow-hidden rounded-xl">
          <img
            src={data.mainImage ?? "/images/signin-logo.png"}
            alt={"Circle Image"}
            className="h-36 w-36 object-cover md:h-64 md:w-64"
          />
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:text-lg">
          <div className="mr-[20px] font-bold lg:mr-[39px]">모집 기간</div>
          <div>40000만원</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:text-lg">
          <div className="mr-2 font-bold lg:mr-6">동아리 회비</div>
          <div>40000만원</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:text-lg">
          <div className="mr-[20px] font-bold lg:mr-[39px]">모집 인원</div>
          <div>40000만원</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:text-lg">
          <div className="mr-[22px] font-bold lg:mr-[39px]">동아리원</div>
          <div>{data.numMember}명</div>
        </div>

        <div className="col-span-3 row-span-1 flex w-32 flex-col items-center gap-2 md:col-span-1 md:row-span-5">
          <div className="mb-6 mt-6 w-full text-2xl font-bold">운영진</div>
          <ProfileImage src={leader.profileImage}></ProfileImage>
          <SubHeader bold>
            회장 {data.leaderName} ({leader.admissionYear % 100})
          </SubHeader>
        </div>

        <div className="col-span-3 row-span-1 md:col-span-2 md:row-span-5">
          <div className="mb-6 mt-6 text-2xl font-bold">설명</div>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>

        <div className="col-span-3 row-span-1 flex min-h-10 items-center justify-center rounded-xl bg-account text-lg text-white md:col-span-1 md:row-span-2 lg:text-xl">
          신청하기
        </div>
        <div className="col-span-3 row-span-1 flex min-h-10 items-center justify-center rounded-xl bg-barkblue text-lg text-white md:col-span-1 md:row-span-2 lg:text-xl">
          동아리 게시판
        </div>
        <div className="col-span-3 row-span-1 flex min-h-10 items-center justify-center rounded-xl bg-default text-lg text-white md:col-span-1 md:row-span-2 lg:text-xl">
          부원 명단 보기
        </div>

        <div className="col-span-3 row-span-1 flex min-h-10 items-center justify-center rounded-xl border-2 border-black text-lg md:hidden">
          가입 신청 받기
        </div>
        <div className="col-span-3 row-span-1 flex min-h-10 items-center justify-center rounded-xl border-2 border-black text-lg md:hidden">
          신청 현황 보기
        </div>
        <div className="h-5"></div>
      </div>
    </>
  );
};

export default Circle;
