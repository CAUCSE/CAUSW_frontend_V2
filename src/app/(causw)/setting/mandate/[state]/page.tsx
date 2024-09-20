"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { Header, SubHeader, Line } from "@/entities";
import { userRoleCodes } from "@/shared";
import { useState } from "react";

interface IFormInput {
  searchContent: string;
}

const RoleMandate = ({ params: { state } }: { params: { state: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const [data, setDate] = useState([
    { userName: "강민규", studentId: "20203128", id: "1" },
    { userName: "윤민규", studentId: "20203128", id: "2" },
  ]);

  const [selectId, setSelectId] = useState<string>();

  return (
    <div className="relative left-4 top-3 w-[calc(100%-2rem)] md:left-14 md:top-14 md:w-[calc(100%-7rem)]">
      <Link href={"/setting"} className="mb-7 flex items-center text-lg">
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </Link>
      <Header bold big>
        권한 변경
        <div className="w-3"></div>
        <SubHeader gray big>
          피위임인을 선택해주세요.
        </SubHeader>
      </Header>
      <div className="mt-7 flex w-full flex-col items-center">
        <Header bold big>
          변경할 권한:
          <span className="ml-2 text-red-500">
            {userRoleCodes[state.toUpperCase() as User.Role]}
          </span>
        </Header>
        <div className="mb-6 flex h-14 w-full items-center justify-center">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full justify-between gap-4 pt-4 lg:w-3/4"
          >
            <input
              className="w-full rounded-3xl border border-black text-center"
              type="text"
              {...register("searchContent", { required: true, maxLength: 30 })}
              id="searchContent"
              placeholder="30자 이내로 입력해주세요."
            />
            <button
              className="w-36 rounded-3xl bg-red-500 text-white"
              type="submit"
            >
              검색
            </button>
          </form>
        </div>
        <Line />
        <div className="mt-3 w-full">
          <Header bold>검색 결과</Header>
          <div className="mt-3 flex flex-col">
            {data.map((element) => (
              <div
                className={`pb-1 pl-2 pt-1 text-lg ${
                  selectId === element.id
                    ? "rounded-lg bg-focus text-white"
                    : ""
                }`}
                key={element.userName}
                onClick={() => {
                  setSelectId(element.id);
                }}
              >
                {element.userName}({element.studentId})
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="fixed bottom-28 left-1/2 -translate-x-1/2 transform rounded-3xl bg-red-500 px-6 py-3 font-bold text-white lg:bottom-10">
        선택 완료
      </button>
    </div>
  );
};

export default RoleMandate;
