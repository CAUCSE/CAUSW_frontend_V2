import Link from 'next/link';

export const AdminCeremonyList = ({ list, firstNavigation, navigation, state }: Ceremony.CeremonyListProps) => {
  return (
    <div className="mt-6 ml-2 flex flex-col">
      {list.map((element: Ceremony.CeremonyItem) => (
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
