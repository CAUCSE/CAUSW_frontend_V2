const PostSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center space-x-8 space-y-0 rounded-xl bg-white p-4 shadow-lg lg:p-6">
      <div className="w-full">
        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
        <div className="mb-2.5 h-2 w-52 max-w-[480px] rounded-full bg-gray-200 md:w-full"></div>
        <div className="mb-2.5 h-2 w-44 max-w-[440px] rounded-full bg-gray-200 md:w-full"></div>
        <div className="mb-2.5 h-2 w-48 max-w-[460px] rounded-full bg-gray-200 md:w-full"></div>
        <div className="h-2 w-40 max-w-[360px] rounded-full bg-gray-200 md:w-full"></div>
      </div>
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-gray-300">
        <svg
          className="h-10 w-10 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
    </div>
  );
};

export const PostSkeletonList = () => {
  const array = new Array(3).fill(0);
  return (
    <div className="flex flex-col gap-4 pb-4">
      {array.map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};
