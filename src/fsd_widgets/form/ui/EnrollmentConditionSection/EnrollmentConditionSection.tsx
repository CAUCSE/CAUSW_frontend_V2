'use client';

import { useFormContext } from 'react-hook-form';

import { CouncilFeeToggle, EnrolledToggle, SemesterMetaData, SemesterToggle } from '@/fsd_entities/form';
import { PostSchema } from '@/fsd_entities/post';

export const EnrollmentConditionSection = () => {
  const { formState } = useFormContext<PostSchema>();
  const isEnrolledError = formState.errors.formCreateRequestDto?.enrolledRegisteredSemesterList;

  return (
    <>
      <section className="flex w-3/4 min-w-[260px] flex-col items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[490px]">
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
          <EnrolledToggle />
          <CouncilFeeToggle />
          {Object.values(SemesterMetaData).map((semester) => (
            <SemesterToggle key={semester.value} {...semester} className="col-span-1" />
          ))}
        </div>
      </section>
      {isEnrolledError && <p className="text-sm text-red-500">{isEnrolledError.message}</p>}
    </>
  );
};
