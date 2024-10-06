"use client";

import { CircleService } from "@/shared";
import { useEffect, useRef, useState } from "react";

import { LoadingComponent } from "@/entities";

const CircleApplyManagement = ({
  params: { state, id, userId },
}: {
  params: { state: string; id: string; userId: string };
}) => {
  const {
    getApplicationById,
    rejectApplyUser,
    acceptApplyUser,
    getApplication,
  } = CircleService();

  const [data, setData] = useState<Circle.Apply>();
  const [application, setApplication] = useState<any>();

  useEffect(() => {
    getApplicationById(id, userId)
      .then((res) => {
        setData(res);
      })
      .then(() => {
        getApplication(id).then((res) => {
          setApplication(res);
        });
      });
  }, []);

  if (!data) return <LoadingComponent />;

  return (
    <>
      <div className="flex w-full flex-col items-center gap-8 overflow-y-auto">
        {data.replyResponseDtoPage.map((element) => {
          const question = application.questionResponseDtoList.find(
            (element) => element.questionId === element.questionId,
          );
          return (
            <div
              key={question.questionId}
              className="w-3/4 min-w-[280px] sm:min-w-[530px]"
            >
              <div className="flex w-full items-center justify-between">
                <div className="w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                  <p className="truncate text-[14px] group-hover:block sm:text-xl">
                    {element.questionAnswer}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-2 rounded-md border border-black px-4 py-2">
                {question.questionType === "OBJECTIVE" ? (
                  question.optionResponseDtoList
                    .sort((a, b) => a.optionNumber - b.optionNumber)
                    .map((option) => {
                      return (
                        <div key={option.optionId} className="flex gap-2">
                          {question.isMultiple ? (
                            <input
                              type="checkbox"
                              checked={element.selectedOptionList.includes(
                                option.optionNumber,
                              )}
                              disabled
                            />
                          ) : (
                            <input
                              type="radio"
                              checked={element.selectedOptionList.includes(
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
                    value={element.questionAnswer}
                    readOnly
                    className="flex h-10 w-full items-center bg-[#E8E8E8] pl-2 text-[#515151]"
                  />
                )}
              </div>
            </div>
          );
        })}
        <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
          <button
            className="flex h-10 w-80 items-center justify-center rounded-xl bg-default text-lg text-white md:h-16 lg:text-xl"
            onClick={() => {
              acceptApplyUser(id).then(() => {
                window.location.href = "/setting/management/circle" + id + "/apply";
              });
            }}
          >
            승인
          </button>
          <button
            className="flex h-10 w-80 items-center justify-center rounded-xl bg-gray-400 text-lg text-white md:h-16 lg:text-xl"
            onClick={() => {
              rejectApplyUser(id).then(() => {
                window.location.href = "/setting/management/circle" + id + "/apply";
              });
            }}
          >
            거부
          </button>
        </div>
      </div>
    </>
  );
};

export default CircleApplyManagement;