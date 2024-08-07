import { CircleElement } from "@/entities";
import { CircleRscService } from "@/shared/hooks/services/CircleRscSevice";

const CirclePage = async () => {
  const { getCirclesPage } = CircleRscService();
  const data = await getCirclesPage();

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
        Circle? {data[0].id}
        {data.map((circle) => (
          <CircleElement
            key={circle.id}
            id={circle.id}
            name={circle.name}
            description={circle.description}
            mainImage={circle.mainImage ?? "/images/cau-logo.png"}
          ></CircleElement>
        ))}
      </div>
    </>
  );
};

export default CirclePage;
