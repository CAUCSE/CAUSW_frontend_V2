"use client";

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CustomCheckBox, Question } from "@/entities";

const SemesterOptions = [
  { colSize: 1, name: "1-1 수료", value: "FIRST_SEMESTER" },
  { colSize: 1, name: "1-2 수료", value: "SECOND_SEMESTER" },
  { colSize: 1, name: "2-1 수료", value: "THIRD_SEMESTER" },
  { colSize: 1, name: "2-2 수료", value: "FOURTH_SEMESTER" },
  { colSize: 1, name: "3-1 수료", value: "FIFTH_SEMESTER" },
  { colSize: 1, name: "3-2 수료", value: "SIXTH_SEMESTER" },
  { colSize: 1, name: "4-1 수료", value: "SEVENTH_SEMESTER" },
  { colSize: 1, name: "4-2 수료", value: "EIGHTH_SEMESTER" },
  { colSize: 1, name: "5-1 이상", value: "ABOVE_NINTH_SEMESTER" },
];

const CircleApplicationEdit = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const router = useRouter();
  const [isViewPointLg, setIsViewPointLg] = useState(false);

  const methods = useForm<Circle.Application>({
    defaultValues: {
      title: "",
      questionCreateRequestDtoList: [
        {
          questionType: "OBJECTIVE",
          questionText: "",
          isMultiple: false,
          optionCreateRequestDtoList: [
            {
              optionText: "",
            },
          ],
        },
      ],
      isAllowedEnrolled: false,
      enrolledRegisteredSemesterList: [],
      isNeedCouncilFeePaid: false,
      isAllowedLeaveOfAbsence: false,
      leaveOfAbsenceRegisteredSemesterList: [],
      isAllowedGraduation: false,

      //이하 확인 필요
      allowAllEnrolledRegisteredSemester: false,
      allowAllLeaveOfAbsenceRegisteredSemester: false,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionCreateRequestDtoList",
  });

  const onSubmit = async (data) => {
    if (
      data.enrolledRegisteredSemesterList.length === 0 &&
      data.leaveOfAbsenceRegisteredSemesterList.length === 0 &&
      !data.isAllowedEnrolled &&
      !data.isAllowedGraduation &&
      !data.isNeedCouncilFeePaid &&
      !data.isAllowedLeaveOfAbsence
    ) {
      setError("isAllowedLeaveOfAbsence", {
        type: "manual",
        message: "신청 가능 대상을 하나 이상 지정해주세요",
      });
      return;
    }

    if (
      data.isAllowedEnrolled &&
      data.enrolledRegisteredSemesterList.length === 0 &&
      !data.allowAllEnrolledRegisteredSemester
    ) {
      setError("isAllowedEnrolled", {
        type: "manual",
        message: "신청 가능 학년을 하나 이상 지정해주세요 ",
      });
      return;
    }

    if (
      data.isAllowedLeaveOfAbsence &&
      data.leaveOfAbsenceRegisteredSemesterList.length === 0 &&
      !data.allowAllLeaveOfAbsenceRegisteredSemester
    ) {
      setError("isAllowedLeaveOfAbsence", {
        type: "manual",
        message: "신청 가능 학년을 하나 이상 지정해주세요",
      });
    }
    const postCreateWithFormRequestDto = { ...data };
    if (
      postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllEnrolledRegisteredSemester
    ) {
      postCreateWithFormRequestDto.enrolledRegisteredSemesterList = [
        "FIRST_SEMESTER",
        "SECOND_SEMESTER",
        "THIRD_SEMESTER",
        "FOURTH_SEMESTER",
        "FIFTH_SEMESTER",
        "SIXTH_SEMESTER",
        "SEVENTH_SEMESTER",
        "EIGHTH_SEMESTER",
        "ABOVE_NINTH_SEMESTER",
      ];
      delete postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllEnrolledRegisteredSemester;
    }

    if (
      postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllLeaveOfAbsenceRegisteredSemester
    ) {
      postCreateWithFormRequestDto.leaveOfAbsenceRegisteredSemesterList = [
        "FIRST_SEMESTER",
        "SECOND_SEMESTER",
        "THIRD_SEMESTER",
        "FOURTH_SEMESTER",
        "FIFTH_SEMESTER",
        "SIXTH_SEMESTER",
        "SEVENTH_SEMESTER",
        "EIGHTH_SEMESTER",
        "ABOVE_NINTH_SEMESTER",
      ];
      delete postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllLeaveOfAbsenceRegisteredSemester;
    }

    postCreateWithFormRequestDto.questionCreateRequestDtoList.forEach(
      (question: Post.QuestionCreateRequestDto) => {
        if (question.questionType === "SUBJECTIVE") {
          question.optionCreateRequestDtoList.length = 0;
          question.isMultiple = false;
        }
      },
    );

    try {
      console.log(data);
      router.back();
    } catch (error) {
      console.log("신청서 수정 실패 : ", error);
    }
  };

  const addSurveyForm = () => {
    append({
      questionType: "OBJECTIVE",
      questionText: "",
      isMultiple: false,
      optionCreateRequestDtoList: [{ optionText: "" }],
    });
  };

  return (
    <>
      <div
        onClick={() => router.back()}
        className="absolute left-10 top-10 flex items-center text-lg md:left-24"
      >
        <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
        이전
      </div>
      <FormProvider {...methods}>
        <div className="mt-20 lg:ml-[20%]">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-4 lg:items-start"
            >
              <div className="flex h-full w-full flex-col items-center gap-5 lg:items-start">
                <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[490px]">
                  <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                    <CustomCheckBox
                      colSize={1}
                      name="재학생"
                      register={register("isAllowedEnrolled")}
                    />
                    <CustomCheckBox
                      colSize={isViewPointLg ? 4 : 1}
                      name="학생회비 납부자"
                      register={register("isNeedCouncilFeePaid")}
                    />
                    <CustomCheckBox
                      colSize={1}
                      name="상관없음"
                      register={register("allowAllEnrolledRegisteredSemester")}
                    />
                    {SemesterOptions.map((grade, idx) => (
                      <CustomCheckBox
                        colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                        value={grade.value}
                        name={grade.name}
                        key={idx}
                        register={register("enrolledRegisteredSemesterList")}
                      />
                    ))}
                  </div>
                </div>
                {errors.isAllowedEnrolled && (
                  <p className="text-red-500">
                    {errors.isAllowedEnrolled.message}
                  </p>
                )}
                <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
                <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[490px]">
                  <div className="grid grid-cols-2 gap-x-5 gap-y-1 lg:grid-cols-5 lg:gap-2">
                    <CustomCheckBox
                      colSize={1}
                      name="휴학생"
                      register={register("isAllowedLeaveOfAbsence")}
                    />
                    <CustomCheckBox
                      colSize={isViewPointLg ? 4 : 1}
                      name="졸업생"
                      register={register("isAllowedGraduation")}
                    />
                    <CustomCheckBox
                      colSize={1}
                      name="상관없음"
                      register={register(
                        "allowAllLeaveOfAbsenceRegisteredSemester",
                      )}
                    />
                    {SemesterOptions.map((grade, idx) => (
                      <CustomCheckBox
                        colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                        value={grade.value}
                        name={grade.name}
                        key={idx}
                        register={register(
                          "leaveOfAbsenceRegisteredSemesterList",
                        )}
                      />
                    ))}
                  </div>
                </div>
                {errors.isAllowedLeaveOfAbsence && (
                  <p className="text-red-500">
                    {errors.isAllowedLeaveOfAbsence.message}
                  </p>
                )}
                <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
                <div className="flex w-3/4 min-w-[260px] flex-col bg-white lg:min-w-[500px]"></div>
              </div>
              {fields.map((field, idx) => {
                return (
                  <Question
                    key={field.id}
                    index={idx}
                    removeQuestion={() => remove(idx)}
                  />
                );
              })}
              <button
                type="button"
                onClick={addSurveyForm}
                className="flex h-12 w-3/4 min-w-[260px] items-center justify-center rounded-xl bg-[#D9D9D9] text-[46px] font-bold lg:min-w-[490px]"
              >
                +
              </button>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="flex h-10 w-3/4 min-w-[260px] items-center justify-center rounded-xl bg-red-500 text-lg text-white md:h-16 lg:text-xl"
              >
                신청서 수정 완료
              </button>
            </form>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default CircleApplicationEdit;
