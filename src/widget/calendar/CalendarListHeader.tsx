"use client";

import { CustomSelect, useCalendarStore } from "@/shared";

import AddIcon from "../../../public/icons/add_icon.svg";
import { CalendarAddModal } from "@/entities";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useShallow } from "zustand/react/shallow";

export const CalendarListHeader = () => {
  const { setCalendarYear, isAddModalOpen, openAddModal } = useCalendarStore(
    useShallow((state) => ({
      setCalendarYear: state.setCalendarYear,
      isAddModalOpen: state.isAddModalOpen,
      openAddModal: state.openAddModal,
    })),
  );

  const yearList: number[] = [];
  for (let i = new Date().getFullYear(); i >= 1972; i--) {
    yearList.push(i);
  }

  return (
    <>
      <header className="my-4 flex w-full flex-col gap-4">
        <Link href=".." className="mb-7 flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
          이전
        </Link>
        <div className="flex items-center justify-between gap-4 md:justify-normal">
          <p className="text-xl font-medium lg:text-3xl">캘린더 관리</p>
          <button
            className="hidden items-center justify-center rounded-full border border-[#007AFF] bg-[#007AFF] text-white hover:bg-white hover:text-[#007AFF] md:static md:flex md:h-6 md:w-6"
            onClick={openAddModal}
          >
            <AddIcon />
          </button>
        </div>
        <CustomSelect<number>
          itemList={yearList}
          suffix="년"
          setSelectValue={setCalendarYear}
        />
        <>
          {createPortal(
            <button
              className="fixed bottom-28 right-14 h-12 w-12 items-center justify-center rounded-full border border-[#007AFF] bg-[#007AFF] text-white hover:bg-white hover:text-[#007AFF] md:hidden"
              onClick={openAddModal}
            >
              <AddIcon />
            </button>,
            document.body,
          )}
        </>
      </header>
      {isAddModalOpen && <CalendarAddModal />}
    </>
  );
};
