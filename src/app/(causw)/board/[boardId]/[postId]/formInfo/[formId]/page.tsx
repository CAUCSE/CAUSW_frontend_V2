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
  const { formId } = params;

  const [loading, setLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<Post.FormResponseDto | null>(null);
  const [formResultSummary, setFormResultSummary] = useState<
    Form.QuestionSummaryResponseDto[] | null
  >(null);
  const [totalFormResult, setTotalFormResult] =
    useState<Form.ReplyPageResponseDto | null>(null);
  const [summary, setSummary] = useState<boolean>(true);
  const [detail, setDetail] = useState<boolean>(false);
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
    setLoading(true);
    const fetchData = async () => {
      try {
        //TODO totalResult API물어보기
        const [data1, data2, data3] = await Promise.all([
          getFormData(formId),
          getFormResultBySummary(formId),
          getTotalFormResult(formId, numOfRequestDetailResult, 20),
        ]);
        setFormData(data1);
        setFormResultSummary(data2);
        setTotalFormResult(data3);
        setIsFinish(data1.isClosed);
      } catch (error) {
        console.log(error);
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
    if (formResultSummary) {
      const truncateStatus = formResultSummary?.map((_, idx: number) => {
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
  }, [formResultSummary]);

  const setFormState = async () => {
    try {
      await setFormFinished(formId, !isFinish);
    } catch (error) {
      console.log(error);
    }
    setIsFinish(!isFinish);
  };

  return (
    <>
      <PreviousButton />
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <p className="absolute top-6 w-full text-center text-[18px] font-bold sm:hidden">
            {formData?.title}
          </p>
          <div className="flex h-24 items-end justify-between pb-4 sm:flex-row">
            <p className="hidden pl-4 text-3xl font-bold sm:block">
              {formData?.title}
            </p>
            <div className="flex gap-2 sm:gap-4">
              <button
                className={`flex h-[30px] w-[50px] items-center justify-center rounded-3xl border border-black sm:h-[40px] sm:w-[60px] ${summary ? "bg-[#76C6D1]" : "bg-white"}`}
                onClick={toggleSummaryBtn}
              >
                <p className="text-[12px] font-bold sm:text-[16px]">요약</p>
              </button>
              <button
                className={`flex h-[30px] w-[50px] items-center justify-center rounded-3xl border border-black sm:h-[40px] sm:w-[60px] ${detail ? "bg-[#76C6D1]" : "bg-[#FFFFFF]"}`}
                onClick={toggleDetailBtn}
              >
                <p className="text-[12px] font-bold sm:text-[16px]">개별</p>
              </button>
            </div>
            <div className="flex gap-2 sm:gap-4 sm:pr-4">
              <button
                className={`flex h-[30px] w-[50px] items-center justify-center rounded-3xl border border-black bg-[##76C6D1] sm:h-[40px] sm:w-[60px]`}
                onClick={setFormState}
              >
                <p className="text-[12px] font-bold sm:text-[16px]">
                  {isFinish ? "재시작" : "마감"}
                </p>
              </button>
              <button
                className={`flex h-[30px] w-[100px] items-center justify-center rounded-3xl border border-black bg-[##76C6D1] sm:h-[40px] sm:w-[120px]`}
                onClick={() => exportExcelFile(`${formId}`)}
              >
                <p className="text-[12px] font-bold sm:text-[16px]">
                  Excel export
                </p>
              </button>
            </div>
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
                    </div>
                    <div
                      className={`flex min-h-[50px] w-full flex-col gap-2 rounded-sm border border-black bg-white px-3 py-2 sm:min-w-[400px]`}
                    >
                      {result.questionType === "OBJECTIVE"
                        ? objectiveOptionResult
                            ?.filter(
                              (option) => option.id === result.questionId,
                            )
                            .map((option) => {
                              return (
                                <ResponsiveContainer
                                  width="100%"
                                  height={300}
                                  key={option.id}
                                >
                                  <BarChart
                                    layout="vertical"
                                    data={option.data}
                                    margin={{
                                      top: 20,
                                      right: 30,
                                      left: 0,
                                      bottom: 5,
                                    }}
                                    barSize={15}
                                  >
                                    <XAxis
                                      type="number"
                                      domain={[0, "dataMax"]}
                                      tickLine={false}
                                      allowDecimals={false}
                                    />
                                    {/* X축: 값의 축 */}
                                    <YAxis
                                      dataKey="optionText"
                                      type="category"
                                    />
                                    {/* Y축: 카테고리 */}
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                      dataKey="selectedCount"
                                      name="응답 수"
                                      fill="#82ca9d"
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              );
                            })
                        : result.questionAnswerList?.map((answer, idx) => {
                            return (
                              <div
                                key={idx}
                                className="flex h-10 w-full items-center bg-[#E8E8E8] pl-2"
                              >
                                <p className="text-[#515151]">{answer}</p>
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

export default FormInfoPage;
