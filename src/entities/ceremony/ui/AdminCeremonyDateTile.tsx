import { dateFormat } from '@/shared';

export const CeremonyDateTile = ({ title, date }: Ceremony.CeremonyDateTileProps) => {
  const formattedDate = date.split('-');

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-medium md:text-2xl">{title}</h1>
      <div className="flex gap-2 text-lg md:text-xl">
        {formattedDate.map((number, idx) => {
          return (
            <p key={dateFormat[idx]}>
              <span className="border-b border-[#000000] pr-2 md:border-none md:pr-0">{number}</span>
              <span>{dateFormat[idx]}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
