import Link from 'next/link';

export const NavigationTabLink = ({
  navigation,
  state,
  firstNavigation,
}: {
  navigation?: {
    name: string;
    state: string;
    router: string;
  }[];
  state: string | undefined;
  firstNavigation: {
    name: string;
    state: string;
    router: string;
  };
}) => (
  <div className="mb-[-18px] h-[86px] w-full overflow-x-auto scrollbar-hide md:mb-0 md:h-[70px]">
    <div
      className={`mt-8 flex px-4 ${navigation && navigation.length > 5 ? 'mb-1 w-[1000px] justify-between' : navigation && navigation.length > 2 ? 'mb-1 w-[600px] justify-between' : 'mb-5 w-full justify-start'} flex-row md:mb-1 md:justify-start lg:w-full`}
    >
      {navigation?.map((el: any) => (
        <Link key={el.state} href={el.state === state ? el.router : firstNavigation.router} className="mb-3 text-lg">
          {el.name}
        </Link>
      ))}
    </div>
  </div>
);

export default NavigationTabLink;
