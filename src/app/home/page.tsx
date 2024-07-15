import { HomeRscService, getRscAccess } from "@/shared";

const HomePage = async () => {
  const { getHomePage } = HomeRscService();
  const data = await getHomePage();
  const token = await getRscAccess();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      Home {data[0].board.id}
    </div>
  );
};

export default HomePage;
