import { create } from 'zustand';

interface BannerStore {
  selectedBannerId: string | null;
  selectedBannerImage: string | null;
  selectedBannerUrl: string | null;
  isBannerEditModalOpen: boolean;
  isBannerDeleteModalOpen: boolean;
  setSelectedBannerId: (id: string | null) => void;
  setSelectedBannerImage: (image: string | null) => void;
  setSelectedBannerUrl: (url: string | null) => void;
  openDeleteBannerModal: () => void;
  openEditBannerModal: () => void;
  closeDeleteBannerModal: () => void;
  closeEditBannerModal: () => void;
  resetSelectedBanner: () => void;
}

export const useBannerStore = create<BannerStore>((set) => ({
  selectedBannerId: null,
  selectedBannerImage: null,
  selectedBannerUrl: null,
  isBannerDeleteModalOpen: false,
  isBannerEditModalOpen: false,
  setSelectedBannerId: (id) => set({ selectedBannerId: id }),
  setSelectedBannerImage: (image) => set({ selectedBannerImage: image }),
  setSelectedBannerUrl: (url) => set({ selectedBannerUrl: url }),
  openDeleteBannerModal: () => set({ isBannerDeleteModalOpen: true }),
  openEditBannerModal: () => set({ isBannerEditModalOpen: true }),
  closeDeleteBannerModal: () => set({ isBannerDeleteModalOpen: false }),
  closeEditBannerModal: () => set({ isBannerEditModalOpen: false }),
  resetSelectedBanner: () =>
    set({
      selectedBannerId: null,
      selectedBannerImage: null,
      selectedBannerUrl: null,
    }),
}));
