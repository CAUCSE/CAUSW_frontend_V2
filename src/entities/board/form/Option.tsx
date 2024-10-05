"use client";

import { Icon } from "@/shared";
import { useFormContext } from "react-hook-form";

export const Option = ({
  questionIndex,
  optionIndex,
  removeOption,
}: Form.OptionProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Post.PostCreateWithFormRequestDto>();
  return (
    <div className="flex flex-col gap-2">
      <div className="ml-4 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <p className="text-md">○</p>
          <input
            type="text"
            placeholder="항목 내용"
            {...register(
              `formCreateRequestDto.questionCreateRequestDtoList.${questionIndex}.optionCreateRequestDtoList.${optionIndex}.optionText`,
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
        {/* TODO: build error 로 임시 배제
        {errors.formCreateRequestDto?.questionCreateRequestDtoList?.[
          questionIndex
        ]?.optionCreateRequestDtoList?.[optionIndex]?.optionText && (
          <p className="text-red-500">
            {
              errors.formCreateRequestDto?.questionCreateRequestDtoList?.[
                questionIndex
              ]?.optionCreateRequestDtoList?.[optionIndex]?.optionText.message
            }
          </p>
        )} */}
      </div>
    </div>
  );
};
