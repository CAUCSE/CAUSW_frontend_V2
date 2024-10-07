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

  const events = await getEvents();
  const homePosts = await getHomePosts();

  const coumcilBoard = homePosts.find((board) =>
    board.board.name.includes("학생회 공지"),
  );
  const cauBoard = homePosts.find((board) =>
    board.board.name.includes("학부 공지"),
  );
  const serviceBoard = homePosts.find((board) =>
    board.board.name.includes("서비스 공지"),
  );
  const alumniBoard = homePosts.find((board) =>
    board.board.name.includes("동문회 공지"),
  );

  return (
    <>
      <div className="flex w-full flex-col justify-center gap-4 bg-[rgba(248,248,248,1)] px-4 py-4 lg:h-full">
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

        <div className="grid w-full gap-[25px] lg:h-4/5 lg:grid-cols-[400px_3fr]">
          <div className="h-full w-full max-lg:hidden">
            <Calendar />
          </div>

          <div className="gap-[25px] lg:h-full">
            <div className="w-full gap-3 max-md:hidden md:flex lg:hidden">
              <div className="mb-5 h-[600px] w-2/5">
                <Calendar />
              </div>
              <div className="flex w-3/5 flex-col gap-3 bg-transparent">
                {cardsEntities.map((card, idx) => (
                  <HomeCard key={idx} {...card} />
                ))}
                <div className="flex h-80 w-full items-center justify-center">
                  <img
                    className="h-64 w-72"
                    alt="logo"
                    src="./images/signin-logo.png"
                  ></img>
                </div>
              </div>
            </div>

            <div className="flex w-full overflow-auto bg-transparent scrollbar-hide md:hidden lg:flex lg:h-1/5">
              <div className="flex w-full flex-col justify-between gap-[20px] bg-transparent pb-4 lg:grid lg:grid-cols-3 lg:flex-row">
                {cardsEntities.map((card, idx) => (
                  <HomeCard key={idx} {...card} />
                ))}
              </div>
            </div>

            <div className="mb-5 h-[600px] w-full md:hidden">
              <Calendar />
            </div>

            <CardBox className="flex w-full flex-col items-center gap-[24px] p-[18px] lg:h-4/5">
              <p className="h-6 text-[24px] font-bold">빠른 공지 모아모아!!</p>
              <div className="flex h-[calc(100%-24px)] w-full justify-center">
                <div className="hidden w-2/5 flex-col items-center justify-around border-r border-[rgba(209,209,209,1)] text-xl font-bold md:flex">
                  <span>❗️ 서비스 공지</span>
                  <span>📖️ 소프트웨어학부 공지</span>
                  <span>🌍️ 동문회 공지 게시판</span>
                  <span>🏆️ 학생회 공지 게시판</span>
                </div>

                <div className="flex h-80 w-5/6 flex-col items-center justify-around text-lg font-bold md:text-xl lg:h-full lg:w-3/5">
                  {serviceBoard?.posts.content[0] ? (
                    <Link
                      href={
                        "/board/" +
                        serviceBoard?.board.id +
                        "/" +
                        serviceBoard?.posts.content[0].id
                      }
                      className="flex flex-col items-center"
                    >
                      {serviceBoard?.posts.content[0].title}
                      <div className="text-sm font-normal text-gray-400">
                        {serviceBoard?.posts.content[0].updatedAt.split("T")[0]}
                      </div>
                    </Link>
                  ) : (
                    "최신 공지가 없습니다."
                  )}
                  {cauBoard?.posts.content[0] ? (
                    <Link
                      href={
                        "/board/" +
                        cauBoard?.board.id +
                        "/" +
                        cauBoard?.posts.content[0].id
                      }
                      className="flex flex-col items-center"
                    >
                      {cauBoard?.posts.content[0].title}
                      <div className="text-sm font-normal text-gray-400">
                        {cauBoard?.posts.content[0].updatedAt.split("T")[0]}
                      </div>
                    </Link>
                  ) : (
                    "최신 공지가 없습니다."
                  )}
                  {alumniBoard?.posts.content[0] ? (
                    <Link
                      href={
                        "/board/" +
                        alumniBoard?.board.id +
                        "/" +
                        alumniBoard?.posts.content[0].id
                      }
                      className="flex flex-col items-center"
                    >
                      {alumniBoard?.posts.content[0].title}
                      <div className="text-sm font-normal text-gray-400">
                        {alumniBoard?.posts.content[0].updatedAt.split("T")[0]}
                      </div>
                    </Link>
                  ) : (
                    "최신 공지가 없습니다."
                  )}
                  {coumcilBoard?.posts.content[0] ? (
                    <Link
                      href={
                        "/board/" +
                        coumcilBoard?.board.id +
                        "/" +
                        coumcilBoard?.posts.content[0].id
                      }
                      className="flex flex-col items-center"
                    >
                      {coumcilBoard?.posts.content[0].title}
                      <div className="text-sm font-normal text-gray-400">
                        {coumcilBoard?.posts.content[0].updatedAt.split("T")[0]}
                      </div>
                    </Link>
                  ) : (
                    "최신 공지가 없습니다."
                  )}
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
