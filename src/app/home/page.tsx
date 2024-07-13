import { HomeRscService } from "@/shared";

const HomePage = async () => {
  const { getHomePage } = HomeRscService();
  const data = await getHomePage();
  console.log(data);

  return <>{data}</>;
};

export default HomePage;
