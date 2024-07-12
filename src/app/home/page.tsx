import { HomeService, ErrorListener } from "@/shared";

const HomePage = async () => {
  const { getHomePage } = HomeService();
  const data = await getHomePage();
  console.log(data);

  return <>{data}</>;
};

export default HomePage;
