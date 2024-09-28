"use client";

import Image from "next/image";
import { useFileUpload } from "@/shared";
import { useRef } from "react";

interface CreatePostFooterProps {
  isVote: boolean;
  isApply: boolean;
  handleSubmit: (data) => void;
  handleVoteToggle: () => void;
  handleApplyToggle: () => void;
}

export const CreatePostFooter = ({
  isVote,
  isApply,
  handleSubmit,
  handleVoteToggle,
  handleApplyToggle,
}: CreatePostFooterProps) => {
  const { handleFileUpload } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="fixed bottom-[100px] flex w-full justify-center lg:bottom-0 lg:left-10 lg:space-x-24">
      <div className="flex flex-grow grid-cols-4 justify-center gap-2 lg:space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
        />
        <button
          className={`flex w-[80px] justify-center rounded-full bg-comment-input p-3`}
          onClick={handleUploadClick}
        >
          <Image
            src="/images/post/camera.svg"
            alt="Upload Picture Icon"
            width={30}
            height={30}
          ></Image>
        </button>
        <button
          className={`flex justify-center p-3 ${isVote ? "bg-vote-btn" : "bg-comment-input"} w-[80px] rounded-full`}
          onClick={handleVoteToggle}
        >
          <Image
            src="/images/post/vote.svg"
            alt="Vote Icon"
            width={30}
            height={30}
          ></Image>
        </button>
        <button
          className={`flex w-[80px] justify-center rounded-full ${isApply ? "bg-[#E27C00]" : "bg-comment-input"} p-3`}
          onClick={handleApplyToggle}
        >
          <Image
            src="/images/post/application.svg"
            alt="Application Icon"
            width={30}
            height={30}
          ></Image>
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-full bg-confirm-btn px-6 py-2 text-[20px] text-white shadow-md hover:bg-orange-600 focus:outline-none lg:ml-20 lg:px-8 lg:text-[20px]"
        >
          글작성
        </button>
      </div>
    </div>
  );
};
