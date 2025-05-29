import { BarLoader } from 'react-spinners';

export const LoadingComponent = () => {
  return (
    <>
      <div className="bg-opacity-60 fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black text-2xl font-bold text-white">
        <BarLoader color="white" speedMultiplier={1} />
      </div>
    </>
  );
};
