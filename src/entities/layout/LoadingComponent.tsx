import { BarLoader } from "react-spinners";

export const LoadingComponent = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-2xl font-bold z-50">
        <BarLoader color="white" speedMultiplier={1} />
      </div>
    </>
  );
};
