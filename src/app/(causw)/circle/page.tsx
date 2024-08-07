import { CircleRscService } from "@/shared/hooks/services/CircleRscSevice";

const CirclePage = async () => {
  const { getCirclesPage } = CircleRscService();
  const data = await getCirclesPage();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
      Circle {data[0].id}
    </div>
  );
};

export default CirclePage;
