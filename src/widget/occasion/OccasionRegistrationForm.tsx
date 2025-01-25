"use client";
import React, { useState } from "react";
import 
{ OccasionTypeDropdown,
  OccasionDateInput,
  OccasionTextArea,
  OccasionImageUploader,
  OccasionSubmitButton } from "@/entities";

export const OccasionRegistrationForm = () => {
  const [field, setField] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("2025-12-21");
  const [endDate, setEndDate] = useState<string>("2025-12-21");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = () => {
    console.log({ field, startDate, endDate, content, images });
    // TODO: API 연결
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold text-center">경조사 등록 신청</h1>
      <label className="font-medium"> 분류 </label>
      <OccasionTypeDropdown
        options={["결혼", "돌잔치", "장례식"]}
        placeholder="분류를 선택하세요."
        onChange={setField}
      />
      <div className="mt-8">
        <OccasionDateInput title="시작 날짜" initialDate={startDate} onDateChange={setStartDate} />
      </div>
      <div className="mt-4">
        <OccasionDateInput title="종료 날짜" initialDate={endDate} onDateChange={setEndDate} />
      </div>
      <div className="mt-8">
        <p className="mb-4 font-medium">내용</p>
        <OccasionTextArea
          placeholder="경조사 내용 입력"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="mt-4">
        <p className="mb-4 font-medium">사진 등록</p>
        <OccasionImageUploader onUpload={setImages} />
      </div>

      <div className="flex justify-center items-center mt-6">
        <OccasionSubmitButton label="저장" onClick={handleSubmit} />
      </div>
    </div>
  );
};
