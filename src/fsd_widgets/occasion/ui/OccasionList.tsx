import Link from 'next/link';

export const OccasionList = ({ list, firstNavigation, navigation, state }: Occasion.OccasionListProps) => {
  return (
    <div className="ml-2 mt-6 flex flex-col">
      {list.map((element: Occasion.Occasion) => (
        <Link
          href={
            (firstNavigation ? firstNavigation.router : navigation!.find((el: any) => el.state === state)?.router) +
            '/' +
            element.id
          }
          className="mb-3 text-lg"
          key={element.id}
        >
          {element.title}
        </Link>
      ))}
    </div>
  );
};
