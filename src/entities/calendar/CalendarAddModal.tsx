"use client";

import { CustomSelect, PortalModal, useCalendarStore } from "@/shared";

import ImageIcon from "../../../public/icons/image_icon.svg";
import { useState } from "react";

export const CalendarAddModal = () => {
  const closeAddModal = useCalendarStore((state) => state.closeAddModal);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  // TODO 상수화 진행
  const yearList: number[] = [];
  for (let i = new Date().getFullYear(); i >= 1972; i--) {
    yearList.push(i);
  }

  const monthList: number[] = [];
  for (let i = 1; i <= 12; i++) {
    monthList.push(i);
  }

  return (
    <PortalModal
      className="flex flex-col items-center gap-5 rounded-lg bg-[#F8F9FA] px-10 py-8 md:px-40"
      closeModal={closeAddModal}
    >
      <PortalModal.Header>
        <h1 className="text-lg md:text-2xl">캘린더 추가</h1>
      </PortalModal.Header>
      <PortalModal.Body className="flex flex-col items-center justify-center gap-5">
        <div className="flex h-[280px] w-[280px] flex-col items-center justify-center bg-[#E9ECEF]">
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="text-[#868E96]" />
            <button className="rounded-xl bg-white px-8 py-2 text-[#007AFF]">
              캘린더 업로드
            </button>
            <p className="mt-4 text-xs text-[#B4B1B1]">
              10MB 이하의 이미지만 업로드할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center gap-4">
          <CustomSelect<number>
            itemList={yearList}
            suffix="년"
            setSelectValue={setSelectedYear}
          />
          <CustomSelect<number>
            itemList={monthList}
            suffix="월"
            setSelectValue={setSelectedMonth}
          />
        </div>
      </PortalModal.Body>
      <PortalModal.Footer className="flex w-full justify-between">
        <button className="rounded-lg bg-[#007AFF] px-12 py-2 text-xl text-white">
          추가
        </button>
        <button className="text rounded-lg bg-gray-200 px-12 py-2 text-xl text-gray-500">
          취소
        </button>
      </PortalModal.Footer>
    </PortalModal>
  );
};
