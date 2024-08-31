import { UserRscService } from "@/shared";
import { Header, Line, SubHeader, ExcelExport } from "@/entities";

import Link from "next/link";

const navigations = [
  { name: "가입 거부 유저", state: "drop" },
  { name: "활성 유저", state: "active" },
  { name: "추방 유저", state: "inactive_n_drop" },
  { name: "탈퇴 유저", state: "inactive" },
];

const UsersManagement = async ({
  params: { state },
}: {
  params: { state: string };
}) => {
  const isAddmission =
    navigations.findIndex((navigation) => navigation.state === state) === -1;

  const { findByState, findAllAdmissions } = UserRscService();

  /* const data = isAddmission
    ? await findAllAdmissions(null, 0)
    : await findByState(state.toUpperCase() as User.UserDto["state"], null, 0); */

  const headers = [
    { label: "이름", key: "userName" },
    { label: "학번", key: "studentId" },
  ];

  const data = [
    { userName: "강민규", studentId: "20203128" },
    { userName: "윤민규", studentId: "20203128" },
  ];

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <Link href={"/setting"} className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <ExcelExport headers={headers} data={data} />
      <Header bold big>
        유저 관리
      </Header>
      <div className="mb-[-18px] w-full overflow-x-auto md:mb-0">
        <div className="md: mb-1 mt-8 flex w-[560px] flex-row justify-between md:w-full md:justify-evenly">
          <Link
            href={"admission"}
            className={`${isAddmission ? "border-b-4 border-b-focus" : ""} text-xl`}
          >
            가입 대기 유저
          </Link>
          {navigations.map((navigation) => (
            <Link
              key={navigation.state}
              href={navigation.state}
              className={`${state === navigation.state ? "border-b-4 border-b-focus" : ""} text-xl`}
            >
              {navigation.name}
            </Link>
          ))}
        </div>
      </div>
      <Line />
      <div className="ml-2 mt-6 flex flex-col">
        {data.map((a) => (
          <div className="text-lg" key={a.userName}>
            {a.userName}({a.studentId})
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersManagement;
