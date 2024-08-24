import { CircleElement } from "@/entities";
import { CircleRscService } from "@/shared";

const CirclePage = async () => {
  const { getCircles } = CircleRscService();
  const data = await getCircles();

  return (
    <>
      <div className="ml-20 mt-6 w-72 text-2xl font-bold md:mt-16">
        동아리 목록
      </div>
      <div className="ml-16 flex flex-row flex-wrap">
        {data.map((circle) =>
          !circle.isDeleted ? (
            <CircleElement
              key={circle.id}
              id={circle.id}
              name={circle.name}
              description={circle.description}
              mainImage={circle.mainImage ?? "/images/signin-logo.png"}
            />
          ) : null,
        )}
      </div>
    </>
  );
};

export default CirclePage;
