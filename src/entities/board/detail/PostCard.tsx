"use client"

import { useUserStore } from "@/shared";

interface PostCardProps {
  userImage?: string;
  username: string;
  timeAgo: string;
  hashtags: string[];
  content: string;
  postImage?: string;
  likeCnt: number;
  starCnt: number;
  commentCnt: number;
}


export const PostCard: React.FC<PostCardProps> = ({ userImage, username, timeAgo, hashtags, content, postImage, likeCnt, starCnt, commentCnt }) => {
  userImage = useUserStore((state) => state.profileImage);
  postImage = useUserStore((state) => state.profileImage);
  return (
    <div className="bg-post mx-auto border border-gray-300 rounded-lg p-4 shadow-post mb-4">
      <div className="flex items-center mb-4">
        <div
          className="m-4 w-12 h-12 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${userImage})` }}
        />
        <div>
          {/* 해시태그 전체 밑줄 되어야 함 */}
          <div className="flex items-center mb-2 underline">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-post-hashtag mr-2">#{tag}</span>
            ))}  
          </div>
          <div className="font-bold">{username}</div>
          <div className="text-gray-500 text-sm">{timeAgo}</div>
        </div>
      </div>
      <div className="mb-4">
        {content}
      </div>
      <div 
        className="w-500 h-300 rounded-lg mb-4 w-full"
        style={{ backgroundImage: `url(${postImage})` }}
      />
      {/* 디자인 따라 위치 조정해야함 */}
      <div className="flex space-x-4">
        <button className="flex items-center text-red-500">👍 {likeCnt}</button>
        <button className="flex items-center text-yellow-500">⭐ {starCnt}</button>
        <button className="flex items-center text-blue-500">💬 {commentCnt}</button>
      </div>
    </div>
  );
};
