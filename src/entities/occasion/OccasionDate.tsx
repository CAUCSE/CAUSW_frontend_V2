const dateFormat = {
  0: "년 ",
  1: "월 ",
  2: "일 ",
};

interface OccasionDateProp {
  title: string;
  date: string;
}

export const OccasionDate = ({ title, date }: OccasionDateProp) => {
  const formattedDate = date.split("-");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold md:text-2xl">{title}</h1>
      <div className="flex gap-2 text-lg md:text-xl">
        {formattedDate.map((number, idx) => {
          return (
            <>
              <p key={idx}>
                <span className="underline underline-offset-4">{number}</span>
                <span>{dateFormat[idx]}</span>
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};
