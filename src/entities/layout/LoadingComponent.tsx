import { BarLoader } from 'react-spinners';

export const LoadingComponent = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-60 text-2xl font-bold text-white">
        <BarLoader color="white" speedMultiplier={1} />
      </div>
    </>
  );
};
