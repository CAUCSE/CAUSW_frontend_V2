"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FormRscService, PreviousButton, emailRegex } from "@/shared";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import { LoadingComponent } from "@/entities";
import { useParams } from "next/navigation";

const detailUserInfoLeftKeys: (keyof Form.ReplyUserResponseDto)[] = [
  "email",
  "name",
  "nickName",
  "admissionYear",
  "studentId",
  "major",
  "phoneNumber",
  "academicStatus",
  "currentCompletedSemester",
];

const detailUseInfoLeftKeyValue = [
  "아이디(이메일)",
  "이름",
  "닉네임",
  "입학년도",
  "학번",
  "학부/학과",
  "연락처",
  "학적 상태",
  "현재 등록 완료된 학기",
];

const detailUserInfoRightKey: (keyof Form.ReplyUserResponseDto)[] = [
  "graduationYear",
  "createdAt",
  "isAppliedThisSemester",
  "paidAt",
  "numOfPaidSemester",
  "restOfSemester",
  "isRefunded",
];

const detailUseInfoRightKeyValue = [
  "졸업시기",
  "가입일",
  "본 학기 학생회비 납부 여부",
  "학생회비 납부 시점",
  "학생회비 납부 차수",
  "잔여 학생회비 적용 학기",
  "학생회비 환불 여부",
];

const SEMESTER: { [key: string]: string } = {
  1: "1-1",
  2: "1-2",
  3: "2-1",
  4: "2-2",
  5: "3-1",
  6: "3-2",
  7: "4-1",
  8: "4-2",
  9: "5-1",
};

const ACADEMIC_STATUS: { [key: string]: string } = {
  ENROLLED: "재학",
  LEAVE_OF_ABSENCE: "휴학",
  GRADUATED: "졸업",
  DROPPED_OUT: "자퇴",
  PROBATION: "학사 경고",
  PROFESSOR: "교수",
  UNDETERMINED: "미정",
};

const USER_INFO_PER_PAGE = 20;

const FormInfoPage = () => {
  const {
    getFormData,
    getFormResultBySummary,
    getTotalFormResult,
    exportExcelFile,
    setFormFinished,
  } = FormRscService();

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
  const [objectiveOptionResult, setObjectiveOptionResult] = useState<
    { id: string; data: object[] }[] | null
  >(null);
  const [isFinish, setIsFinish] = useState<boolean | null>(null);
  const [numOfRequestDetailResult, setNumOfRequestDetailResult] =
    useState<number>(0); // 1페이지에 20명씩
  const [currentDetailPage, setCurrentDetailPage] = useState<number>(1); //현재 페이지
  const [totalDetailPage, setTotalDetailPage] = useState<number>(0); // 전체 페이지?
  const [responseUserInfos, setResponseUserInfos] = useState<
    Form.ReplyResponseDto[]
  >([]);
  const [hasMoreDetail, setHasMoreDetail] = useState<boolean>(false);
  const [loadMoreDetail, setLoadMoreDetail] = useState<boolean>(false);
  const [isLoadMoreDetail, setIsLoadMoreDetail] = useState<boolean>(false); //한번이라도 더 불러오기 작업을 했는지 여부
  const [detailQuestionDtoList, setDetailQuestionDtoList] = useState<
    Post.QuestionResponseDto[]
  >([]);
  const [detailQuestionUserResponseList, setDetailQuestionUserResponseList] =
    useState<Form.ReplyQuestionResponseDto[][]>([]);

  useEffect(() => {
    if (!formId) {
      router.push("/not-found");
      return;
    }

    const fetchData = async () => {
      try {
        //TODO totalResult API물어보기
        const [data1, data2, data3] = await Promise.all([
          getFormData(formId),
          getFormResultBySummary(formId),
          getTotalFormResult(formId, numOfRequestDetailResult, 20),
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
  }, []);

  useEffect(() => {
    if (!totalFormResult) return;
    setHasMoreDetail(
      totalFormResult.replyResponseDtoPage.totalElements >
        numOfRequestDetailResult * USER_INFO_PER_PAGE +
          totalFormResult.replyResponseDtoPage.content.length,
    );
    setTotalDetailPage(
      numOfRequestDetailResult * USER_INFO_PER_PAGE +
        totalFormResult.replyResponseDtoPage.content.length,
    );
    if (currentDetailPage === 1 && !isLoadMoreDetail) {
      setResponseUserInfos(totalFormResult.replyResponseDtoPage.content);
      setDetailQuestionDtoList(totalFormResult.questionResponseDtoList);
      setDetailQuestionUserResponseList(
        totalFormResult.replyResponseDtoPage.content.map((cnt) => {
          return cnt.replyQuestionResponseDtoList;
        }),
      );
      return;
    }
    setResponseUserInfos((prev) => [
      ...prev,
      ...totalFormResult.replyResponseDtoPage.content,
    ]);
    setDetailQuestionUserResponseList((prev) => [
      ...prev,
      ...totalFormResult.replyResponseDtoPage.content.map((cnt) => {
        return cnt.replyQuestionResponseDtoList;
      }),
    ]);
    setCurrentDetailPage((prev) => prev + 1);
  }, [totalFormResult]);

  useEffect(() => {
    if (!loadMoreDetail) {
      return;
    }
    setNumOfRequestDetailResult((prev) => prev + 1);
    setLoadMoreDetail(false);
    setIsLoadMoreDetail(true);
  }, [loadMoreDetail]);

  useEffect(() => {
    if (!totalFormResult) {
      return;
    }
    const fetchData = async () => {
      const response = await getTotalFormResult(
        formId,
        numOfRequestDetailResult,
        USER_INFO_PER_PAGE,
      );
      setTotalFormResult(response);
    };
    fetchData();
  }, [numOfRequestDetailResult]);

  useEffect(() => {
    console.log(responseUserInfos);
  }, [responseUserInfos]);

  useEffect(() => {
    if (!formResultSummary) return;
    const objectiveQuestions = formResultSummary.filter(
      (result) => result.questionType === "OBJECTIVE",
    );

    setObjectiveOptionResult(
      objectiveQuestions.map((question: Form.QuestionSummaryResponseDto) => {
        const id = question.questionId;
        const optionCount: object[] = [];
        question.optionSummarieList
          ?.sort(
            (optionA, optionB) => optionA.optionNumber - optionB.optionNumber,
          )
          .map((option) => {
            optionCount.push({
              optionText: option.optionText,
              selectedCount: option.selectedCount,
            });
          });
        return { id: id, data: optionCount };
      }),
    );
  }, [formResultSummary]);

  const toggleSummaryBtn = () => {
    if (summary) return;
    if (detail) setDetail(!detail);
    setSummary(!summary);
  };

  const toggleDetailBtn = () => {
    if (detail) return;
    if (summary) setSummary(!summary);
    setDetail(!detail);
  };

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
          <div className="flex h-[calc(100%-6rem)] w-full flex-col items-center gap-8 overflow-auto pb-10 pt-4">
            {summary &&
              formResultSummary?.map((result, resultIdx: number) => {
                return (
                  <div key={result.questionId} className="w-3/4">
                    <div
                      className={`group relative flex w-full items-center justify-start`}
                    >
                      <div className="relative w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                        <p
                          className="truncate text-[14px] group-hover:block sm:text-xl"
                          ref={(el) => {
                            textRefs.current[resultIdx] = el;
                          }}
                        >
                          {result.questionText}
                        </p>
                        {isTruncated[resultIdx] && (
                          <span className="absolute left-0 top-full hidden w-max bg-gray-800 p-1 text-xs text-white group-hover:block">
                            {result.questionText}
                          </span>
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
                            );
                          })}
                    </div>
                  </div>
                );
              })}
            {detail && (
              <>
                <div className="flex w-full items-center justify-center">
                  <button
                    onClick={() => {
                      if (currentDetailPage - 1 > 0) {
                        setCurrentDetailPage((prev) => prev - 1);
                      }
                    }}
                  >
                    <Image
                      src="/images/page_decrease_btn_icon.png"
                      alt="page-decrease-btn"
                      width={10}
                      height={10}
                    />
                  </button>
                  <p className="px-4 text-2xl">
                    {currentDetailPage} / {totalDetailPage}
                    {hasMoreDetail && "+"}
                  </p>
                  <button
                    // 추가 처리 필요
                    onClick={() => {
                      if (currentDetailPage + 1 <= totalDetailPage) {
                        setCurrentDetailPage((prev) => prev + 1);
                      } else if (hasMoreDetail) {
                        setLoadMoreDetail(true);
                      }
                    }}
                  >
                    <Image
                      src="/images/page_increase_btn_icon.png"
                      alt="page-increase-btn"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
                <div className="flex w-full flex-col items-center gap-8 overflow-y-auto">
                  <div className="w-3/4 min-w-[280px] sm:min-w-[530px]">
                    <div className="flex w-full items-center justify-between">
                      <div className="w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                        <p className="truncate text-[14px] group-hover:block sm:text-xl">
                          응답자 정보
                        </p>
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-x-2 rounded-md border border-black px-4 py-2 sm:grid-cols-2">
                      <ul className="list-disc space-y-2 pl-5">
                        {detailUserInfoLeftKeys.map((key, idx) => {
                          if (key === "currentCompletedSemester") {
                            return (
                              <li key={key}>
                                {detailUseInfoLeftKeyValue[idx]}:{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto[key]
                                  ? SEMESTER[
                                      `${
                                        responseUserInfos[currentDetailPage - 1]
                                          .replyUserResponseDto[key]
                                      }`
                                    ]
                                  : "없음"}
                              </li>
                            );
                          } else if (key === "academicStatus") {
                            return (
                              <li key={key}>
                                {detailUseInfoLeftKeyValue[idx]}:{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto[key]
                                  ? ACADEMIC_STATUS[
                                      `${responseUserInfos[currentDetailPage - 1].replyUserResponseDto[key]}`
                                    ]
                                  : "없음"}
                              </li>
                            );
                          }
                          return (
                            <li key={key}>
                              {detailUseInfoLeftKeyValue[idx]} :{" "}
                              {responseUserInfos[currentDetailPage - 1]
                                .replyUserResponseDto[key] || "없음"}
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="list-disc space-y-2 pl-5">
                        {detailUserInfoRightKey.map((key, idx) => {
                          if (key === "graduationYear") {
                            return (
                              <li key={key}>
                                {detailUseInfoRightKeyValue[idx]}:{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto[key]
                                  ? `${responseUserInfos[currentDetailPage - 1].replyUserResponseDto[key]}년 ${responseUserInfos[currentDetailPage].replyUserResponseDto["graduationType"] === "FEBRUARY" ? "2월" : "8월"}`
                                  : "없음"}
                              </li>
                            );
                          } else if (key === "createdAt") {
                            return (
                              <li key={key}>
                                {detailUseInfoRightKeyValue[idx]}:{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto.createdAt
                                  ? `${new Intl.DateTimeFormat("ko", {
                                      year: "numeric",
                                      month: "long",
                                      day: "2-digit",
                                    }).format(
                                      new Date(
                                        responseUserInfos[
                                          currentDetailPage - 1
                                        ].replyUserResponseDto[key],
                                      ),
                                    )}`
                                  : "없음"}
                              </li>
                            );
                          } else if (key === "isAppliedThisSemester") {
                            return (
                              <li>
                                {detailUseInfoRightKeyValue[idx]}:{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto[key]
                                  ? "⭕"
                                  : "❌"}
                              </li>
                            );
                          } else if (key === "paidAt") {
                            return (
                              <li key={key}>
                                {detailUseInfoRightKeyValue[idx]} :{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto.paidAt
                                  ? SEMESTER[
                                      `${responseUserInfos[currentDetailPage - 1].replyUserResponseDto.paidAt}`
                                    ]
                                  : "없음"}
                              </li>
                            );
                          } else if (key === "restOfSemester") {
                            return (
                              <>
                                <li key={"adjustOfSemester"}>
                                  적용 학생회비 학기:{" "}
                                  {responseUserInfos[currentDetailPage - 1]
                                    .replyUserResponseDto[key]
                                    ? `${8 - responseUserInfos[currentDetailPage - 1].replyUserResponseDto[key]}`
                                    : "없음"}
                                </li>
                                <li key={key}>
                                  {detailUseInfoRightKeyValue[idx]}:{" "}
                                  {responseUserInfos[currentDetailPage - 1]
                                    .replyUserResponseDto[key]
                                    ? responseUserInfos[currentDetailPage - 1]
                                        .replyUserResponseDto[key]
                                    : "없음"}
                                </li>
                              </>
                            );
                          } else if (key === "isRefunded") {
                            return (
                              <li>
                                {detailUseInfoRightKeyValue[idx]}:{" "}
                                {responseUserInfos[currentDetailPage - 1]
                                  .replyUserResponseDto[key]
                                  ? "⭕"
                                  : "❌"}
                              </li>
                            );
                          }
                          return (
                            <li key={key}>
                              {detailUseInfoRightKeyValue[idx]}:{" "}
                              {responseUserInfos[currentDetailPage - 1]
                                .replyUserResponseDto[key] || "없음"}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {detailQuestionDtoList.map((questionDto) => (
                    <div
                      key={questionDto.questionId}
                      className="w-3/4 min-w-[280px] sm:min-w-[530px]"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                          <p className="truncate text-[14px] group-hover:block sm:text-xl">
                            {questionDto.questionText}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full flex-col items-start gap-2 rounded-md border border-black px-4 py-2">
                        {questionDto.questionType === "OBJECTIVE" ? (
                          questionDto.optionResponseDtoList
                            .sort((a, b) => a.optionNumber - b.optionNumber)
                            .map((option) => {
                              const userReplyResult =
                                detailQuestionUserResponseList[
                                  currentDetailPage - 1
                                ].filter(
                                  (response) =>
                                    response.questionId ===
                                    questionDto.questionId,
                                )[0];
                              return (
                                <div className="flex gap-2">
                                  {questionDto.isMultiple ? (
                                    <input
                                      type="checkbox"
                                      checked={userReplyResult.selectedOptionList.includes(
                                        option.optionNumber,
                                      )}
                                      disabled
                                    />
                                  ) : (
                                    <input
                                      type="radio"
                                      checked={userReplyResult.selectedOptionList.includes(
                                        option.optionNumber,
                                      )}
                                      disabled
                                    />
                                  )}
                                  <p>{option.optionText}</p>
                                </div>
                              );
                            })
                        ) : (
                          <input
                            value={
                              detailQuestionUserResponseList[
                                currentDetailPage - 1
                              ].filter(
                                (response) =>
                                  response.questionId ===
                                  questionDto.questionId,
                              )[0].questionAnswer
                            }
                            readOnly
                            className="flex h-10 w-full items-center bg-[#E8E8E8] pl-2 text-[#515151]"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ApplyPage;
