"use client"

import { useUserStore } from "@/shared";
import Image from "next/image";

// 여기도 좋아요 싫어요 디자인 문의하기
interface ChildCommentCardProps {
  userImage?: string;
  username: string;
  comment: string;
  likes: number;
  dislikes: number;
}

// max-w-md mx-auto space-x-4
export const ChildCommentCard = ({ userImage, username, comment, likes, dislikes }: CommentCardProps) => {
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
        <div className="flex flex-col w-full bg-child-comment border-black border-comment-bw rounded-comment-br p-1 bg-white mb-4">  
          <div className="flex flex-row items-center px-2 mb-1">
            <div
              className="m-2 w-10 h-10 bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${userImage})` }}
            />
            <div className="font-bold">{username}</div>
          </div>

          <div className="text-gray-700 mb-1 px-10">{comment}</div>
          
          <div className="flex items-center space-x-6 text-gray-500 px-10">
            <button className="flex items-center text-red-500">👍 {likes}</button>
            <button className="flex items-center text-blue-500">👎 {dislikes}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
