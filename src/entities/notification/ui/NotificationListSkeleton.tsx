export const NotificationListSkeleton = () => {
  return (
    <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="rounded-lg bg-white p-1"
        >
          <div className="flex animate-pulse items-center gap-3 p-1">
            <div className="h-6 w-6 flex-shrink-0 rounded bg-gray-300"></div>
            <div className="flex w-full flex-col gap-2 py-1">
              <div className="h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="h-3 w-full rounded bg-gray-300"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
