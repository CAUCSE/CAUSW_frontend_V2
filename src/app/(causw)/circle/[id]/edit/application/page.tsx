"use client";

import { CircleApplyQuestion, CustomCheckBox, Question } from "@/entities";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

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
  const [isViewPointLg, setIsViewPointLg] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsViewPointLg(window.innerWidth >= 1024 ? true : false);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

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

      //상관없음 여부 판단하는 변수 -> onSubmit할 때 delete함
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
    const circleApplicationDto = { ...data };
    if (circleApplicationDto.allowAllEnrolledRegisteredSemester) {
      circleApplicationDto.enrolledRegisteredSemesterList = [
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
      delete circleApplicationDto.allowAllEnrolledRegisteredSemester;
    }

    if (circleApplicationDto.allowAllLeaveOfAbsenceRegisteredSemester) {
      circleApplicationDto.leaveOfAbsenceRegisteredSemesterList = [
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
      delete circleApplicationDto.allowAllLeaveOfAbsenceRegisteredSemester;
    }

    circleApplicationDto.questionCreateRequestDtoList.forEach(
      (question: Post.QuestionCreateRequestDto) => {
        if (question.questionType === "SUBJECTIVE") {
          question.optionCreateRequestDtoList.length = 0;
          question.isMultiple = false;
        }
      },
    );

    try {
      console.log(data);
      console.log(JSON.stringify(circleApplicationDto, null, 2));
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

  const isAllowedEnrolled = watch("isAllowedEnrolled");
  const isNeedCouncilFeePaid = watch("isNeedCouncilFeePaid");
  const enrolledRegisteredSemesterList = watch(
    "enrolledRegisteredSemesterList",
  );
  const allowAllEnrolledRegisteredSemester = watch(
    "allowAllEnrolledRegisteredSemester",
  );
  const leaveOfAbsenceRegisteredSemesterList = watch(
    "leaveOfAbsenceRegisteredSemesterList",
  );
  const isAllowedLeaveOfAbsence = watch("isAllowedLeaveOfAbsence");
  const allowAllLeaveOfAbsenceRegisteredSemester = watch(
    "allowAllLeaveOfAbsenceRegisteredSemester",
  );

  const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  const prevIsAllowedEnrolled = usePrevious(isAllowedEnrolled);
  const prevIsAllowedLeaveOfAbsence = usePrevious(isAllowedLeaveOfAbsence);

  /**
   * 재학생 체크가 풀린 경우 학생회비 및 수료 상태 체크 해제
   */
  useEffect(() => {
    if (!isAllowedEnrolled) {
      setValue("isNeedCouncilFeePaid", false);
      if (enrolledRegisteredSemesterList.length > 0) {
        setValue("enrolledRegisteredSemesterList", []);
      }
      if (allowAllEnrolledRegisteredSemester) {
        setValue("allowAllEnrolledRegisteredSemester", false);
      }
    }
  }, [isAllowedEnrolled, setValue]);

  //학생회비 체크 시 -> 재학생 자동으로 체크
  useEffect(() => {
    if (isNeedCouncilFeePaid) {
      setValue("isAllowedEnrolled", true);
    }
  }, [isNeedCouncilFeePaid, setValue]);

  useEffect(() => {
    // 상관없음 이외의 수료 상태 체크 시 -> 상관없음 체크 해제
    if (enrolledRegisteredSemesterList.length > 0) {
      setValue("allowAllEnrolledRegisteredSemester", false);
      if (!isAllowedEnrolled && !prevIsAllowedEnrolled) {
        setValue("isAllowedEnrolled", true);
      }
    }

    // 상관없음 이외의 수료 상태 9개를 전부 체크 시 전부 체크 해제 후 상관없음 체크
    if (enrolledRegisteredSemesterList.length === 9) {
      setValue("allowAllEnrolledRegisteredSemester", true);
      setValue("enrolledRegisteredSemesterList", []);
    }
  }, [enrolledRegisteredSemesterList, setValue]);

  useEffect(() => {
    //재학생 수료 상태 상관없음 체크 시 기존에 체크했던 상태들 전부 해제
    if (allowAllEnrolledRegisteredSemester) {
      setValue("enrolledRegisteredSemesterList", []);
      setValue("allowAllEnrolledRegisteredSemester", true);

      //만약 재학생에 체크가 안되었으면 재학생도 체크
      if (!isAllowedEnrolled && !prevIsAllowedEnrolled) {
        setValue("isAllowedEnrolled", true);
      }
    }
  }, [allowAllEnrolledRegisteredSemester, setValue]);

  useEffect(() => {
    //휴학생 체크 해제 시 -> 휴학생 관련 수료 상태 전부 체크 해제
    if (!isAllowedLeaveOfAbsence) {
      if (leaveOfAbsenceRegisteredSemesterList.length > 0) {
        setValue("leaveOfAbsenceRegisteredSemesterList", []);
      }
      if (allowAllLeaveOfAbsenceRegisteredSemester) {
        setValue("allowAllLeaveOfAbsenceRegisteredSemester", false);
      }
    }
  }, [isAllowedLeaveOfAbsence, setValue]);

  useEffect(() => {
    //휴학생 수료 상태 체크 시 -> 상관없음 체크 해제
    if (leaveOfAbsenceRegisteredSemesterList.length > 0) {
      setValue("allowAllLeaveOfAbsenceRegisteredSemester", false);
      if (!isAllowedLeaveOfAbsence && !prevIsAllowedLeaveOfAbsence) {
        setValue("isAllowedLeaveOfAbsence", true);
      }
    }

    //휴학생 수료 상태를 전부(9개) 체크 시 상관없음 체크
    if (leaveOfAbsenceRegisteredSemesterList.length === 9) {
      setValue("allowAllLeaveOfAbsenceRegisteredSemester", true);
      setValue("leaveOfAbsenceRegisteredSemesterList", []);
    }
  }, [leaveOfAbsenceRegisteredSemesterList, setValue]);

  useEffect(() => {
    //휴학생 수료 상태 상관없음 체크 시 기존 수료 상태들 체크 해제
    if (allowAllLeaveOfAbsenceRegisteredSemester) {
      setValue("leaveOfAbsenceRegisteredSemesterList", []);
      setValue("allowAllLeaveOfAbsenceRegisteredSemester", true);
      //휴학생이 체크되어 있지 않다면 자동으로 체크
      if (!isAllowedLeaveOfAbsence && !prevIsAllowedLeaveOfAbsence) {
        setValue("isAllowedLeaveOfAbsence", true);
      }
    }
  }, [allowAllLeaveOfAbsenceRegisteredSemester, setValue]);

  useEffect(() => {
    if (fields.length === 0) {
      addSurveyForm();
    }
  }, [fields, addSurveyForm]);

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
                  <CircleApplyQuestion
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
