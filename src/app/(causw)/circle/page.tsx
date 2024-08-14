import { CircleElement } from "@/entities";
import { CircleRscService } from "@/shared/hooks/services/CircleRscSevice";

const CirclePage = async () => {
  const { getCirclesPage } = CircleRscService();
  const data = await getCirclesPage();

  return (
    <>
      <div className="absolute top-32 left-40 w-[70%] h-full transform overflow-y-scroll bg-[#F8F8F8] md:top-0 rounded-3xl">
        <div className="flex flex-row flex-wrap ">
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
      </div>
    </>
  );
};

export default CirclePage;
