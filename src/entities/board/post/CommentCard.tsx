"use client"

import { useUserStore, useCommentStore, usePostStore, CommentRscService } from "@/shared";
import Image from "next/image";
import { PopupMenu } from "./PopupMenu";
import { useState } from "react";

// 여기도 좋아요 싫어요 디자인 문의하기
interface CommentCardProps {
  comment: Comment.CommentDto;
  numLike: number;
  overlayActive: boolean;
  isDeleted: boolean;
  isPopupVisible:boolean;
  handleCommentToggle: () => void;
  handleCommentLike: () => void;
  handleDeleteComment: () => void;
}

export const CommentCard = ({ comment, numLike, overlayActive,isPopupVisible, isDeleted, handleCommentToggle, handleCommentLike,handleDeleteComment }: CommentCardProps) => {
  const { toggleCommentOverlay} = useCommentStore();
  const { setCommentInfo: setChildComment} = usePostStore();
  const writerProfileImage = comment.writerProfileImage ?? "/images/default_profile.png";
  const handleOverlayToggle = () => {
    if(!isDeleted){
      setChildComment(comment.id);
      toggleCommentOverlay(comment.id);
    }
  };
  
  const handleLike = () => {
    if(!isDeleted){
      handleCommentLike();
    }
  }

  const popMenuList = [
    { message: "댓글 삭제", handleBtn: handleDeleteComment },
  ];
  return (
    <div className={`relative flex flex-col ${overlayActive ? 'border-overlay-border' : 'border-black'} border-comment-bw rounded-comment-br pb-2 ${overlayActive ? 'bg-overlay-bg': 'bg-white'} mb-4 max-w-sm`}>
      <button className="absolute top-3 right-3 flex items-center justify-center w-10 h-10" onClick={handleCommentToggle}>
        <Image
          src="/images/post/comment-menu.svg"
          alt="Comment Menu"
          width={4}
          height={4}
        ></Image>
      </button>
      {isPopupVisible ? <PopupMenu PopupMenuChildren={popMenuList}/>:''}

      <div className="flex flex-row items-center px-2 mb-1">
        <Image
          src = {writerProfileImage}
          alt = "Comment Profil"
          width={50}
          height={50}
          className="m-2 bg-center bg-no-repeat bg-contain"
        />
        <div className="font-bold text-[16px]">{comment.isAnonymous ? "익명" : comment.writerName}</div>
      </div>

      <div className="mb-1 px-8 text-[16px]">{isDeleted ? "삭제된 댓글입니다.":comment.content}</div>

      <button className="flex flex-row justify-start items-center space-x-3 py-1 px-8 text-post-like text-[13px]" onClick={handleLike}>
        <Image
          src="/images/post/like.svg"
          alt="Like Icon"
          width={20}
          height={20}
        ></Image>
        <span>{numLike > 999 ? '999+' : numLike}</span>
      </button>

      <div className={`absolute flex flex-row items-center justify-between space-x-3 px-2.5 py-1.5 bottom-3 right-10  ${overlayActive ? 'bg-overlay-btn' : 'bg-comment-btn'} rounded-comment-br`}>
        <button onClick={handleLike}>
          <Image
            src="/images/post/comment-like.svg"
            alt="Like Icon"
            width={18}
            height={18}
            className="items-center"
          ></Image>
        </button>
        <Image
          src="/images/post/comment-divide.svg"
          alt="Like Icon"
          width={3}
          height={10}
          className="items-center"
        ></Image>
        <button onClick={handleOverlayToggle}>
          <Image
            src="/images/post/comment-comment.svg"
            alt="Like Icon"
            width={18}
            height={18}
            className="items-center"
          ></Image>
        </button>
      </div>
    </div>
  );
};
