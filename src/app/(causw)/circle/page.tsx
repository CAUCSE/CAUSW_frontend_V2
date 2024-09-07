import { CircleElement } from "@/entities";
import { CircleRscService } from "@/shared";

const CirclePage = async () => {
  const { getCircles } = CircleRscService();
  const data = await getCircles();

  return (
    <>
      <div className="ml-7 mt-6 text-2xl font-bold md:ml-20 md:mt-16">
        동아리 목록
      </div>
      <div className="flex w-full flex-row flex-wrap justify-center">
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
