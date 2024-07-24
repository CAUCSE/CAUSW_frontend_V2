"use client"

import { useUserStore } from "@/shared";

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
    <div className="border border-black rounded-comment p-4 bg-white mb-4 flex items-start ">
      <div
        className="m-4 w-12 h-12 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${userImage})` }}
      />
      <div>
        <div className="font-bold mb-1">{username}</div>
        <div className="text-gray-700 mb-2">{comment}</div>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="flex items-center text-red-500">👍 {likes}</button>
          <button className="flex items-center text-yellow-500">👎 {dislikes}</button>
        </div>
      </div>
    </div>
  );
};
