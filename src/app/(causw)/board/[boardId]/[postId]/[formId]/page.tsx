"use client";

import { FormRscService, Modal, PreviousButton, usePostStore } from "@/shared";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import { LoadingComponent } from "@/entities";
import { useForm } from "react-hook-form";

const ApplyPage = () => {
  const params = useParams();
  const router = useRouter();
  const { formId } = params;
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

  const { getFormData, submitFormReply } = FormRscService();
  const [form, setForm] = useState<Post.FormResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notAllow, setNotAllow] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const closeModal = () => {
    setModalOpen(false);
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getFormData(formId);
        setForm(data);
      } catch (error) {
        if (error.message === "401") {
          setNotAllow(true);
        } else {
          router.push("/not-found");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  useEffect(() => {
    if (form?.isClosed) {
      setModalMessage("마감된 신청서입니다.");
      setModalOpen(true);
    }
  }, [form]);

  const onSubmit = async (data) => {
    let hasErrors = false;
    data.questionReplyRequestDtoList.forEach(
      (questionReplyRequestDto: Form.QuestionReplyRequestDto, idx: number) => {
        if (
          (form?.questionResponseDtoList[idx].questionType === "SUBJECTIVE" &&
            questionReplyRequestDto.questionReply === undefined) ||
          questionReplyRequestDto.questionReply?.trim() === ""
        ) {
          setError(`questionReplyRequestDtoList.${idx}.questionReply`, {
            type: "manual",
            message: "해당 문항에 대한 답변을 입력해주세요.",
          });
          hasErrors = true;
        } else if (
          form?.questionResponseDtoList[idx].questionType === "OBJECTIVE" &&
          (!questionReplyRequestDto.selectedOptionList ||
            questionReplyRequestDto.selectedOptionList.length === 0)
        ) {
          setError(`questionReplyRequestDtoList.${idx}.selectedOptionList`, {
            type: "manual",
            message: "해당 문항에 대한 항목을 체크해주세요.",
          });
          hasErrors = true;
        }
      },
    );
    if (hasErrors) {
      return;
    }

    const questionReplyDtoList = { ...data };
    questionReplyDtoList.questionReplyRequestDtoList.forEach(
      (questionReplyRequestDto: Form.QuestionReplyRequestDto) => {
        if (questionReplyRequestDto.questionReply === undefined) {
          questionReplyRequestDto.questionReply = null;
        }
        if (typeof questionReplyRequestDto.selectedOptionList === "string") {
          questionReplyRequestDto.selectedOptionList = [
            Number(questionReplyRequestDto.selectedOptionList),
          ];
        } else if (
          typeof questionReplyRequestDto.selectedOptionList === "object"
        ) {
          questionReplyRequestDto.selectedOptionList =
            questionReplyRequestDto.selectedOptionList.map((selectedOption) =>
              Number(selectedOption),
            );
        }
      },
    );

    try {
      await submitFormReply(formId, questionReplyDtoList);
      setModalMessage("신청서 제출 완료");
    } catch (error) {
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
      ) : notAllow ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
          <Image
            src="/images/puang-proud.png"
            alt="404"
            width={200}
            height={250}
          ></Image>
          <span>신청 대상이 아닙니다.</span>
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
                  return (
                    <div key={question.questionId} className="w-3/4">
                      <div
                        className={`group relative flex w-full items-center ${question.isMultiple ? "justify-between" : "justify-start"}`}
                      >
                        <div className="relative w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                          <p
                            className="truncate text-[14px] group-hover:block sm:text-xl"
                            ref={(el) => (textRefs.current[questionIdx] = el)}
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
                        className={`${question.questionType === "SUBJECTIVE" ? "justify-end" : ""} flex min-h-[50px] w-full flex-col gap-2 rounded-sm border border-black bg-white px-4 py-2 sm:min-w-[400px]`}
                      >
                        {question.questionType === "OBJECTIVE" ? (
                          question.optionResponseDtoList
                            .sort(
                              (optionA, optionB) =>
                                optionA.optionNumber - optionB.optionNumber,
                            )
                            .map((option: Post.OptionResponseDto) => {
                              return (
                                <div
                                  className="flex gap-2"
                                  key={option.optionId}
                                >
                                  {question.isMultiple ? (
                                    <input
                                      type="checkbox"
                                      value={option.optionNumber}
                                      {...register(
                                        `questionReplyRequestDtoList.${questionIdx}.selectedOptionList`,
                                      )}
                                    />
                                  ) : (
                                    <input
                                      type="radio"
                                      value={option.optionNumber}
                                      {...register(
                                        `questionReplyRequestDtoList.${questionIdx}.selectedOptionList`,
                                      )}
                                    />
                                  )}
                                  <p>{option.optionText}</p>
                                </div>
                              );
                            })
                        ) : (
                          <input
                            type="text"
                            className="flex w-full items-center border-b-[1px] border-black bg-white outline-none"
                            placeholder="답변을 입력해주세요"
                            {...register(
                              `questionReplyRequestDtoList.${questionIdx}.questionReply`,
                            )}
                          />
                        )}
                        {errors?.questionReplyRequestDtoList?.[questionIdx]
                          ?.questionReply && (
                          <p className="text-sm text-red-500">
                            {
                              errors.questionReplyRequestDtoList[questionIdx]
                                .questionReply.message
                            }
                          </p>
                        )}
                        {errors?.questionReplyRequestDtoList?.[questionIdx]
                          ?.selectedOptionList && (
                          <p className="text-sm text-red-500">
                            {
                              errors.questionReplyRequestDtoList[questionIdx]
                                .selectedOptionList.message
                            }
                          </p>
                        )}
                      </div>
                      <input
                        type="hidden"
                        value={question.questionId}
                        {...register(
                          `questionReplyRequestDtoList.${questionIdx}.questionId`,
                        )}
                      />
                    </div>
                  );
                },
              )}
            <button className="min-h-[40px] w-[240px] rounded-md bg-[#6BBEEC] text-white">
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
