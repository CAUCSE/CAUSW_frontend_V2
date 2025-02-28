"use client";
import React, { useState } from "react";
import 
{ OccasionTypeDropdown,
  OccasionDateInput,
  OccasionTextArea,
  OccasionImageUploader,
  OccasionSubmitButton } from "@/entities";
import { OccasionService } from "@/shared/hooks/services/OccasionService";
import { getTodayDate, isPastDate, isStartDateBeforeEndDate, isValidDate } from "@/utils";
import toast from "react-hot-toast";



export const OccasionRegistrationForm = () => {
  const [category, setCategory] = useState<"MARRIAGE"| "FUNERAL" | "ETC">("MARRIAGE");
  const [startDate, setStartDate] = useState<string>(getTodayDate());
  const [endDate, setEndDate] = useState<string>(getTodayDate());
  const [description, setDescription] = useState<string>("");


  const [images, setImages] = useState<File[]>([]);

  const { registerOccasion } = OccasionService();

  const handleSubmit = async() => {
    console.log({ category, startDate, endDate, description, images });
    const data: Occasion.CreateCeremonyRequestDto = {
      category: category,
      startDate: startDate,
      endDate: endDate,
      description: description
    }
    
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      toast.error(`유효한 날짜 형식이 아닙니다. \n ex) ${getTodayDate()} 과 같이 입력해주세요!`);
      return;
    }
    if (isPastDate(startDate) || isPastDate(endDate)) {
      toast.error("과거 날짜는 선택할 수 없습니다.");
      return;
    }
    if (!isStartDateBeforeEndDate(startDate, endDate)) {
      toast.error("종료 날짜는 시작 날짜보다 이후여야 합니다.");
      return;
    }
    try {
      const response = await registerOccasion(data, images);
      console.log(response);
    }
    catch(e) {
      console.log(e);
    }

    // TODO: API 연결
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold text-center">경조사 등록 신청</h1>
      <label className="font-medium"> 분류 </label>
      <OccasionTypeDropdown
        options={["MARRIAGE", "FUNERAL", "ETC"]}
        placeholder="분류를 선택하세요."
        onChange={setCategory}
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
          value={description}
          onChange={setDescription}
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
