"use client";

import { ChangeEventHandler, useEffect, useState } from "react";

import { IconButton, PreviousButton } from "@/shared";
import { useForm } from "react-hook-form";

interface ICustomCheckBox {
  colSize: number;
  targetValue: any;
  callback: ChangeEventHandler<HTMLInputElement>;
  value: any;
}

const colSpan: { [key in 1 | 2 | 3 | 4 | 5]: string } = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
};

const CustomCheckBox: React.FC<ICustomCheckBox> = ({
  colSize,
  targetValue,
  callback,
  value,
}) => (
  <div className={`${colSpan[colSize]} flex items-center gap-2`}>
    <input
      type="checkbox"
      value={value}
      checked={targetValue.includes(value)}
      onChange={callback}
      className="h-4 w-4 cursor-pointer appearance-none rounded-sm border-2 border-solid border-black bg-[length:100%_100%] bg-center bg-no-repeat checked:bg-[url('/icons/checked_icon.png')]"
    />
    <p className="text-sm">{value}</p>
  </div>
);

const ApplyCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //TODO 신청서 생성 완료 -> api 연동
    const formData = {
      ...data,
      status: selectedStatus,
      grade: selectedGrade,
    };
    console.log(formData);
  };

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string[]>([]);

  const [surveyForms, setSurveysForms] = useState([]);

  const addSurveyForm = () => {
    setSurveysForms([
      ...surveyForms,
      { id: Date.now(), type: "주관식", question: "", options: [] },
    ]);
  };

  const removeSurveyForm = (id) => {
    setSurveysForms(surveyForms.filter((form) => form.id !== id));
  };

  const handleSurveyTypeChange = (id, newType) => {
    setSurveysForms(
      surveyForms.map((form) =>
        form.id === id
          ? {
              ...form,
              type: newType,
              options: newType === "객관식" ? [""] : [],
            }
          : form,
      ),
    );
  };

  const addOption = (id) => {
    setSurveysForms(
      surveyForms.map((form) =>
        form.id === id ? { ...form, options: [...form.options, ""] } : form,
      ),
    );
  };

  const removeOption = (id, optionIndex) => {
    setSurveysForms(
      surveyForms.map((form) =>
        form.id === id
          ? {
              ...form,
              options: form.options.filter((_, idx) => idx !== optionIndex),
            }
          : form,
      ),
    );
  };

  const handleStatusChange = (status: string) => {
    if (status === "상관없음" || selectedStatus.includes("상관없음")) {
      setSelectedStatus([status]);
    } else {
      setSelectedStatus((prevStatus) =>
        prevStatus.includes(status)
          ? prevStatus.filter((element) => element !== status)
          : [...prevStatus, status],
      );
    }
  };

  const handleGradeChange = (grade: string) => {
    if (grade === "상관없음" || selectedGrade.includes("상관없음")) {
      setSelectedGrade([grade]);
    } else {
      setSelectedGrade((prevGrade) =>
        prevGrade.includes(grade)
          ? prevGrade.filter((element) => element !== grade)
          : [...prevGrade, grade],
      );
    }
  };

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
  return (
    <div className="h-full w-full">
      <div className="fixed h-14 w-full bg-[#F8F8F8] lg:w-[calc(100%-29rem)]">
        <PreviousButton />
      </div>
      <div className="absolute top-[80px] h-[calc(100%-3.5rem)] w-full overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-8 px-5 lg:px-8"
        >
          <div className="flex w-56 flex-col items-center border-b border-black">
            <input
              type="text"
              id="applyName"
              {...register("applyName", {
                required: true,
              })}
              placeholder="신청서 제목 텍스트 필드"
              className="h-10 bg-[#F8F8F8] text-xl placeholder:text-center"
            />
            {errors.applyName && (
              <p className="text-sm text-red-500">신청서 제목을 입력해주세요</p>
            )}
          </div>
          <div className="flex h-full w-full flex-col gap-5">
            <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[500px]">
              <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("재학생")}
                  value="재학생"
                />
                <CustomCheckBox
                  colSize={isViewPointLg ? 4 : 1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("학생회비 납부자")}
                  value="학생회비 납부자"
                />
                <CustomCheckBox
                  colSize={isViewPointLg ? 1 : 2}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("상관없음")}
                  value="상관없음"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("1-1 재학중")}
                  value="1-1 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("1-2 재학중")}
                  value="1-2 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("2-1 재학중")}
                  value="2-1 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("2-2 재학중")}
                  value="2-2 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("3-1 재학중")}
                  value="3-1 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("3-2 재학중")}
                  value="3-2 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("4-1 재학중")}
                  value="4-1 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("4-2 재학중")}
                  value="4-2 재학중"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedStatus}
                  callback={() => handleStatusChange("5-1 이상")}
                  value="5-1 이상"
                />
              </div>
            </div>
            <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[500px]" />
            <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[500px]">
              <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                <CustomCheckBox
                  colSize={isViewPointLg ? 1 : 1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("휴학생")}
                  value="휴학생"
                />
                <CustomCheckBox
                  colSize={isViewPointLg ? 4 : 1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("졸업생")}
                  value="졸업생"
                />
                <CustomCheckBox
                  colSize={isViewPointLg ? 1 : 2}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("상관없음")}
                  value="상관없음"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("1-1 수료")}
                  value="1-1 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("1-2 수료")}
                  value="1-2 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("2-1 수료")}
                  value="2-1 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("2-2 수료")}
                  value="2-2 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("3-1 수료")}
                  value="3-1 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("3-2 수료")}
                  value="3-2 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("4-1 수료")}
                  value="4-1 수료"
                />
                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("4-2 수료")}
                  value="4-2 수료"
                />

                <CustomCheckBox
                  colSize={1}
                  targetValue={selectedGrade}
                  callback={() => handleGradeChange("5-1 재학중")}
                  value="5-1 재학중"
                />
              </div>
            </div>
            <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[500px]" />
            <div className="flex w-3/4 min-w-[260px] flex-col bg-white lg:min-w-[500px]"></div>
          </div>
          {surveyForms.map((form, idx) => (
            <div
              key={form.id}
              className="flex w-3/4 min-w-[260px] flex-col rounded-lg border border-black p-4 lg:min-w-[500px]"
            >
              <div className="flex gap-4">
                <label className="flex items-center p-2 text-xl">
                  <input
                    type="radio"
                    name={`type-${form.id}`}
                    checked={form.type === "객관식"}
                    onChange={() => handleSurveyTypeChange(form.id, "객관식")}
                    className="peer hidden"
                  />
                  <span className="m-4 inline-block h-4 w-4 cursor-pointer rounded-full border-2 border-black peer-checked:bg-black peer-checked:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,1)]"></span>
                  객관식
                </label>
                <label className="flex items-center p-2 text-xl">
                  <input
                    type="radio"
                    name={`type-${form.id}`}
                    checked={form.type === "주관식"}
                    onChange={() => handleSurveyTypeChange(form.id, "주관식")}
                    className="peer hidden cursor-pointer"
                  />
                  <span className="m-4 inline-block h-4 w-4 cursor-pointer rounded-full border-2 border-black peer-checked:bg-black peer-checked:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,1)]"></span>
                  주관식
                </label>
              </div>
              <IconButton
                iconName={"remove"}
                callback={() => console.log("hello")}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSurveyForm}
            className="flex h-12 w-3/4 min-w-[260px] items-center justify-center bg-[#D9D9D9] text-[46px] font-bold lg:min-w-[500px]"
          >
            +
          </button>
          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyCreatePage;
