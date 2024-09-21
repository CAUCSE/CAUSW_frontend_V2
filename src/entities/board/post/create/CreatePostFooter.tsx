"use client"
import Image from 'next/image';
import { useFileUpload } from '@/shared';
import { useRef } from 'react';
interface CreatePostFooterProps {
  isVote: boolean;
  handleSubmit: () => void;
  handleVoteToggle: () => void;
}

export const CreatePostFooter = ({ isVote, handleSubmit, handleVoteToggle }: CreatePostFooterProps) => {
  const { handleFileUpload } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="fixed lg:left-10 lg:bottom-0 bottom-[100px] w-full flex justify-center lg:space-x-24">
        <div className="flex flex-grow justify-center grid-cols-4 gap-2 lg:space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={(e) => handleFileUpload(e.target.files?.[0] || null)} 
          />
          <button 
            className={`flex justify-center p-3 bg-comment-input rounded-full w-[80px]`}
            onClick = {handleUploadClick}
          >
            <Image
              src="/images/post/camera.svg"
              alt="Upload Picture Icon"
              width={30}
              height={30}
            ></Image>
          </button>
          <button 
            className={`flex justify-center p-3 ${isVote ? 'bg-vote-btn' : 'bg-comment-input'} rounded-full w-[80px]`}
            onClick={handleVoteToggle}
          >
            <Image
              src="/images/post/vote.svg"
              alt="Vote Icon"
              width={30}
              height={30}
            ></Image>
          </button>
          <button className={`flex justify-center p-3 bg-comment-input rounded-full w-[80px]`}>
            <Image
              src="/images/post/application.svg"
              alt="Application Icon"
              width={30}
              height={30}
            ></Image>
          </button>
          <button
            onClick= {handleSubmit}
            className="lg:ml-20 bg-confirm-btn text-white py-2 px-6 lg:px-8 rounded-full shadow-md text-[20px] lg:text-[20px] hover:bg-orange-600 focus:outline-none"
          >
            글작성
          </button>
        </div>
      </div>
  );
};

