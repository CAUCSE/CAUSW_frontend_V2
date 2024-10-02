// TODO : API, typo 연결

const data = {
  email: "123@naver.com",
  department: "소프트웨어학부",
  name: "홍길동",
  isPayed: "O",
  studentId: "20201234",
  leftPayedSemester: "3차 학기",
  admissionYear: "2020",
  nickname: "hong",
  graduateYearMonth: "2026/02",
  status: "재학",
  enrolledSemester: "5차 학기",
  contact: "010-1234-5678",
  requestedAt: "2024.03.01",
  evidentImg: "/images/puang-proud.png",
};

const title: Record<keyof typeof data, string> = {
  email: "아이디(이메일)",
  department: "학부",
  name: "이름",
  isPayed: "학생회비 납부 여부",
  studentId: "학번",
  leftPayedSemester: "잔여 학생회비 적용 학기",
  admissionYear: "입학년도",
  nickname: "닉네임",
  graduateYearMonth: "졸업 시기",
  status: "학적 상태",
  enrolledSemester: "등록 완료 학기",
  contact: "연락처",
  requestedAt: "가입 요청 일시",
  evidentImg: "학부 재적/졸업 증빙 자료",
};

const TableUnit = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="flex flex-col text-[20px]">
      <p>{title}</p>
      <p className="text-[rgba(180,177,177,1)]">{data}</p>
    </div>
  );
};

export function ManagementDetailInfoTable() {
  return (
    <div className="grid h-full w-full grid-cols-2 justify-around gap-y-[27px]">
      {Object.keys(data).map((k) => {
        const key = k as keyof typeof data;
        return <TableUnit key={key} title={title[key]} data={data[key]} />;
      })}
    </div>
  );
}
