import { BannerCard, BannerDeleteModal, BannerEditModal } from "@/entities";

import { useBannerStore } from "@/shared";
import { useShallow } from "zustand/react/shallow";

interface BannerListProps {
  bannerList: Banner.Banner[];
}

export const BannerList = ({ bannerList }: BannerListProps) => {
  const { isBannerEditModalOpen, isBannerDeleteModalOpen } = useBannerStore(
    useShallow((state) => ({
      isBannerEditModalOpen: state.isBannerEditModalOpen,
      isBannerDeleteModalOpen: state.isBannerDeleteModalOpen,
    })),
  );
  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto px-2 pb-4 scrollbar-hide md:scrollbar-default">
        {bannerList &&
          bannerList.map(({ url, image, id, updatedAt }) => (
            <BannerCard
              key={id}
              url={url}
              imgSrc={image}
              bannerId={id}
              date={updatedAt}
            />
          ))}
      </div>
      {isBannerEditModalOpen && <BannerEditModal />}
      {isBannerDeleteModalOpen && <BannerDeleteModal />}
    </>
  );
};
