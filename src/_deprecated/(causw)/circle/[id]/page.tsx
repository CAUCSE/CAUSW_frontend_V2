import Link from 'next/link';

import { CircleApplyOnButton, Header, ProfileImage, SubHeader } from '@/entities';
import { CircleRscService, UserRscService } from '@/shared';
import { formatDateString } from '@/utils';

const Circle = async ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle, getCircleMembers } = CircleRscService();
  const { getMe, getMyCircles } = UserRscService();

  const me = await getMe();
  const circle = await getCircle(id);
  const members = await getCircleMembers(id);
  const leader = members.find((member) => member.user.id === circle.leaderId)?.user;

  const myCircles = await getMyCircles();

  const isCircleLeader = me.circleIdIfLeader?.includes(id) || me.roles.includes('ADMIN');

  const isMyCircle = myCircles.findIndex((myCircle) => myCircle.id === id) !== -1;

  return (
    <>
      <div className="ml-[3%] mt-8 grid h-[800px] w-[90%] grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_1fr_4fr_6fr_1fr_1fr_1fr_1fr_1fr] gap-4 xl:mt-[6%] xl:h-5/6">
        <div className={`${isCircleLeader ? 'col-span-2 xl:col-span-1' : 'col-span-3'} mb-2 min-h-24 xl:row-span-2`}>
          <Link href={'/circle'} className="mb-4 flex items-center text-lg">
            <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
            이전
          </Link>
          <div className="sm:relative sm:w-full sm:overflow-visible">
            <span className="sm:absolute sm:whitespace-nowrap">
              <Header bold>{circle.name}</Header>
            </span>
          </div>
        </div>
        <div
          className={`${isCircleLeader ? 'flex' : 'hidden'} col-span-1 flex items-center justify-end gap-5 xl:col-span-2 xl:row-span-2`}
        >
          <CircleApplyOnButton xl={true} circle={circle} />
          <Link
            href={'/setting/management/circle/' + id + '/apply'}
            className="hidden h-16 w-48 items-center justify-center rounded-md border-2 border-black text-lg xl:flex"
          >
            신청 현황 보기
          </Link>
          <Link href={`/circle/${id}/edit`}>
            <span className="icon-[icon-park-outline--write] mt-2 text-3xl xl:text-5xl"></span>
          </Link>
        </div>

        <div className="row-span-4 flex min-h-36 min-w-36 items-center overflow-hidden">
          <img
            src={circle.mainImage ?? '/images/signin-logo.png'}
            alt={'Circle Image'}
            className="h-36 w-36 rounded-2xl object-cover xl:h-64 xl:w-64"
          />
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm xl:h-10 xl:text-lg">
          <div className="mr-4 font-bold xl:mr-6">동아리 회비</div>
          <div>{circle.circleTax}원</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm xl:h-10 xl:text-lg">
          <div className="mr-[32px] font-bold xl:mr-[39px]">모집 인원</div>
          <div>{circle.recruitMembers}명</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm xl:h-10 xl:text-lg">
          <div className="mr-[36px] font-bold xl:mr-[45px]">동아리원</div>
          <div>{circle.numMember}명</div>
        </div>

        <div className="col-span-2 flex flex-row items-center text-sm xl:h-10 xl:text-lg">
          {circle.isRecruit && circle.isRecruit ? (
            <>
              <div className="mr-4 font-bold xl:mr-6">모집 마감일</div>
              <div>{formatDateString(circle.recruitEndDate)}</div>
            </>
          ) : (
            <div className="text-gray-500">모집 기간이 아닙니다.</div>
          )}
        </div>

        <div className="col-span-3 row-span-1 flex w-32 flex-col items-center gap-2 xl:col-span-1 xl:row-span-4">
          <div className="mb-6 mt-6 w-full text-2xl font-bold">운영진</div>
          <ProfileImage src={leader ? leader.profileImageUrl : '/images/default_profile.png'}></ProfileImage>
          <SubHeader bold>
            회장 {circle.leaderName} ({leader && leader!.admissionYear % 100})
          </SubHeader>
        </div>

        <div className="col-span-3 row-span-1 xl:col-span-2 xl:row-span-4">
          <div className="mb-6 mt-6 text-2xl font-bold">설명</div>
          <div className="h-36 w-full overflow-y-auto rounded-md bg-white p-2" style={{ whiteSpace: 'pre-line' }}>
            {circle.description}
          </div>
        </div>

        {!isMyCircle ? (
          <Link
            href={'/circle/' + id + '/apply'}
            className="col-span-3 row-span-1 flex h-10 items-center justify-center rounded-md bg-account text-lg text-white xl:col-span-2 xl:row-span-2 xl:h-16 xl:text-xl"
          >
            신청하기
          </Link>
        ) : (
          <Link
            href={'/circle/' + id + '/board'}
            className="col-span-3 row-span-1 mt-60 flex h-10 items-center justify-center rounded-md bg-barkblue text-lg text-white xl:col-span-2 xl:row-span-2 xl:h-16 xl:text-xl"
          >
            동아리 게시판
          </Link>
        )}
        <Link
          href={'/circle/' + id + '/members'}
          className="col-span-3 row-span-1 mt-60 flex h-10 items-center justify-center rounded-md bg-default text-lg text-white xl:col-span-1 xl:row-span-2 xl:h-16 xl:text-xl"
        >
          부원 명단 보기
        </Link>

        {isCircleLeader ? (
          <>
            <CircleApplyOnButton xl={false} circle={circle} />
            <Link
              href={'/setting/management/circle/' + id + '/apply'}
              className="col-span-3 row-span-1 flex h-10 items-center justify-center rounded-md border-2 border-black text-lg xl:hidden xl:h-16"
            >
              신청 현황 보기
            </Link>
          </>
        ) : null}
        <div className="h-5"></div>
      </div>
    </>
  );
};

export default Circle;
