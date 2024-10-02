"use client";

import { FormRscService, Modal, PreviousButton, usePostStore } from "@/shared";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import { LoadingComponent } from "@/entities";
import { useForm, SubmitHandler } from "react-hook-form";
const ApplyPage = () => {
  const params = useParams();
  const router = useRouter();
  const formId = params.formId;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form.QuestionReplyRequestDtoList>({
    defaultValues: {
      questionReplyRequestDtoList: [],
    },
  });

  const { getFormData, submitFormReply, getUserCanReply } = FormRscService();
  const [form, setForm] = useState<Post.FormResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [canUserReply, setCanUserReply] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const closeModal = () => {
    setModalOpen(false);
    router.back();
  };

  useEffect(() => {
    if (!formId) {
      router.push("/not-found");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [data1, data2] = await Promise.all([
          getFormData(formId),
          getUserCanReply(formId),
        ]);
        setForm(data1);
        setCanUserReply(data2);
      } catch (error: any) {
        // Replace 'any' with your error type
        if (error.message !== "401") {
          router.push("/not-found");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formId, getFormData, getUserCanReply, router]);

  const checkTruncate = () => {
    if (form) {
      const truncateStatus = form.questionResponseDtoList.map((_, idx) => {
        const element = textRefs.current[idx];
        if (element) {
          return element.scrollWidth > element.clientWidth;
        }
        return false;
      });
      setIsTruncated(truncateStatus);
    }
  };

  useEffect(() => {
    checkTruncate();
    window.addEventListener("resize", checkTruncate);
    return () => {
      window.removeEventListener("resize", checkTruncate);
    };
  }, [form]);

  const onSubmit: SubmitHandler<Form.QuestionReplyRequestDtoList> = async (
    data,
  ) => {
    let hasErrors = false;
    data.questionReplyRequestDtoList.forEach(
      (questionReplyRequestDto: Form.QuestionReplyRequestDto, idx: number) => {
        const question = form?.questionResponseDtoList[idx];
        if (!question) return;

        if (
          (question.questionType === "SUBJECTIVE" &&
            !questionReplyRequestDto.questionReply?.trim()) ||
          (question.questionType === "OBJECTIVE" &&
            (!questionReplyRequestDto.selectedOptionList ||
              questionReplyRequestDto.selectedOptionList.length === 0))
        ) {
          if (question.questionType === "SUBJECTIVE") {
            setError(
              `questionReplyRequestDtoList.${idx}.questionReply` as const,
              {
                type: "manual",
                message: "해당 문항에 대한 답변을 입력해주세요.",
              },
            );
          } else if (question.questionType === "OBJECTIVE") {
            setError(
              `questionReplyRequestDtoList.${idx}.selectedOptionList` as const,
              {
                type: "manual",
                message: "해당 문항에 대한 항목을 체크해주세요.",
              },
            );
          }
          hasErrors = true;
        }
      },
    );

    if (hasErrors) {
      return;
    }

    // Prepare the data for submission
    const questionReplyDtoList = data.questionReplyRequestDtoList.map(
      (dto) => ({
        ...dto,
        questionReply: dto.questionReply ?? null,
        selectedOptionList:
          typeof dto.selectedOptionList === "string"
            ? [Number(dto.selectedOptionList)]
            : dto.selectedOptionList
              ? dto.selectedOptionList.map(Number)
              : [],
      }),
    );

    try {
      await submitFormReply(formId, {
        questionReplyRequestDtoList: questionReplyDtoList,
      });
      setModalMessage("신청서 제출 완료");
    } catch (error: any) {
      // Replace 'any' with your error type
      if (error.message === "401") {
        router.push("/not-found");
        return;
      }
      setModalMessage("신청 대상이 아니거나 이미 제출한 신청서입니다.");
    } finally {
      setModalOpen(true);
    }
  };

  return (
    <>
      <PreviousButton />
      {loading ? (
        <LoadingComponent />
      ) : form?.isClosed ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
          <Image
            src="/images/puang-proud.png"
            alt="마감된 신청서"
            width={200}
            height={250}
          />
          <span>마감된 신청서입니다.</span>
        </div>
      ) : !canUserReply ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
          <Image
            src="/images/puang-proud.png"
            alt="이미 제출된 신청서"
            width={200}
            height={250}
          />
          <span className="text-center">
            신청 대상이 아니거나 이미 제출한 신청서입니다.
          </span>
        </div>
      ) : (
        <>
          <div className="flex h-20 w-full items-end pl-4 text-xl">
            {form?.title}
          </div>
          <form
            className="mb-4 flex h-[calc(100%-6rem)] w-full flex-col items-center gap-8 overflow-y-auto pt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            {form?.questionResponseDtoList
              .sort(
                (questionA, questionB) =>
                  questionA.questionNumber - questionB.questionNumber,
              )
              .map(
                (question: Post.QuestionResponseDto, questionIdx: number) => {
                  // 에러 메시지를 별도의 변수로 분리
                  const questionError =
                    errors.questionReplyRequestDtoList?.[questionIdx]
                      ?.questionReply;
                  const selectedOptionError =
                    errors.questionReplyRequestDtoList?.[questionIdx]
                      ?.selectedOptionList;

                  return (
                    <div key={question.questionId} className="w-3/4">
                      <div
                        className={`group relative flex w-full items-center ${
                          question.isMultiple
                            ? "justify-between"
                            : "justify-start"
                        }`}
                      >
                        <div className="relative w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                          <p
                            className="truncate text-[14px] group-hover:block sm:text-xl"
                            ref={(el) => {
                              textRefs.current[questionIdx] = el;
                            }}
                          >
                            {question.questionText}
                          </p>
                          {isTruncated[questionIdx] && (
                            <span className="absolute left-0 top-full hidden w-max bg-gray-800 p-1 text-xs text-white group-hover:block">
                              {question.questionText}
                            </span>
                          )}
                        </div>
                        {question.isMultiple && (
                          <p className="text-[10px] text-[#909090] sm:text-sm">
                            복수 선택 가능
                          </p>
                        )}
                      </div>

                      <div
                        className={`${
                          question.questionType === "SUBJECTIVE"
                            ? "justify-end"
                            : ""
                        } flex min-h-[50px] w-full flex-col gap-2 rounded-sm border border-black bg-white px-4 py-2 sm:min-w-[400px]`}
                      >
                        {question.questionType === "OBJECTIVE" ? (
                          question.optionResponseDtoList
                            .sort(
                              (optionA, optionB) =>
                                optionA.optionNumber - optionB.optionNumber,
                            )
                            .map((option: Post.OptionResponseDto) => (
                              <div className="flex gap-2" key={option.optionId}>
                                {question.isMultiple ? (
                                  <input
                                    type="checkbox"
                                    value={option.optionNumber}
                                    {...register(
                                      `questionReplyRequestDtoList.${questionIdx}.selectedOptionList` as const,
                                    )}
                                  />
                                ) : (
                                  <input
                                    type="radio"
                                    value={option.optionNumber}
                                    {...register(
                                      `questionReplyRequestDtoList.${questionIdx}.selectedOptionList` as const,
                                    )}
                                  />
                                )}
                                <p>{option.optionText}</p>
                              </div>
                            ))
                        ) : (
                          <input
                            type="text"
                            className="flex w-full items-center border-b-[1px] border-black bg-white outline-none"
                            placeholder="답변을 입력해주세요"
                            {...register(
                              `questionReplyRequestDtoList.${questionIdx}.questionReply` as const,
                            )}
                          />
                        )}
                        {/* 에러 메시지 출력 */}
                        {questionError?.message && (
                          <p className="text-sm text-red-500">
                            {questionError.message}
                          </p>
                        )}
                        {selectedOptionError?.message && (
                          <p className="text-sm text-red-500">
                            {selectedOptionError.message}
                          </p>
                        )}
                      </div>
                      <input
                        type="hidden"
                        value={question.questionId}
                        {...register(
                          `questionReplyRequestDtoList.${questionIdx}.questionId` as const,
                        )}
                      />
                    </div>
                  );
                },
              )}
            <button
              type="submit"
              className="min-h-[40px] w-[240px] rounded-md bg-[#6BBEEC] text-white"
            >
              제출하기
            </button>
          </form>
          {modalOpen && (
            <Modal closeModal={closeModal}>
              <p>{modalMessage}</p>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default ApplyPage;
