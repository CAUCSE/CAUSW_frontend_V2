import { HomeRscService } from "@/shared";

const HomePage = async () => {
  const { getHomePage } = HomeRscService();
  const data = await getHomePage();
  console.log(data);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      Home
    </div>
  );
};

export default HomePage;
