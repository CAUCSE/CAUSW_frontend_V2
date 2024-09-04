import { Header, Line, SubHeader, ExcelExport } from "@/entities";

import Link from "next/link";

interface Prop {
  state: string;
  title: string;
  firstNavigation: { name: string; state: string };
  navigation?: { name: string; state: string }[];
  data: { userName: string; studentId: string; id: string }[];
  headers: { label: string; key: string }[];
}

export const Management = ({
  state,
  title,
  firstNavigation,
  navigation,
  data,
  headers,
}: Prop) => {
  const isFirstNavigation = navigation
    ? navigation.findIndex((elemenent) => elemenent.state === state) === -1
    : false;

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <Link href={"/setting"} className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <ExcelExport headers={headers} data={data} />
      <Header bold big>
        {title}
      </Header>
      <div className="mb-[-18px] w-full overflow-x-auto md:mb-0">
        <div
          className={`mt-8 flex ${navigation && navigation.length > 2 ? "mb-1 w-[600px] justify-between" : "mb-5 w-full justify-evenly"} flex-row md:mb-1 md:w-full md:justify-evenly`}
        >
          <Link
            href={firstNavigation.state}
            className={`${isFirstNavigation ? "border-b-4 border-b-focus" : ""} text-xl`}
          >
            {firstNavigation.name}
          </Link>
          {navigation
            ? navigation.map((elemenent) => (
                <Link
                  key={elemenent.state}
                  href={elemenent.state}
                  className={`${state === elemenent.state ? "border-b-4 border-b-focus" : ""} text-xl`}
                >
                  {elemenent.name}
                </Link>
              ))
            : null}
        </div>
      </div>
      <Line />
      <div className="ml-2 mt-6 flex flex-col">
        {data.map((element) => (
          <div className="text-lg" key={element.userName}>
            {element.userName}({element.studentId})
          </div>
        ))}
      </div>
    </div>
  );
};
