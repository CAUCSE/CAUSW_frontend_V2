import { Banner, Calendar, CardBox, HomeCard } from "@/entities/home";
import { HomeRscService } from "@/shared";
import Link from "next/link";

const cardsEntities = [
  {
    title: "Team Project Room",
    subtitle: "틸플룸 예약하기",
    icon: "/homeIcons/teamProj.png",
    href: "https://cse.cau.ac.kr/sub05/sub0504_cal.php",
    bgColor: "bg-[rgba(255,235,133,1)]",
  },
  {
    title: "View meal menus",
    subtitle: "중앙대 학식 메뉴 보기",
    icon: "/homeIcons/meals.png",
    href: "https://mportal.cau.ac.kr/main.do",
    bgColor: "bg-[rgba(250,200,187,1)]",
  },
  {
    title: "Choosing a locker",
    subtitle: "사물함 예약하기",
    icon: "/homeIcons/locker.png",
    href: "/lockers", // FIXME: Change to actual locker page
    bgColor: "bg-[rgba(118,198,209,1)]",
  },
];

const HomePage = async () => {
  const { getHomePosts, getEvents } = HomeRscService();
  let events, homePosts;
  try {
    events = await getEvents();
    homePosts = await getHomePosts();
  } catch (e: any) {
    console.error(e.message);
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-center gap-[5vh] bg-[rgba(248,248,248,1)] px-4 py-[6vh]">
        {events && (
          <Banner
            images={
              events.count > 0
                ? events.events.map((e) => e.image)
                : ["/images/puang-proud.png"]
            }
            loop={events.count > 0}
          />
        )}
        <div className="grid h-full w-full gap-[25px] lg:grid-cols-[1fr_3fr]">
          <div className="max-lg:hidden">
            <Calendar />
          </div>
          <div className="grid grid-rows-[0.5fr_2fr] gap-[25px]">
            <div className="flex h-fit w-full overflow-auto bg-transparent scrollbar-hide">
              <div className="-mx-3 grid grid-cols-[repeat(3,75vw)] gap-[20px] bg-transparent px-3 py-4 lg:grid-cols-3">
                {cardsEntities.map((card, idx) => (
                  <HomeCard key={idx} {...card} />
                ))}
              </div>
            </div>
            <div className="lg:hidden">
              <Calendar />
            </div>
            <CardBox className="flex h-full w-full flex-col items-center gap-[24px] p-[18px]">
              <p className="text-[24px] font-bold">빠른 공지 모아모아!!</p>
              <div className="h-full w-full lg:grid lg:grid-cols-[1fr_1.2fr]">
                <div className="flex w-full flex-col items-center justify-around border-r border-[rgba(209,209,209,1)] max-lg:hidden">
                  {/* TODO : href 연결 */}
                  <Link href={""} className="underline">
                    ❗️ 서비스 공지
                  </Link>
                  <Link href={""}>📖️ 소프트웨어학부 공지</Link>
                  <Link href={""}>🌍️ 동문회 공지 게시판</Link>
                  <Link href={""}>🏆️ 학생회 공지 게시판</Link>
                </div>
                <div className="pl-[20px]">
                  {homePosts?.slice(3).map(({ board, posts }) => {
                    // TODO : 손봐야댐
                    return (
                      <p key={board.id}>
                        {board.name}: {posts.numberOfElements}개의 글
                      </p>
                    );
                  })}
                </div>
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
