"use client";

import { useRef, useState } from "react";

import { CalendarService } from "@/shared/hooks/services/CalendarService";
import toast from "react-hot-toast";

export const useAddCalendarModal = () => {
  const { useCreateCalendar } = CalendarService();
  const { mutate: createCalendar } = useCreateCalendar();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO 상수화 진행
  const yearList: number[] = [];
  for (let i = new Date().getFullYear(); i >= 1972; i--) {
    yearList.push(i);
  }

  const monthList: number[] = [];
  for (let i = 1; i <= 12; i++) {
    monthList.push(i);
  }

  const clickUploadBtn = () => {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setSelectedImage(e.target.files[0]);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      toast.error("이미지를 선택해주세요");
      return;
    }
    createCalendar({
      year: selectedYear,
      month: selectedMonth,
      calendarImg: selectedImage,
    });
  };

  return {
    yearList,
    monthList,
    selectedImage,
    fileInputRef,
    setSelectedYear,
    setSelectedMonth,
    clickUploadBtn,
    handleFileChange,
    clearSelectedImage,
    handleSubmit,
  };
};
