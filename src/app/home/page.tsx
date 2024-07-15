import { HomeRscService, getRscRefresh } from "@/shared";

const HomePage = async () => {
  const { getHomePage } = HomeRscService();
  const data = await getHomePage();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      Home {data[0].posts.number}
    </div>
  );
};

export default HomePage;
