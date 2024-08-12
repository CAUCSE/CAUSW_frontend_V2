"use client"

import { useUserStore } from "@/shared";

// 여기도 좋아요 싫어요 디자인 문의하기
interface CommentCardProps {
  userImage?: string;
  username: string;
  comment: string;
  likes: number;
  dislikes: number;
}

// max-w-md mx-auto space-x-4
export const CommentCard = ({ userImage, username, comment, likes, dislikes }: CommentCardProps) => {
  userImage = useUserStore((state) => state.profileImage);
  return (
    <div className="flex flex-col border-black border-comment-bw rounded-comment-br p-1 bg-white mb-4 max-w-sm">
      
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
  );
};
