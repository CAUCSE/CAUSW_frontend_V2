'use client';

import { useFormContext } from 'react-hook-form';

import {
  GraduationToggle,
  LeaveOfAbsenceToggle,
  SemesterMetaData,
  SemesterToggleForLeaveOfAbsence,
} from '@/fsd_entities/form';
import { PostSchema } from '@/fsd_entities/post';

export const LeaveOfAbsenceAndGraduationSection = () => {
  const { formState } = useFormContext<PostSchema>();
  const isLeaveOfAbsenceError = formState.errors.formCreateRequestDto?.leaveOfAbsenceRegisteredSemesterList;

  return (
    <>
      <section className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[490px]">
        <div className="grid grid-cols-2 gap-x-5 gap-y-1 lg:grid-cols-5 lg:gap-2">
          <LeaveOfAbsenceToggle />
          <GraduationToggle />
          {Object.values(SemesterMetaData).map(semester => (
            <SemesterToggleForLeaveOfAbsence key={semester.value} {...semester} className="col-span-1" />
          ))}
        </div>
      </section>
      {isLeaveOfAbsenceError && <p className="text-sm text-red-500">{isLeaveOfAbsenceError.message}</p>}
    </>
  );
};
