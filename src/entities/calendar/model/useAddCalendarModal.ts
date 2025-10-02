'use client';

import { useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { useCreateCalendar } from '@/entities/calendar/api/post';

import { generateYearList } from '@/shared';

export const useAddCalendarModal = () => {
  const { mutate: createCalendar } = useCreateCalendar();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const yearList = generateYearList();

  const monthList: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  const clickUploadBtn = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // 10MB 크기 제한 체크
      if (e.target.files[0].size > 10 * 1024 * 1024) {
        toast.error('10MB 이하의 이미지만 업로드할 수 있습니다.');
        return;
      }
      setSelectedImage(e.target.files[0]);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // input 값 초기화
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      toast.error('이미지를 선택해주세요');
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
    selectedYear,
    selectedMonth,
    fileInputRef,
    setSelectedYear,
    setSelectedMonth,
    clickUploadBtn,
    handleFileChange,
    clearSelectedImage,
    handleSubmit,
  };
};
