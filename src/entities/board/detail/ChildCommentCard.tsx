"use client"

import { useUserStore } from "@/shared";
import Image from "next/image";

// 여기도 좋아요 싫어요 디자인 문의하기
interface ChildCommentCardProps {
  userImage?: string;
  username: string;
  content: string;
  likes: number;
}

// max-w-md mx-auto space-x-4
export const ChildCommentCard = ({ userImage, username, content, likes }: ChildCommentCardProps) => {
  userImage = useUserStore((state) => state.profileImage);
  return (
    <div className=" flex flex-row items-center justify-start space-x-4">
      <Image
        src="/images/post/child-comment.svg"
        alt="Child Comment"
        width={20}
        height={20}
      ></Image>
      <div className="flex flex-grow max-w-sm">
        <div className="relative flex flex-col w-full bg-child-comment border-black border-comment-bw rounded-comment-br p-1 pb-2 bg-white mb-4"> 
          <div className="absolute top-3 right-3 flex items-center justify-center w-10 h-10">
            <Image
              src="/images/post/comment-menu.svg"
              alt="Comment Menu"
              width={4}
              height={4}
            ></Image>
          </div> 
          <div className="flex flex-row items-center px-2 mb-1">
            <div
              className="m-2 w-10 h-10 bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${userImage})` }}
            />
            <div className="font-bold">{username}</div>
          </div>

          <div className="text-gray-700 mb-1 px-10">{content}</div>
          
          <button className="flex flex-row justify-start items-center space-x-3 px-10 text-post-like">
            <Image
              src="/images/post/like.svg"
              alt="Like Icon"
              width={20}
              height={20}
            ></Image>
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
