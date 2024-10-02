"use client";

import { CustomCheckBox, Question } from "@/entities";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { PreviousButton } from "@/shared";

const ApplyCreatePage = () => {
  const methods = useForm<Form.FormDataDto>({
    defaultValues: {
      title: "",
      allowedAcademicStatus: [],
      allowedGrades: [],
      questions: [
        {
          questionNumber: 1,
          questionType: "OBJECTIVE",
          questionText: "",
          isMultiple: false,
          options: [{ optionNumber: 1, optionText: "" }],
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions" as never,
  });

  const onSubmit = (data) => {
    //TODO 신청서 생성 완료 -> api 연동
    if (selectedStatus.length === 0) {
      setError("allowedAcademicStatus", {
        type: "manual",
        message: "하나 이상의 항목을 선택해야 합니다.",
      });
      return;
    }

    if (selectedGrade.length === 0) {
      setError("allowedGrades", {
        type: "manual",
        message: "하나 이상의 항목을 선택해야 합니다.",
      });
      return;
    }

    console.log(data);
  };

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<(string | number)[]>([]);

  const addSurveyForm = () => {
    const newFormNumber = fields.length + 1;
    append({
      questionNumber: newFormNumber,
      questionType: "OBJECTIVE",
      questionText: "",
      isMultiple: false,
      options: [{ optionNumber: 1, optionText: "" }],
    });
  };

  const addOption = (index) => {
    const currentQuestions = getValues("questions");
    const currentOptions = currentQuestions[index].options;
    const newOptionNumber = currentOptions.length + 1;

    const newFields = getValues("questions");
    newFields[index].options.push({
      optionNumber: newOptionNumber,
      optionText: "",
    });
    setValue("questions", newFields);
  };

  const removeOption = (index, optionIndex) => {
    const currentQuestions = getValues("questions");
    const currentOptions = currentQuestions[index].options;
    currentOptions.splice(optionIndex, 1);
    const updatedField = getValues("questions");
    updatedField[index].options = currentOptions;
    setValue("questions", updatedField);
  };

  const handleStatusChange = (status: string) => {
    if (status === "UNDEFINED") {
      if (selectedStatus.includes("UNDEFINED")) {
        setSelectedStatus([]);
        return;
      }
      setSelectedStatus([status]);
      return;
    } else if (selectedStatus.includes("UNDEFINED")) {
      setSelectedStatus([status]);
      return;
    }
    setSelectedStatus((prevStatus) =>
      prevStatus.includes(status)
        ? prevStatus.filter((element) => element !== status)
        : [...prevStatus, status],
    );
  };

  const handleGradeChange = (grade: string | number) => {
    if (grade === "UNDEFINED") {
      if (selectedGrade.includes("UNDEFINED")) {
        setSelectedGrade([]);
        return;
      }
      setSelectedGrade([grade]);
      return;
    } else if (selectedGrade.includes("UNDEFINED")) {
      setSelectedGrade([grade]);
      return;
    }
    setSelectedGrade((prevGrade) =>
      prevGrade.includes(grade)
        ? prevGrade.filter((element) => element !== grade)
        : [...prevGrade, grade],
    );
  };

  useEffect(() => {
    setValue("allowedAcademicStatus", selectedStatus as never);
    if (selectedStatus.length > 0) {
      clearErrors("allowedAcademicStatus");
    }
  }, [selectedStatus]);

  useEffect(() => {
    setValue("allowedGrades", selectedGrade as never);
    if (selectedGrade.length > 0) {
      clearErrors("allowedGrades");
    }
  }, [selectedGrade]);

  const [isViewPointLg, setIsViewPointLg] = useState(false);
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

  const statusOptions = [
    { colSize: 1, name: "재학생", value: "ENROLLED" },
    {
      colSize: isViewPointLg ? 2 : 1,
      name: "학생회비 납부자",
      value: "MEMBERSHIP_FEE_PAID",
    },
    { colSize: 1, name: "휴학생", value: "LEAVE_OF_ABSENCE" },
    { colSize: 1, name: "졸업생", value: "GRADUATED" },
    { colSize: isViewPointLg ? 1 : 2, name: "상관없음", value: "UNDEFINED" },
  ];

  const gradeOptions = [
    { colSize: isViewPointLg ? 1 : 2, name: "상관없음", value: "UNDEFINED" },
    { colSize: 1, name: "1-1 수료", value: 1 },
    { colSize: 1, name: "1-2 수료", value: "2" },
    { colSize: 1, name: "2-1 수료", value: "3" },
    { colSize: 1, name: "2-2 수료", value: "4" },
    { colSize: 1, name: "3-1 수료", value: "5" },
    { colSize: 1, name: "3-2 수료", value: "6" },
    { colSize: 1, name: "4-1 수료", value: "7" },
    { colSize: 1, name: "4-2 수료", value: "8" },
    { colSize: 1, name: "5-1 수료", value: "9" },
  ];

  return (
    <FormProvider {...methods}>
      <div className="h-full w-full">
        <div className="h-16 w-full bg-[#F8F8F8]">
          <PreviousButton />
        </div>
        <div className="absolute top-16 h-[calc(100%-5rem)] w-full overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-8 lg:items-start lg:px-8"
          >
            <div className="flex w-56 flex-col items-center border-b border-black">
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: true,
                })}
                placeholder="신청서 제목 텍스트 필드"
                className="h-10 bg-[#F8F8F8] text-xl placeholder:text-center"
              />
              {errors.title && (
                <p className="text-sm text-red-500">
                  신청서 제목을 입력해주세요
                </p>
              )}
            </div>
            <div className="flex h-full w-full flex-col items-center gap-5 lg:items-start">
              <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[490px]">
                <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                  {statusOptions.map((status, idx) => (
                    <CustomCheckBox
                      colSize={status.colSize as 1 | 2 | 3 | 4 | 5}
                      targetValue={selectedStatus}
                      callback={() => handleStatusChange(status.value)}
                      value={status.value}
                      name={status.name}
                      key={idx}
                    />
                  ))}
                </div>
              </div>
              {errors.allowedAcademicStatus && (
                <p className="text-red-500">
                  {errors.allowedAcademicStatus.message}
                </p>
              )}
              <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
              <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[490px]">
                <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                  {gradeOptions.map((grade, idx) => (
                    <CustomCheckBox
                      colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                      targetValue={selectedGrade}
                      callback={() => handleGradeChange(grade.value)}
                      value={grade.value}
                      name={grade.name}
                      key={idx}
                    />
                  ))}
                </div>
              </div>
              {errors.allowedGrades && (
                <p className="text-red-500">{errors.allowedGrades.message}</p>
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
            <button>완료</button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default ApplyCreatePage;
