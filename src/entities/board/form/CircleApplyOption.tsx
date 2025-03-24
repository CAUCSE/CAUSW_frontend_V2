"use client";

import { Icon } from "@/shared";
import { useFormContext } from "react-hook-form";

export const CircleApplyOption = ({
  questionIndex,
  optionIndex,
  removeOption,
}: Form.OptionProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Circle.Application>();

  const fieldName = `questionCreateRequestDtoList.${questionIndex}
  .optionCreateRequestDtoList.${optionIndex}.optionText`;

  return (
    <div className="flex flex-col gap-2">
      <div className="ml-4 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <p className="text-md">○</p>
          <input
            type="text"
            placeholder="항목 내용"
            {...register(
              `questionCreateRequestDtoList.${questionIndex}.optionCreateRequestDtoList.${optionIndex}.optionText`,
              {
                required: "항목 내용을 입력해주세요.",
              },
            )}
            className="w-1/3 min-w-[100px] border-b border-[#000000] bg-[#FCFCFC] placeholder:text-center"
          />
          <button
            type="button"
            onClick={() => {
              removeOption();
            }}
          >
            <Icon iconName="remove" />
          </button>
        </div>
        {errors[fieldName]?.message && (
          <p className="text-red-500">{errors[fieldName]?.message}</p>
        )}
      </div>
    </div>
  );
};
