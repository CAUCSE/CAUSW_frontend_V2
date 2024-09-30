import { CircleElement } from "@/entities";
import { CircleRscService, UserRscService } from "@/shared";

const CirclePage = async () => {
  const { getCircles } = CircleRscService();
  const { getMyCircles } = UserRscService();
  const circles = await getCircles();
  const myCircles = await getMyCircles();

  console.log(myCircles);
  console.log(circles);

  return (
    <>
      <div className="ml-7 mt-6 text-2xl font-bold md:ml-14 md:mt-16">
        내 동아리 목록
      </div>
      <div className="flex w-full flex-row flex-wrap justify-center md:ml-9 md:w-[calc(100%-56px)] md:justify-start">
        {myCircles.length < 1 ? (
          <div className="ml-6 mt-2 text-gray-500">
            가입된 동아리가 없습니다.
          </div>
        ) : (
          myCircles.map((circle) =>
            !circle.isDeleted ? (
              <CircleElement
                key={circle.id + "my"}
                id={circle.id}
                name={circle.name}
                description={circle.description}
                mainImage={circle.mainImage ?? "/images/signin-logo.png"}
              />
            ) : null,
          )
        )}
      </div>
      <div className="ml-7 mt-6 text-2xl font-bold md:ml-14 md:mt-16">
        전체 동아리 목록
      </div>
      <div className="flex w-full flex-row flex-wrap justify-center md:ml-9 md:w-[calc(100%-56px)] md:justify-start">
        {circles.map((circle) =>
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
