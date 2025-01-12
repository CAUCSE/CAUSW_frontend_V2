"use client"

import { useUserStore } from "@/shared";
import Image from "next/image";
import { PopupMenu } from "./PopupMenu";

// 여기도 좋아요 싫어요 디자인 문의하기
interface ChildCommentCardProps {
  childComment: ChildComment.ChildCommentDto
  numLike: number;
  isDeleted: boolean;
  isPopupVisible:boolean;
  handleChildCommentLike: () => void;
  handleChildCommentToggle: () => void;
  handleDeleteChildComment: () => void;
}

export const ChildCommentCard = ({ childComment, numLike, isDeleted, isPopupVisible, handleChildCommentLike,handleChildCommentToggle, handleDeleteChildComment }: ChildCommentCardProps) => {
  const isAnon = childComment.isAnonymous;
  const writerProfileImage = childComment.isAnonymous ? "/images/default_profile.png" : childComment.writerProfileImage;
  console.log(isAnon);
  console.log(writerProfileImage);
  const handleLike = () => {
    if(!isDeleted){
      handleChildCommentLike();
    }
  }
  const getTimeDifference = (ISOtime: string) => {
    const createdTime = new Date(ISOtime);
    const now = new Date();
    const diffMSec = now.getTime() - createdTime.getTime();
    const diffMin = Math.round(diffMSec / (60 * 1000));
    if (diffMin === 0) {
      return `방금 전`;
    } else if (diffMin < 60) {
      return `${diffMin}분 전`;
    } else if (
      now.getFullYear() === createdTime.getFullYear() &&
      now.getMonth() === createdTime.getMonth() &&
      now.getDate() === createdTime.getDate()
    ) {
      return `${createdTime.getHours()}:${createdTime.getMinutes()}`;
    } else if (now.getFullYear() === createdTime.getFullYear()) {
      return `${createdTime.getMonth() + 1}/${createdTime.getDate()}`;
    } else {
      return `${now.getFullYear() - createdTime.getFullYear()}년 전`;
    }
  };
  const popMenuList = [
    { message: "댓글 삭제", handleBtn: handleDeleteChildComment },
  ];
  return (
    <div className=" flex flex-row items-center justify-start space-x-4">
      <div className="p-2">
        <Image
          src="/images/post/child-comment.svg"
          alt="Child Comment"
          width={25}
          height={25}
        ></Image>
      </div>
      <div className="relative flex flex-col w-full border shadow-post-sh rounded-post-br bg-white pb-2 mb-4 flex flex-grow max-w-sm">
        <button className="absolute top-3 right-3 flex items-center justify-center w-10 h-10" onClick={handleChildCommentToggle}>
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
            src = {writerProfileImage ?? "/images/default_profile.png"}
            alt = "Comment Profil"
            width={50}
            height={50}
            className="m-2 bg-center bg-no-repeat bg-contain"
          />
          <div className="flex flex-col items-start">
            <div className="flex items-center text-[16px] font-bold">
              {" "}
              {childComment.isAnonymous ? "익명" : childComment.writerNickname}
            </div>
            <div className="text-[14px] text-gray-500">{getTimeDifference(childComment.createdAt)}</div>
          </div>
        </div>

        <div className="mb-1 px-8 text-[14px]">{isDeleted ? "삭제된 댓글입니다.":childComment.content}</div>
        
        <button className="flex flex-row justify-start items-center space-x-3 py-1 px-8 text-post-like text-[13px]" onClick={handleLike}>
          <Image
            src="/images/post/like.svg"
            alt="Like Icon"
            width={20}
            height={20}
          ></Image>
          <span>{numLike > 999 ? '999+' : numLike}</span>
        </button>
        <button className="absolute flex flex-row items-center justify-between space-x-3 px-2.5 py-1.5 bottom-3 right-10  bg-comment-btn rounded-comment-br" onClick={handleLike}>
          <Image
            src="/images/post/comment-like.svg"
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
