'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';
import { useCalendarStore } from '@/entities/calender';
import { CalendarAddModal } from '@/fsd_widgets/calender';
import { CustomSelect, generateYearList } from '@/fsd_shared';

import AddIcon from '../../../../public/icons/add_icon.svg';

export const CalendarListHeader = () => {
  const { calendarYear, setCalendarYear, isAddModalOpen, openAddModal } = useCalendarStore(
    useShallow((state) => ({
      calendarYear: state.calendarYear,
      setCalendarYear: state.setCalendarYear,
      isAddModalOpen: state.isAddModalOpen,
      openAddModal: state.openAddModal,
    })),
  );

  const yearList = generateYearList();

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
        {/* 👇 widthClass prop을 사용하여 너비를 w-36으로 지정 */}
        <CustomSelect
          itemList={yearList}
          suffix="년"
          value={calendarYear}
          onChange={setCalendarYear}
          placeholder="년도 선택"
          widthClass="w-36"
        />
        {typeof document !== 'undefined' &&
          document.body &&
          createPortal(
            <button
              className="fixed right-6 bottom-24 h-16 w-16 transform rounded-[50px] bg-[#7AB6C1] px-6 py-3 text-3xl font-normal text-white shadow-lg hover:bg-[#5F8E97] xl:right-80 xl:bottom-10 xl:h-24 xl:w-24 md:hidden"
              onClick={openAddModal}
            >
              +
            </button>,
            document.body,
          )}
      </header>
      {isAddModalOpen && <CalendarAddModal />}
    </>
  );
};
