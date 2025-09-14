'use client';

import Image from 'next/image';

import ImageIcon from '@icons/image_icon.svg';

import { useEditBanner } from '@/entities/banner';

import { PortalModal } from '@/fsd_shared/ui';

import { MESSAGES } from '@/fsd_shared';

interface ImageSelectionProps {
  imageUrl?: string | null;
  selectedImage: File | null;
  handleClickUploadImage: () => void;
  clearSelectedImage: () => void;
}

const ImageSelection = ({
  imageUrl,
  selectedImage,
  handleClickUploadImage,
  clearSelectedImage,
}: ImageSelectionProps) => {
  return (
    <>
      {(imageUrl || selectedImage) && (
        <div className="flex justify-end gap-2">
          <button className="text-gray-400 underline hover:text-gray-500" onClick={handleClickUploadImage}>
            재업로드
          </button>
          <button className="text-gray-400 underline hover:text-gray-500" onClick={clearSelectedImage}>
            제거
          </button>
        </div>
      )}
      <div className="flex h-[150px] max-w-[1100px] items-center justify-center rounded-md border border-gray-300">
        {imageUrl || selectedImage ? (
          <Image
            src={selectedImage ? URL.createObjectURL(selectedImage) : imageUrl!}
            alt="banner"
            height={150}
            width={1100}
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-20 w-20 text-gray-500" />
            <button
              className="rounded-lg border border-gray-300 px-2 py-1 text-sm text-[#007AFF] hover:border-gray-400"
              onClick={handleClickUploadImage}
            >
              이미지 업로드하기
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-end">
        <p className="text-end text-xs font-light text-[#B4B1B1]">
          이미지는 1100 * 150 px 크기로 맞춰주세요. <br />
          10MB 이하의 이미지만 업로드할 수 있습니다.
          <br />
          {MESSAGES.FILE_TYPE_INF_GIF}
        </p>
      </div>
    </>
  );
};

export const BannerEditModal = () => {
  const {
    selectedBannerId,
    selectedImage,
    imageUrl,
    url,
    inputRef,
    handleClickUploadImage,
    clearSelectedImage,
    handleUrlChange,
    handleSelectImage,
    handleSubmit,
    closeModal,
  } = useEditBanner();

  return (
    <PortalModal
      closeModal={closeModal}
      className="mx-4 flex w-full max-w-[1300px] flex-col rounded-lg bg-white px-8 py-6 shadow-lg md:w-[800px]"
    >
      <PortalModal.Header className="mb-5 flex items-center justify-center md:mb-12">
        <h1 className="text-lg md:text-2xl">이벤트 배너 {selectedBannerId ? '수정' : '추가'}</h1>
      </PortalModal.Header>
      <PortalModal.Body className="flex flex-col">
        <ImageSelection
          imageUrl={imageUrl}
          selectedImage={selectedImage}
          handleClickUploadImage={handleClickUploadImage}
          clearSelectedImage={clearSelectedImage}
        />
        <div className="mt-4 flex flex-col gap-2">
          <h2>이벤트 배너 URL</h2>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-2 py-4 font-light placeholder:font-light"
            placeholder="URL을 입력해주세요"
            onChange={handleUrlChange}
            value={url}
          />
        </div>

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          ref={inputRef}
          className="hidden"
          onChange={handleSelectImage}
        />
      </PortalModal.Body>
      <PortalModal.Footer>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="rounded-lg bg-[#007AFF] px-8 py-2 text-xl text-white hover:bg-[#0067D8] md:px-12"
            onClick={handleSubmit}
          >
            {selectedBannerId ? '수정' : '추가'}
          </button>
          <button
            className="tex-xl rounded-lg bg-gray-200 px-8 py-2 text-gray-500 hover:bg-gray-300 md:px-12"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </PortalModal.Footer>
    </PortalModal>
  );
};
