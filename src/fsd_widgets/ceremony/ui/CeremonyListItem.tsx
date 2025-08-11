'use client';

interface CeremonyListItemProps {
  item: Ceremony.CeremonyItem;
}

export const CeremonyListItem = ({ item }: CeremonyListItemProps) => {
  return (
    <div className="mb-3 w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-base font-bold text-gray-800">{item.writer}</p>
          <p className="mt-1 text-xs text-gray-500">{item.date}</p>
        </div>
        <p className="text-sm font-medium text-gray-700">{item.category}</p>
      </div>

      <div className="mt-2 flex items-end justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm">
            <span className="text-gray-400">설명 </span>
            <span className="text-black">{item.description}</span>
          </p>
        </div>
        <p className="ml-4 text-xs text-gray-700">{item.createdAt}</p>
      </div>
    </div>
  );
};
