// TODO : API 연결, 납부여부?

import Image from "next/image";
import {
  InfoTableEntity,
  titleMapping,
} from "../entities/home/setting/management/managementDetailEntities";

const data: InfoTableEntity = {
  email: "abc@abc.com",
  major: "소프트웨어학부",
  name: "홍길동",
  isPayed: "O",
  studentId: "20201234",
  leftPayedSemester: `${8}차 학기`,
  admissionYear: "2020",
  nickname: "hong",
  graduateYearMonth: `${2026}/${2}`,
  academicStatus: "재학",
  enrolledSemester: `${5}차 학기`,
  phoneNumber: "010-1234-5678",
  requestedAt: "2024.10.02",
  evidentImg: "/images/puang-proud.png",
};

const TableUnit = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="flex flex-col text-[20px]">
      <p>{title}</p>
      {title === "학부 재적/졸업 증빙 자료" ? (
        <Image src={data} alt={title} width={200} height={200} />
      ) : (
        <p className="text-[rgba(180,177,177,1)]">{data}</p>
      )}
    </div>
  );
};

export function ManagementDetailInfoTable() {
  return (
    <div className="grid h-full w-full grid-cols-2 justify-around gap-y-[27px]">
      {Object.keys(data).map((k) => {
        const key = k as keyof typeof data;
        return (
          <TableUnit key={key} title={titleMapping[key]} data={data[key]} />
        );
      })}
    </div>
  );
}
