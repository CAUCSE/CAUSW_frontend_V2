'use client';

import Image from 'next/image';

import { useAddCalendarModal, useCalendarStore } from '@/fsd_entities/calender';
import { ACCEPTED_IMAGE_TYPES } from '@/fsd_entities/post/config/fileUploadRule';

import { CustomSelect, MESSAGES, PortalModal } from '@/fsd_shared';

import ImageIcon from '../../../../public/icons/image_icon.svg';

// ImageSelectionModalBody 컴포넌트는 변경 없습니다.
const ImageSelectionModalBody = ({
                                   clickUploadBtn,
                                   clearSelectedImage,
                                   selectedImage,
                                 }: {
  clickUploadBtn: () => void;
  clearSelectedImage: () => void;
  selectedImage: File | null;
}) => {
  return (
    <>
      {selectedImage ? (
        <div>
          <div className="mb-2 flex w-full justify-end gap-4 text-sm">
            <button className="text-gray-400 underline hover:text-gray-500" onClick={clickUploadBtn}>
              재업로드
            </button>
            <button className="text-gray-400 underline hover:text-gray-500" onClick={clearSelectedImage}>
              제거
            </button>
          </div>
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="calendar"
            width={280}
            height={280}
            className="h-[280px] w-[280px] rounded-md object-contain"
          />
        </div>
      ) : (
        <div className="mt-5 flex h-[280px] w-[280px] flex-col items-center justify-center rounded-md bg-[#E9ECEF]">
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="text-[#868E96]" />
            <button
              className="rounded-xl border border-gray-50 bg-white px-8 py-2 text-[#007AFF] hover:bg-gray-50"
              onClick={clickUploadBtn}
            >
              캘린더 업로드
            </button>
            <p className="mt-4 text-xs text-[#B4B1B1]">10MB 이하의 이미지만 업로드할 수 있습니다.</p>
            <p className="mb-2 text-sm text-gray-400">{MESSAGES.FILE_TYPE_INFO}</p>
          </div>
        </div>
      )}
    </>
  );
};


export const CalendarAddModal = () => {
  const closeAddModal = useCalendarStore((state) => state.closeAddModal);
  const {
    yearList,
    monthList,
    selectedImage,
    selectedYear,
    selectedMonth,
    fileInputRef,
    setSelectedYear,
    setSelectedMonth,
    clickUploadBtn,
    clearSelectedImage,
    handleFileChange,
    handleSubmit,
  } = useAddCalendarModal();

  return (
    <PortalModal
      className="mx-4 flex w-full flex-col items-center gap-5 rounded-lg bg-[#F8F9FA] py-8 lg:w-[768px]"
      closeModal={closeAddModal}
    >
      <PortalModal.Header>
        <h1 className="text-lg md:text-2xl">캘린더 추가</h1>
      </PortalModal.Header>
      <PortalModal.Body className="flex flex-col items-center justify-center gap-5">
        <ImageSelectionModalBody
          clickUploadBtn={clickUploadBtn}
          clearSelectedImage={clearSelectedImage}
          selectedImage={selectedImage}
        />
        <div className="flex w-full justify-center gap-4">
          {/* 👇 여기에 widthClass="w-28"을 명시적으로 추가합니다. */}
          <CustomSelect
            itemList={yearList}
            suffix="년"
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="년도 선택"
            widthClass="w-28"
          />
          {/* 👇 여기에도 widthClass="w-28"을 명시적으로 추가합니다. */}
          <CustomSelect
            itemList={monthList}
            suffix="월"
            value={selectedMonth}
            onChange={setSelectedMonth}
            placeholder="월 선택"
            widthClass="w-28"
          />
        </div>
      </PortalModal.Body>
      <PortalModal.Footer className="flex w-full justify-center gap-8">
        <button
          className="rounded-lg bg-[#007AFF] px-8 py-2 text-xl text-white hover:bg-[#0067D8] md:px-12"
          onClick={handleSubmit}
        >
          추가
        </button>
        <button
          className="text rounded-lg bg-gray-200 px-8 py-2 text-xl text-gray-500 hover:bg-gray-300 md:px-12"
          onClick={closeAddModal}
        >
          취소
        </button>
        <input
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </PortalModal.Footer>
    </PortalModal>
  );
};
