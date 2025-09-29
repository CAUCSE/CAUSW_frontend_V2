import { BarLoader } from 'react-spinners';

type LoadingVariant = 'background-only' | 'full-opacity';

export const LoadingComponent = ({ variant = 'background-only' }: { variant?: LoadingVariant }) => {
  const baseClass =
    'fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center text-2xl font-bold text-white';

  const opacityClass = variant === 'full-opacity' ? 'opacity-60 bg-black' : 'bg-black bg-opacity-60';

  return (
    <>
      <div className={`${baseClass} ${opacityClass}`}>
        <BarLoader color="white" speedMultiplier={1} />
      </div>
    </>
  );
};
