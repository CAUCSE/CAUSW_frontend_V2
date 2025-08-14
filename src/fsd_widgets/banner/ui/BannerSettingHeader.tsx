import Link from 'next/link';

import AddIcon from '@icons/add_icon.svg';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';

import { BannerEditModal, useBannerStore } from '@/fsd_entities/banner';

interface BannerSettingHeaderProps {
  bannerList: Banner.Banner[];
}

export const BannerSettingHeader = ({ bannerList }: BannerSettingHeaderProps) => {
  const { isBannerEditModalOpen, openEditBannerModal } = useBannerStore(
    useShallow((state) => ({
      isBannerEditModalOpen: state.isBannerEditModalOpen,
      openEditBannerModal: state.openEditBannerModal,
    })),
  );

  const handleClickAddBanner = () => {
    openEditBannerModal();
  };

  return (
    <>
      <header className="flex flex-col gap-4">
        <Link href=".." className="flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-xl font-bold md:text-3xl"></span>
          이전
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col justify-between sm:flex-row">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium lg:text-2xl">이벤트 배너 관리</h1>
              <button
                className="hidden items-center justify-center rounded-full border border-[#007AFF] bg-[#007AFF] text-white hover:bg-white hover:text-[#007AFF] md:static md:flex md:h-6 md:w-6"
                onClick={handleClickAddBanner}
              >
                <AddIcon />
              </button>
            </div>
            <span className="flex items-center gap-2">
              <p className="text-sm">현재 등록된 배너</p>
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-[#007AFF] text-xs font-thin text-white">
                {bannerList?.length}
              </span>
            </span>
          </div>
          <span className="text-[#B4B1B1] max-lg:text-[14px]">이벤트 배너는 최대 10개까지 게시 가능합니다.</span>
        </div>
      </header>
      {createPortal(
        <button
          className="fixed right-6 bottom-24 h-16 w-16 transform rounded-[50px] bg-[#7AB6C1] px-6 py-3 text-3xl font-normal text-white shadow-lg hover:bg-[#5F8E97] xl:right-80 xl:bottom-10 xl:h-24 xl:w-24 md:hidden"
          onClick={handleClickAddBanner}
        >
          +
        </button>,
        document.body,
      )}
      {isBannerEditModalOpen && <BannerEditModal />}
    </>
  );
};
