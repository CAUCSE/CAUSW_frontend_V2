const dateFormat = {
  0: '년 ',
  1: '월 ',
  2: '일 ',
};

export const OccasionDateTile = ({ title, date }: OccasionDateTileProps) => {
  const formattedDate = date.split('-');

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-medium md:text-2xl">{title}</h1>
      <div className="flex gap-2 text-lg md:text-xl">
        {formattedDate.map((number, idx) => {
          return (
            <p key={dateFormat[idx]}>
              <span>{number}</span>
              <span>{dateFormat[idx]}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
