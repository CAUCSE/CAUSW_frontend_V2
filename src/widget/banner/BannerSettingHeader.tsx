import AddIcon from "../../../public/icons/add_icon.svg";
import { BannerEditModal } from "@/entities";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useBannerStore } from "@/shared";
import { useShallow } from "zustand/react/shallow";

interface BannerSettingHeaderProps {
  bannerList: Banner.Banner[];
}

export const BannerSettingHeader = ({
  bannerList,
}: BannerSettingHeaderProps) => {
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
              <h1 className="text-lg font-medium lg:text-2xl">
                이벤트 배너 관리
              </h1>
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
          <span className="text-[#B4B1B1] max-lg:text-[14px]">
            이벤트 배너는 최대 10개까지 게시 가능합니다.
          </span>
        </div>
      </header>
      {createPortal(
        <button
          className="fixed bottom-28 right-14 h-10 w-10 items-center justify-center rounded-full border border-[#007AFF] bg-[#007AFF] text-white hover:bg-white hover:text-[#007AFF] md:hidden"
          onClick={handleClickAddBanner}
        >
          <AddIcon />
        </button>,
        document.body,
      )}
      {isBannerEditModalOpen && <BannerEditModal />}
    </>
  );
};
