"use client";

//API 호출을 최소화하기 위해 관리자로 접속시 이미지와 학번이 관리자로 표기됨.

import { CircleRscService, UserRscService, useUserStore } from "@/shared";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LoadingComponent, Header, SubHeader, ProfileImage } from "@/entities";

const CircleDetailEdit = ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle } = CircleRscService();

  const [circle, setCircle] = useState<Circle.CircleRequestDto>();

  const circleIdIfLeader = useUserStore((state) => state.circleIdIfLeader);
  const admissionYear = useUserStore((state) => state.admissionYear);
  const profileImage = useUserStore((state) => state.profileImage);
  const isAdmin = useUserStore((state) => state.isAdmin);

  const router = useRouter();

  useEffect(() => {
    if (!isAdmin() && !circleIdIfLeader?.includes(id))
      router.push("/no-permission");
    getCircle(id).then((data) => setCircle(data));
  }, []);

  if (!circle) return <LoadingComponent />;

  return (
    <>
      <div className="ml-[3%] mt-8 grid h-[800px] w-[90%] grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_1fr_4fr_6fr_1fr_1fr_1fr_1fr_1fr] gap-4 md:mt-[6%] lg:h-5/6">
        <div className="col-span-3 min-h-24 md:row-span-2">
          <div
            onClick={() => router.back()}
            className="mb-4 flex items-center text-lg"
          >
            <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
            이전
          </div>
          <Header bold>{circle.name}</Header>
        </div>

        <div className="row-span-4 flex min-h-36 min-w-36 items-center overflow-hidden">
          <img
            src={circle.mainImage ?? "/images/signin-logo.png"}
            alt={"Circle Image"}
            className="h-36 w-36 rounded-2xl object-cover md:h-64 md:w-64"
          />
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:h-10 md:text-lg">
          <div className="mr-2 font-bold lg:mr-6">동아리 회비</div>
          <div>{circle.circleTax}원</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:h-10 md:text-lg">
          <div className="mr-[20px] font-bold lg:mr-[39px]">모집 인원</div>
          <div>{circle.recruitMembers}명</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:h-10 md:text-lg">
          <div className="mr-[22px] font-bold lg:mr-[39px]">동아리원</div>
          <div>{circle.numMember}명</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm md:h-10 md:text-lg">
          {circle.isJoined && circle.joinedAt ? (
            <>
              <div className="mr-[20px] font-bold lg:mr-[39px]">모집 기간</div>
              <div>{circle.joinedAt.toLocaleDateString()}</div>
            </>
          ) : (
            <span className="text-gray-500">모집 기간이 아닙니다.</span>
          )}
        </div>

        <div className="col-span-3 row-span-1 flex w-32 flex-col items-center gap-2 md:col-span-1 md:row-span-4">
          <div className="mb-6 mt-6 w-full text-2xl font-bold">운영진</div>
          <ProfileImage src={profileImage}></ProfileImage>
          <SubHeader bold>
            회장 {circle.leaderName} ({admissionYear % 100})
          </SubHeader>
        </div>

        <div className="col-span-3 row-span-1 md:col-span-2 md:row-span-4">
          <div className="mb-6 mt-6 text-2xl font-bold">설명</div>
          <div dangerouslySetInnerHTML={{ __html: circle.description }} />
        </div>

        <div className="col-span-3 row-span-1 flex h-10 items-center justify-center rounded-xl bg-account text-lg text-white md:col-span-1 md:row-span-2 md:h-16 lg:text-xl">
          신청하기
        </div>
        <div className="col-span-3 row-span-1 flex h-10 items-center justify-center rounded-xl bg-barkblue text-lg text-white md:col-span-1 md:row-span-2 md:h-16 lg:text-xl">
          동아리 게시판
        </div>
        <div className="col-span-3 row-span-1 flex h-10 items-center justify-center rounded-xl bg-default text-lg text-white md:col-span-1 md:row-span-2 md:h-16 lg:text-xl">
          부원 명단 보기
        </div>
      </div>
    </>
  );
};

export default CircleDetailEdit;
