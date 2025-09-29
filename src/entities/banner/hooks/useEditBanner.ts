'use client';

import { useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { useBannerStore, useCreateBanner, useUpdateBanner } from '@/entities/banner';

import { bannerQueryKey } from '../config';

export const useEditBanner = () => {
  const { selectedBannerId, selectedBannerImage, selectedBannerUrl, closeEditBannerModal, resetSelectedBanner } =
    useBannerStore(
      useShallow((state) => ({
        selectedBannerId: state.selectedBannerId,
        selectedBannerImage: state.selectedBannerImage,
        selectedBannerUrl: state.selectedBannerUrl,
        closeEditBannerModal: state.closeEditBannerModal,
        resetSelectedBanner: state.resetSelectedBanner,
      })),
    );

  const queryClient = useQueryClient();
  const { mutate: createBanner } = useCreateBanner();
  const { mutate: updateBanner } = useUpdateBanner();

  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(selectedBannerImage);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>(selectedBannerUrl || '');

  const handleClickUploadImage = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setSelectedImage(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  const closeModal = () => {
    resetSelectedBanner();
    closeEditBannerModal();
  };

  const handleSubmit = () => {
    if (selectedBannerId) {
      if (!url) {
        toast.error('URL을 입력해주세요.');
        return;
      }
      updateBanner({
        id: selectedBannerId,
        bannerImg: selectedImage,
        url,
      });
      return;
    }

    if (!selectedImage) {
      toast.error('이미지를 선택해주세요.');
      return;
    }
    if (!url) {
      toast.error('URL을 입력해주세요.');
      return;
    }
    const bannerList = queryClient.getQueryData<Banner.BannerListResponseDto>(bannerQueryKey.list());
    if (bannerList && bannerList.count >= 10) {
      toast.error('이벤트 배너는 최대 10개까지 등록 가능합니다.');
      return;
    }
    createBanner({
      bannerImg: selectedImage!,
      url,
    });
  };

  return {
    selectedBannerId,

    inputRef,
    imageUrl,
    selectedImage,
    url,
    handleClickUploadImage,
    handleSelectImage,
    handleUrlChange,
    clearSelectedImage,
    closeModal,
    handleSubmit,
  };
};
