import { Banner } from "@/entities/home/banner/Banner";

const imageMock = [
  "/images/banner-dummy.png",
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
      <div className="flex h-screen flex-col items-center justify-evenly">
        <Banner images={imageMock} />
        <Banner images={imageMock} />
        <Banner images={imageMock} />
      </div>
    </>
  );
};

export default HomePage;
