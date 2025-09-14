'use client';

import { useShallow } from 'zustand/react/shallow';

import { useDeleteBanner, useBannerStore } from '@/entities/banner';
import { PortalModal } from '@/fsd_shared/ui';

export const BannerDeleteModal = () => {
  const { selectedBannerId, closeDeleteBannerModal, resetSelectedBanner } = useBannerStore(
    useShallow((state) => ({
      selectedBannerId: state.selectedBannerId,
      closeDeleteBannerModal: state.closeDeleteBannerModal,
      resetSelectedBanner: state.resetSelectedBanner,
    })),
  );

  const { mutate: deleteBanner } = useDeleteBanner();

  const closeModal = () => {
    resetSelectedBanner();
    closeDeleteBannerModal();
  };

  const handleDelete = () => {
    deleteBanner({ id: selectedBannerId! });
  };

  return (
    <PortalModal
      closeModal={closeModal}
      className="mx-4 flex min-w-[300px] flex-col items-center gap-8 rounded-md bg-white py-12 md:px-40"
    >
      <PortalModal.Header>
        <h1 className="text-lg md:text-2xl">이벤트 배너 삭제</h1>
      </PortalModal.Header>
      <PortalModal.Body>
        <p className="text-center text-base text-red-500 md:text-lg">
          이벤트 배너를 정말 삭제하시겠습니까? <br />이 작업은 되돌릴 수 없습니다.
        </p>
      </PortalModal.Body>
      <PortalModal.Footer className="flex gap-4">
        <button
          className="rounded-lg border border-gray-200 bg-white px-8 py-2 text-xl text-gray-500 hover:bg-gray-200 md:px-12"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          className="rounded-lg bg-red-500 px-8 py-2 text-xl text-white hover:bg-red-600 md:px-12"
          onClick={handleDelete}
        >
          삭제
        </button>
      </PortalModal.Footer>
    </PortalModal>
  );
};
