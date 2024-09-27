"use client"

import { useUserStore } from "@/shared";
import Image from "next/image";
import { PopupMenu } from "./PopupMenu";
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
  handleCommentBtn: () => void;
  handlePostDelete: () => {};
  hasVote: boolean;
  options: string[]; 
}

const isImageFile = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(fileName);
};

const extractFileName = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
}

export const PostCard = (
{ 
  postData,
  numLike,
  numComment,
  numFavorite,
  handlePostLike,
  handlePostFavorite,
  handleCommentBtn,
  handlePostDelete,
  hasVote,
  options
}
:PostCardProps) => {

  const defaultAttachmentList: Array<string> = [
    'http://example.com/file1.jpg',
    'http://example.com/file2.pdf',
    'http://example.com/file3.docx',
    'http://example.com/file4.xlsx',
    'http://example.com/file5.png',
    'http://example.com/file6.zip',
    'http://example.com/file1.jpg',
    'http://example.com/file2.pdf',
    'http://example.com/file3.docx',
    'http://example.com/file4.xlsx',
    'http://example.com/file5.png',
    'http://example.com/file6.zip',
  ];
  const attachmentList = defaultAttachmentList;
  
  const userImage = postData.writerProfileImage ?? "/images/default_profile.png";

  return (
    <div className="relative flex flex-col bg-post border rounded-post-br mt-4 p-2 shadow-post-sh mb-4 max-w-xl">
      <PopupMenu
        message="게시글 삭제"
        handleBtn={handlePostDelete}
      />
      <button className="absolute top-3 right-3 flex items-center justify-center w-10 h-10">
        <Image
          src="/images/post/comment-menu.svg"
          alt="Comment Menu"
          width={4}
          height={4}
        ></Image>
      </button> 
      <div className="flex flex-row items-center p-2">
        <Image
          src = {userImage}
          alt = "Comment Profil"
          width={80}
          height={80}
          className="m-2 bg-center bg-no-repeat bg-contain"
        />
        <div className="flex flex-col items-start">
          <div className="flex items-center text-[16px] font-bold">  {postData.isAnonymous ? '익명' : postData.writerName}</div>
          <div className="text-gray-500 text-[14px]">{postData.updatedAt}</div>
        </div>
      </div>
      
      <div className="flex flex-col items-start px-3">
        <div>
          <div className="mb-2 text-[24px] font-medium px-1">
            {postData.title}
          </div>
          <div className="mb-2 text-[16px] px-1 pb-2">
            {postData.content}
          </div>

          {/* 나중에 투표 api 생기면 연결 */}
          {/* {hasVote 
          ? <div className="lg:pr-12 w-full">
              <VotingSection options={options} isMultiple={true} isAnonymous={true} onVote={(options)=>{}} isResult={true} totalVotes={4} voteResult={[{ name: '1등', votes: 3 },{ name: '2등', votes: 1 },{ name: '3등', votes: 0 },]} /> 
            </div>
          : ''} */}
        </div>
        

        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto w-full scrollbar-hide pb-3">
          {attachmentList.map((attachment, index) =>
            isImageFile(attachment) ? (
              <div
                key={index}
                className="w-20 h-20 w-min-20 h-min-20 bg-center bg-cover border border-black"
                style={{ backgroundImage: `url(${attachment})` }}
              />
            ) : (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-20 h-20 w-min-20 h-min-20 border border-black p-2 space-y-2"
              >
                <Image
                  src="/images/post/file-icon.svg"
                  alt={extractFileName(attachment)}
                  width={30}
                  height={30}
                />
                <span className="text-[10px]">{extractFileName(attachment)}</span>
              </div>
            )
          )}
        </div>
      </div>
      
      {/* 디자인 따라 위치 조정해야함 */}
      <div className="flex flex-row space-x-3 p-2">
        <button className="flex items-center bg-post-like space-x-2 p-1 px-3 rounded-post-br text-post-like text-[13px]" onClick={handlePostLike}>
          <Image
            src="/images/post/like.svg"
            alt="Like Icon"
            width={20}
            height={20}
          ></Image>
          <span>{numLike > 999 ? '999+' : numLike}</span>
        </button>
        <button className="flex items-center bg-post-star space-x-2 p-1 px-3 rounded-post-br text-post-star text-[13px]" onClick={handlePostFavorite} >
          <Image
            src="/images/post/star.svg"
            alt="Favorite Icon"
            width={20}
            height={20}
          ></Image>
          <span>{numFavorite  > 999 ? '999+' : numFavorite}</span>
        </button>
        <button className="flex items-center bg-post-comment space-x-2 p-1 px-3 rounded-post-br text-post-comment text-[13px]" onClick={handleCommentBtn}>
          <Image
            src="/images/post/comment.svg"
            alt="Comment Icon"
            width={20}
            height={20}
          ></Image>
          <span>{numComment  > 999 ? '999+' : numComment}</span>
        </button>
        <button className="flex items-center bg-post-form space-x-2 p-1 px-3 rounded-post-br text-black text-[12px]">
          <Image
            src="/images/post/form.svg"
            alt="Form Icon"
            width={20}
            height={20}
          ></Image>
          <span>form 작성</span>
        </button>
      </div>
    </div>
  );
};

