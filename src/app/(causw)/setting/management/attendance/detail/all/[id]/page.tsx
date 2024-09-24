"use client";

import { SettingService } from "@/shared";
import { Line, LoadingComponent, Header, SubHeader } from "@/entities";

const AttendanceDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { useGetAttendanceUser } = SettingService();
  const { data, isLoading } = useGetAttendanceUser(id);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <main className="flex h-full flex-col items-start justify-center gap-2">
      <div className="mb-3 flex w-full justify-center">
        <Header bold>
          {data?.userName}({data?.studentId}) 상세 보기
        </Header>
      </div>

      <SubHeader bold big>
        본 학기 상태
      </SubHeader>
      <SubHeader bold big>
        본 학기 기준 등록 완료 학기 차수
      </SubHeader>
      <div>
        <input
          type="number"
          className="w-12 border-b-2 bg-boardPageBackground"
          placeholder={data?.currentCompleteSemester + ""}
        ></input>
        차 학기
      </div>
      <SubHeader bold big>
        비고
      </SubHeader>
      <textarea
        className="mb-5 h-24 w-full rounded-md border-2 p-3"
        placeholder={data?.note ? data?.note : "특이사항을 입력해주세요"}
      ></textarea>
      <Line />
    </main>
  );
};

export default AttendanceDetail;
