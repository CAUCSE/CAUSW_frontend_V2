import { CircleRscService } from "@/shared";

const Circle = async ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle } = CircleRscService();
  const data = await getCircle(id);

  return (
    <>
      <div
        className="absolute top-32 left-0 w-full h-3/4 transform overflow-y-scroll bg-[#F8F8F8] rounded-3xl
        md:top-0 md:left-40 md:w-[71%] md:h-screen"
      >
        <div className="w-52 h-52 flex justify-center items-center overflow-hidden rounded-xl">
          <img
            src={data.mainImage ?? "/images/default_profile.png"}
            alt={"Circle Image"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Circle;
