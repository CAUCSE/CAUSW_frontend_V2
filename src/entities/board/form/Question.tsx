"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import { IconButton } from "@/shared";
import { Option } from "./Option";
import { useEffect } from "react";

export const Question = ({ index, removeQuestion }: Form.QuestionProps) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Post.PostCreateWithFormRequestDto>();

  const questionType = watch(
    `formCreateRequestDto.questionCreateRequestDtoList.${index}.questionType`,
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: `formCreateRequestDto.questionCreateRequestDtoList.${index}.optionCreateRequestDtoList`,
  });

  const addOption = () => {
    append({ optionText: "" });
  };

  useEffect(() => {
    if (!questionType) {
      setValue(
        `formCreateRequestDto.questionCreateRequestDtoList.${index}.questionType`,
        "OBJECTIVE",
      );
      if (questionType === "SUBJECTIVE") {
        setValue(
          `formCreateRequestDto.questionCreateRequestDtoList.${index}.optionCreateRequestDtoList`,
          [],
        );
      }
    }
  }, [questionType, setValue, index]);

  //객관식 선택 시 무조건 항목이 하나 이상 있어야 함
  useEffect(() => {
    if (fields.length === 0 && questionType === "OBJECTIVE") {
      append({ optionText: "" });
    }
  }, [fields, append]);

  return (
    <div className="flex min-h-[260px] w-3/4 min-w-[260px] flex-col gap-4 rounded-lg border border-black bg-[#FCFCFC] p-4 lg:min-w-[490px]">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <div className="flex sm:gap-4">
            <label className="flex items-center p-2 text-sm sm:text-xl">
              <input
                type="radio"
                value="OBJECTIVE"
                {...register(
                  `formCreateRequestDto.questionCreateRequestDtoList.${index}.questionType`,
                  {
                    required: "객관식 또는 주관식을 선택해주세요",
                  },
                )}
                className="peer h-0 w-0 cursor-pointer opacity-0"
              />
              <span className="mr-1 inline-block h-3 w-3 cursor-pointer rounded-full border-2 border-black peer-checked:bg-black peer-checked:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,1)] sm:m-4 sm:h-4 sm:w-4"></span>
              객관식
            </label>
            <label className="flex items-center p-2 text-sm sm:text-xl">
              <input
                type="radio"
                value="SUBJECTIVE"
                {...register(
                  `formCreateRequestDto.questionCreateRequestDtoList.${index}.questionType`,
                  {
                    required: "객관식 또는 주관식을 선택해주세요",
                  },
                )}
                className="peer h-0 w-0 cursor-pointer opacity-0"
              />
              <span className="mr-1 inline-block h-3 w-3 cursor-pointer rounded-full border-2 border-black peer-checked:bg-black peer-checked:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,1)] sm:m-4 sm:h-4 sm:w-4"></span>
              주관식
            </label>
          </div>
          {errors.formCreateRequestDto?.questionCreateRequestDtoList?.[index]
            ?.questionType && (
            <p className="text-red-500">
              {
                errors.formCreateRequestDto?.questionCreateRequestDtoList[index]
                  ?.questionType?.message
              }
            </p>
          )}
        </div>
        <IconButton
          iconName={"remove"}
          callback={() => {
            removeQuestion();
          }}
        />
      </div>
      <div className="ml-4 flex flex-col">
        <input
          type="text"
          placeholder="질문 내용"
          {...register(
            `formCreateRequestDto.questionCreateRequestDtoList.${index}.questionText`,
            {
              required: "질문 내용을 입력해주세요",
            },
          )}
          className="w-3/4 border-b border-[#363434] bg-[#FCFCFC] placeholder:text-[#B4B1B1]"
        />
        {errors.formCreateRequestDto?.questionCreateRequestDtoList?.[index]
          ?.questionText && (
          <p className="text-red-500">
            {
              errors.formCreateRequestDto?.questionCreateRequestDtoList[index]
                ?.questionText?.message
            }
          </p>
        )}
      </div>

      {questionType === "OBJECTIVE" && (
        <>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register(
                `formCreateRequestDto.questionCreateRequestDtoList.${index}.isMultiple`,
              )}
              className="ml-4 h-4 w-4 cursor-pointer appearance-none rounded-sm border-2 border-solid border-black bg-[length:100%_100%] bg-center bg-no-repeat checked:bg-[url('/icons/checked_icon.png')]"
            />
            복수 선택 가능
          </label>
          {fields.map((option, optionIdx) => (
            <Option
              key={option.id}
              questionIndex={index}
              optionIndex={optionIdx}
              removeOption={() => {
                remove(optionIdx);
              }}
            />
          ))}
          <button
            type="button"
            onClick={addOption}
            className="ml-4 w-1/3 min-w-[150px] rounded-md bg-[#D9D9D9] text-center lg:min-w-[190px]"
          >
            +
          </button>
        </>
      )}
    </div>
  );
};
