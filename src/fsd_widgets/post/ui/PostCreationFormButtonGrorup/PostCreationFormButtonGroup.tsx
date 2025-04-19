'use client';

import { useRef } from 'react';

import { usePostCreationStore } from '@/fsd_entities/post';

import { useFileUpload } from '@/shared';

import ApplyIcon from '../../../../../public/images/post/application.svg';
import ImageIcon from '../../../../../public/images/post/camera.svg';
import VoteIcon from '../../../../../public/images/post/vote.svg';

interface PostCreationFormButtonGroupProps {
  handleSubmit: (data: any) => void;
}

export const PostCreationFormButtonGroup = ({ handleSubmit }: PostCreationFormButtonGroupProps) => {
  const { isVote, isApply, toggleVote, toggleApply } = usePostCreationStore();
  const { handleFileUpload } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="fixed bottom-[100px] flex w-full justify-center xl:bottom-4 xl:left-10 xl:space-x-24">
      <div className="flex flex-grow grid-cols-4 justify-center gap-2 xl:space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={e => handleFileUpload(e.target.files?.[0] || null)}
        />
        <button
          className={`flex w-16 items-center justify-center rounded-full bg-comment-input md:w-20 md:p-3`}
          onClick={handleUploadClick}
        >
          <ImageIcon width={30} height={30} />
        </button>
        <button
          className={`flex items-center justify-center ${isVote ? 'bg-vote-btn' : 'bg-comment-input'} w-16 rounded-full md:w-20 md:p-3`}
          onClick={toggleVote}
        >
          <VoteIcon width={30} height={30} />
        </button>
        <button
          className={`flex w-16 items-center justify-center rounded-full md:w-20 ${isApply ? 'bg-[#E27C00]' : 'bg-comment-input'} md:p-3`}
          onClick={toggleApply}
        >
          <ApplyIcon width={30} height={30} />
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-full bg-confirm-btn px-4 py-2 text-sm text-white shadow-md hover:bg-orange-600 focus:outline-none md:px-6 md:text-xl xl:ml-20 xl:px-8"
        >
          글작성
        </button>
      </div>
    </div>
  );
};
