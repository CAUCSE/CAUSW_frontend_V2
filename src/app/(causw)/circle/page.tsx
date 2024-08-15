import { CircleElement } from "@/entities";
import { CircleRscService } from "@/shared/hooks/services/CircleRscSevice";

const CirclePage = async () => {
  const { getCirclesPage } = CircleRscService();
  const data = await getCirclesPage();

  return (
    <>
      <div
        className="absolute top-32 left-0 w-full h-3/4 transform overflow-y-scroll bg-[#F8F8F8] rounded-3xl
        md:top-0 md:left-40 md:w-[71%] md:h-screen"
      >
        <div className="text-2xl font-bold w-72 ml-20 mt-6 md:mt-16">
          동아리 목록
        </div>
        <div className="flex flex-row flex-wrap ml-16">
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
