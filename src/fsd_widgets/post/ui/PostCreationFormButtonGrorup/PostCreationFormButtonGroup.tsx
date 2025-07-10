'use client';

import { useRef } from 'react';

import { ApplicationFormToggle, useUploadFile, VoteToggle } from '@/fsd_entities/post';

import ImageIcon from '../../../../../public/images/post/camera.svg';

interface PostCreationFormButtonGroupProps {
  handleSubmit: (data: any) => void;
}
export const PostCreationFormButtonGroup = ({ handleSubmit }: PostCreationFormButtonGroupProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUploadFile } = useUploadFile();

  const handleFileUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUploadFile(e);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex grow grid-cols-4 justify-center gap-2 py-2 xl:gap-4">
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      <button
        className={`bg-comment-input flex w-16 items-center justify-center rounded-full md:w-20 md:p-3`}
        onClick={handleFileUploadButtonClick}
      >
        <ImageIcon className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      <VoteToggle />
      <ApplicationFormToggle />
      <button
        onClick={handleSubmit}
        className="rounded-full bg-[#F04C23] px-4 py-2 text-sm text-white shadow-md hover:bg-orange-600 focus:outline-hidden md:px-6 md:text-xl xl:ml-20 xl:px-8"
      >
        글작성
      </button>
    </div>
  );
};
