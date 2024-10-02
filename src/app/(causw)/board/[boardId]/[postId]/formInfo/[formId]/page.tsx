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
import { FormRscService, PreviousButton } from "@/shared";
import { useEffect, useRef, useState } from "react";

import { LoadingComponent } from "@/entities";
import { finished } from "stream";
import { stringify } from "querystring";
import { useParams } from "next/navigation";
import Image from "next/image";

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
  const [currentDetailPage, setCurrentDetailPage] = useState<number>(0);
  const [totalDetailPage, setTotalDetailPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        //TODO totalResult API물어보기

        const [data1, data2, data3] = await Promise.all([
          getFormData(formId),
          getFormResultBySummary(formId),
          getTotalFormResult(formId, 0, 20),
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
    setCurrentDetailPage(
      totalFormResult.replyResponseDtoPage.pageable.pageNumber + 1,
    );
    setTotalDetailPage(totalFormResult.replyResponseDtoPage.totalElements);
  }, [totalFormResult]);

  useEffect(() => {
    if (!formResultSummary) return;
    const objectiveQuestions = formResultSummary.filter(
      (result) => result.questionType === "OBJECTIVE",
    );
    console.log(
      JSON.stringify(
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
        null,
        2,
      ),
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
                          ref={(el) => (textRefs.current[resultIdx] = el)}
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
                  <button>
                    <Image
                      src="/images/page_decrease_btn_icon.png"
                      alt="page-decrease-btn"
                      width={10}
                      height={10}
                    />
                  </button>
                  <p className="px-4 text-2xl">
                    {currentDetailPage} / {totalDetailPage}
                  </p>

                  <button>
                    <Image
                      src="/images/page_increase_btn_icon.png"
                      alt="page-increase-btn"
                      width={10}
                      height={10}
                    />
                  </button>
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
