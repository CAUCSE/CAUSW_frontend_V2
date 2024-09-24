"use client";

import { SettingService } from "@/shared";
import { Line, LoadingComponent, Header, SubHeader } from "@/entities";

const AttendanceDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { useGetAttendanceUser } = SettingService();
  const { data, isLoading } = useGetAttendanceUser(id);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const test = [
    {
      targetAcademicStatus: "가입/승인/n차 학기 재학 등록/휴학 전환/졸업 전환",
      userNote:
        "유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항유저 작성 특이사항",
      attachedImageUrlList: [
        "https://prototyne.s3.ap-northeast-2.amazonaws.com/test/f38213c9-3164-4e23-b6a0-2402ea4f96c9.jpg",
        "https://prototyne.s3.ap-northeast-2.amazonaws.com/test/f38213c9-3164-4e23-b6a0-2402ea4f96c9.jpg",
        "https://prototyne.s3.ap-northeast-2.amazonaws.com/test/f38213c9-3164-4e23-b6a0-2402ea4f96c9.jpg",
      ],
      changeDate: "2024-09-24T03:30:04.768Z",
    },
  ];

  return (
    <main className="flex h-full flex-col gap-2">
      <div className="mb-3 mt-6 flex w-full justify-center">
        <Header bold>
          {data?.userName}({data?.studentId}) 상세 보기
        </Header>
      </div>

      <SubHeader bold big>
        본 학기 상태
      </SubHeader>
      <div>
        <input
          type="number"
          className="ml-1 w-12 border-b-2 bg-boardPageBackground"
          placeholder={data?.currentCompleteSemester + ""}
        ></input>
        차 학기
      </div>

      <SubHeader bold big>
        본 학기 기준 등록 완료 학기 차수
      </SubHeader>
      <div>
        <input
          type="number"
          className="ml-1 w-12 border-b-2 bg-boardPageBackground"
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

      {data?.userAcademicRecordApplicationResponseDtoList.map((element) => (
        <div
          key={element.changeDate}
          className="flex h-24 w-full items-center justify-evenly border-b-2 font-bold"
        >
          <span className="text-center">
            {element.changeDate.split("T")[0]}
          </span>
          <span className="w-1/5 text-center">
            {element.targetAcademicStatus}
          </span>
          <div className="flex w-2/5 justify-center gap-2 overflow-x-auto">
            {element.attachedImageUrlList.map((element) => (
              <div key={element} className="h-20 min-w-20 overflow-hidden">
                <div
                  className="h-20 w-20 bg-contain bg-cover bg-center"
                  style={{ backgroundImage: `url(${element})` }}
                />
              </div>
            ))}
          </div>
          <span className="h-20 w-1/4 overflow-y-auto text-center">
            {element.userNote}
          </span>
        </div>
      ))}
    </main>
  );
};

export default AttendanceDetail;
