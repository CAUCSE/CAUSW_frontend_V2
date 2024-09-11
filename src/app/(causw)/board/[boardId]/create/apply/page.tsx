"use client";

import { ChangeEventHandler, useEffect, useState } from "react";

import Image from "next/image";
import { PreviousButton } from "@/shared";
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
      className="h-4 w-4 appearance-none rounded-sm border-2 border-solid border-black bg-[length:100%_100%] bg-center bg-no-repeat checked:bg-[url('/icons/checked_icon.png')]"
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

  const onSubmit = () => {
    //TODO 신청서 생성 완료 -> api 연동
  };

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string[]>([]);

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
      <div className="absolute top-14 h-[calc(100%-3.5rem)] w-full overflow-y-auto">
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
          <div className="flex w-3/4 min-w-[280px] items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[520px]">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
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
          <div className="flex w-3/4 min-w-[280px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[520px]">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
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
          <div className="flex w-3/4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-5"></div>
          </div>

          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyCreatePage;
