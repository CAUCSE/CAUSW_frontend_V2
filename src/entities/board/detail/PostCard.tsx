"use client"

import { useUserStore } from "@/shared";

// 투표 / 사진 / 신청서??? 화면 이해가 진행되어야 할듯
// ++ 이거 버튼 조금 요청해야할듯 2개 잇는 거 이해 안됨
interface PostCardProps {
  userImage?: string;
  username: string;
  timeAgo: string;
  hashtags: string[];
  content: string;
  postImage?: string;
  likes: number;
  stars: number;
  comments: number;
}


export const PostCard = ({ userImage, username, timeAgo, hashtags, content, postImage, likes, stars, comments }: PostCardProps) => {
  userImage = useUserStore((state) => state.profileImage);
  postImage = useUserStore((state) => state.profileImage);
  return (
    <div className="flex flex-col bg-post border rounded-post-br mt-4 p-4 shadow-post-sh mb-4 max-w-xl">
      {/* 해시태그 전체 밑줄 되어야 함 */}
      <div className="flex px-16 items-start underline">
        {hashtags.map((tag, index) => (
          <span key={index} className="text-post-hashtag mr-2">#{tag}</span>
        ))}  
      </div>

      <div className="flex flex-row items-center mb-4">
        <div
          className="m-2 w-12 h-12 bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${userImage})` }}
        />
        <div className="flex flex-col items-start">
          <div className="flex items-center font-bold">{username}</div>
          <div className="text-gray-500 text-sm">{timeAgo}</div>
        </div>
      </div>
      
      <div className="flex flex-col items-start px-16">
        <div className="mb-2">
          {content}
        </div>
        <div 
          className="w-20 h-20 border rounded-lg mb-4"
          style={{ backgroundImage: `url(${postImage})` }}
        />
      </div>
      
      {/* 디자인 따라 위치 조정해야함 */}
      <div className="flex flex-row space-x-4 px-16">
        <button className="flex items-center bg-red-100 p-1 px-2 rounded-post-br text-red-500">👍 {likes}</button>
        <button className="flex items-center bg-yellow-100 p-1 px-2 rounded-post-br text-yellow-500">⭐ {stars}</button>
        <button className="flex items-center bg-blue-100 p-1 px-2 rounded-post-br text-blue-500">💬 {comments}</button>
      </div>
    </div>
  );
};

