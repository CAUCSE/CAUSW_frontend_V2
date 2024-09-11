"use client"

import { useUserStore } from "@/shared";
import Image from "next/image";
import VotingSection from './VotingSection';

// 투표 / 사진 / 신청서??? 화면 이해가 진행되어야 할듯
// ++ 이거 버튼 조금 요청해야할듯 2개 잇는 거 이해 안됨
interface PostCardProps {
  postData: Post.PostDto;
  numLike: number;
  numFavorite: number;
  numComment: number;
  handlePostLike: () => void;
  handlePostFavorite: () => void;
  handlePostComment: () => void;
}


export const PostCard = (
{ 
  postData,
  numLike,
  numComment,
  numFavorite,
  handlePostLike,
  handlePostFavorite,
  handlePostComment,
}
:PostCardProps) => {

  const userImage = useUserStore((state) => state.profileImage);
  const postImage = useUserStore((state) => state.profileImage);

  return (
    <div className="relative flex flex-col bg-post border rounded-post-br mt-4 p-2 shadow-post-sh mb-4 max-w-xl">
      <button className="absolute top-3 right-3 flex items-center justify-center w-10 h-10">
          <Image
            src="/images/post/comment-menu.svg"
            alt="Comment Menu"
            width={4}
            height={4}
          ></Image>
        </button> 
      <div className="flex flex-row items-center">
        <div
          className="m-2 w-12 h-12 bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${userImage})` }}
        />
        <div className="flex flex-col items-start">
          <div className="flex items-center text-[16px] font-bold">  {postData.isAnonymous ? '익명' : postData.writerName}</div>
          <div className="text-gray-500 text-[14px]">{postData.updatedAt}</div>
        </div>
      </div>
      
      <div className="flex flex-col items-start px-5 lg:pl-16">
        <div className="mb-2 text-[20px] font-medium">
          {postData.title}
        </div>
        <div className="mb-2 text-[14px]">
          {postData.content}
        </div>

        {/* 나중에 투표 api 생기면 연결 */}
        {/* {hasVote 
        ? <div className="lg:pr-12 w-full">
            <VotingSection options={options} isMultiple={true} isAnonymous={true} onVote={handleVote} isResult={true} totalVotes={4} voteResult={[{ name: '1등', votes: 3 },{ name: '2등', votes: 1 },{ name: '3등', votes: 0 },]} /> 
          </div>
        : ''} */}

        <div 
          className="w-20 h-20 border rounded-lg mb-4"
          style={{ backgroundImage: `url(${postImage})` }}
        />
      </div>
      
      {/* 디자인 따라 위치 조정해야함 */}
      <div className="flex flex-row space-x-2 lg:pl-16">
        <button className="flex items-center bg-post-like space-x-2 p-1 px-3 rounded-post-br text-post-like text-[13px]" onClick={handlePostLike}>
          <Image
            src="/images/post/like.svg"
            alt="Like Icon"
            width={18}
            height={18}
          ></Image>
          <span>{numLike > 999 ? '999+' : numLike}</span>
        </button>
        <button className="flex items-center bg-post-star space-x-2 p-1 px-3 rounded-post-br text-post-star text-[13px]" onClick={handlePostFavorite} >
          <Image
            src="/images/post/star.svg"
            alt="Favorite Icon"
            width={18}
            height={18}
          ></Image>
          <span>{numFavorite  > 999 ? '999+' : numFavorite}</span>
        </button>
        <button className="flex items-center bg-post-comment space-x-2 p-1 px-3 rounded-post-br text-post-comment text-[13px]">
          <Image
            src="/images/post/comment.svg"
            alt="Comment Icon"
            width={18}
            height={18}
          ></Image>
          <span>{numComment  > 999 ? '999+' : numComment}</span>
        </button>
        <button className="flex items-center bg-post-form space-x-2 p-1 px-3 rounded-post-br text-black text-[12px]">
          <Image
            src="/images/post/form.svg"
            alt="Form Icon"
            width={18}
            height={18}
          ></Image>
          <span>form 작성</span>
        </button>
      </div>
    </div>
  );
};
