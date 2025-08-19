'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { useGetAttendanceUser, useUpdateUserNote } from '@/fsd_entities/user';

import { ACADEMIC_STATUS_LABELS } from '@/fsd_shared/configs/constants/setting';

import { Header, LoadingComponent, SubHeader } from '@/fsd_shared';

const AttendanceDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading } = useGetAttendanceUser(id);

  const { mutate: updateUserNote } = useUpdateUserNote();

  const note = useRef('');

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <main className="flex h-full flex-col gap-2">
      <div className="relative mt-6 mb-3 flex w-full justify-center">
        <Link href=".." className="absolute left-0 text-lg">
          <span className="icon-[tabler--x] mr-6 text-3xl font-bold"></span>
        </Link>
        <Header bold>
          {data?.userName}
          {data?.studentId ? `(${data?.studentId})` : ''}
        </Header>
      </div>

      <SubHeader bold big>
        본 학기 상태
      </SubHeader>
      <div>
        {/* <input
          type="number"
          className="ml-1 w-12 border-b-2 bg-board-page-background"
          placeholder={data?.currentCompleteSemester + ""}
        ></input> */}
        <span>{data?.academicStatus && ACADEMIC_STATUS_LABELS[data.academicStatus]}</span>
      </div>

      <SubHeader bold big>
        본 학기 기준 등록 완료 학기 차수
      </SubHeader>
      <div>
        {/* <input
          type="number"
          className="ml-1 w-12 border-b-2 bg-board-page-background"
          placeholder={data?.currentCompleteSemester + ""}
        ></input> */}
        {data?.currentCompleteSemester ? data?.currentCompleteSemester + '차 학기' : '등록이 완료되지 않았습니다.'}
      </div>

      <SubHeader bold big>
        비고
      </SubHeader>
      <textarea
        onChange={(event) => {
          note.current = event.target.value;
        }}
        className="h-24 min-h-24 w-full rounded-md border-2 p-3 placeholder:text-stone-500"
        placeholder={data?.note ? data?.note : '특이사항을 입력해주세요'}
      ></textarea>

      <div className="mt-2 mb-2 h-1/3 w-full overflow-y-auto rounded-md border-2 bg-white lg:h-1/2">
        {data?.userAcademicRecordApplicationResponseDtoList.map((element) => (
          <div key={element.changeDate} className="flex h-24 w-full items-center justify-evenly border-b-2 font-bold">
            <span className="text-center">{element.changeDate.split('T')[0]}</span>
            <span className="w-1/5 text-center">{ACADEMIC_STATUS_LABELS[element.targetAcademicStatus] ?? '-'}</span>
            <div className="flex w-2/5 justify-center gap-2 overflow-x-auto">
              {element.attachedImageUrlList.map((element) => (
                <div key={element} className="h-20 min-w-20 overflow-hidden">
                  <div className="h-20 w-20 bg-contain bg-center" style={{ backgroundImage: `url(${element})` }} />
                </div>
              ))}
            </div>
            <span className="h-20 w-1/4 overflow-y-auto text-center">{element.userNote}</span>
          </div>
        ))}
      </div>

      <div
        onClick={() => {
          updateUserNote({ id, note: note.current });
          //window.location.href = "/setting/management/attendance/all";
        }}
        className="bg-focus mb-3 flex h-12 items-center justify-center rounded-xl text-lg text-white"
      >
        저장하기
      </div>
    </main>
  );
};

export default AttendanceDetail;
