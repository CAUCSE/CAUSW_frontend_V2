import { Banner, Calendar } from "@/entities/home";

const imageMock = [
  "/images/banner_dummy.png",
  "/images/cau-logo.png",
  "/images/default_profile.png",
  "/images/puang-proud.png",
  "/images/signin-logo.png",
];

const HomePage = async () => {
  // const { getHomePosts } = HomeRscService();
  // let data;
  // try {
  //   data = await getHomePosts();
  // } catch {
  //   console.error("error");
  // }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-center gap-[5vh] bg-[rgba(248,248,248,1)] px-4 py-[6vh]">
        <Banner images={imageMock} />
        <div className="grid h-full w-full grid-cols-[1fr_1.5fr]">
          <Calendar />
          <div className="grid grid-rows-[0.5fr_2fr]"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
