"use client";

import { FormRscService, PreviousButton } from "@/shared";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

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

const CircleApplyManagement = ({
  params: { state, id, userId },
}: {
  params: { state: string; id: string; userId: string };
}) => {
  return (
    <>
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
                    <li key={key}>
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
                    <li key={key}>
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
                    const userReplyResult = detailQuestionUserResponseList[
                      currentDetailPage - 1
                    ].filter(
                      (response) =>
                        response.questionId === questionDto.questionId,
                    )[0];
                    return (
                      <div key={option.optionId} className="flex gap-2">
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
                        response.questionId === questionDto.questionId,
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
  );
};

export default CircleApplyManagement;
