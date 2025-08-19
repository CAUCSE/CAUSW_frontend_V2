import React from 'react';

interface ActionModalProps {
  closeModal: () => void;
  headTitle: string;
  subTitle?: string;
  topBtnLabel?: string;
  BottomBtnLabel?: string;
  topBtnOnClick?: () => void;
  bottomBtnOnClick?: () => void;
}

export const ActionModal = ({
  closeModal,
  headTitle,
  subTitle,
  topBtnLabel,
  BottomBtnLabel,
  topBtnOnClick,
  bottomBtnOnClick,
}: ActionModalProps) => {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black/10">
      <div className="relative flex w-[270px] flex-col items-center rounded-2xl border-1 border-[#F1F5F9] bg-white sm:w-[360px]">
        <div className="flex w-full flex-col items-center gap-2 px-4 py-6">
          <div className="text-[15px] font-semibold sm:text-xl">{headTitle}</div>
          <div className="text-sm font-normal text-[#616464] sm:text-lg">{subTitle}</div>
        </div>

        <button
          className="w-full border-y-1 border-y-[#F1F5F9] px-4 py-3 text-[15px] font-medium text-[#5D3EE7] sm:text-xl"
          onClick={topBtnOnClick ?? closeModal}
        >
          {topBtnLabel ?? '취소'}
        </button>
        <button className="w-full px-4 py-3 text-[15px] font-semibold sm:text-xl" onClick={bottomBtnOnClick}>
          {BottomBtnLabel ?? '확인'}
        </button>
      </div>
    </div>
  );
};
