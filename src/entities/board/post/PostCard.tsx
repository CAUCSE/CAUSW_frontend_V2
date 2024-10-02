"use client"

import { usePostStore, useVoteStore, VoteRscService } from "@/shared";
import Image from "next/image";
import { PopupMenu } from "./PopupMenu";
import VotingSection from './VotingSection';
import { useState } from "react";
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
  handlePostDelete: () => void; 
  toggleMenu: () => void;
  isPopupVisible: boolean;
}

const isImageFile = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp)$/.test(fileName);
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
  toggleMenu,
  isPopupVisible
}
:PostCardProps) => {
  const userImage = postData.writerProfileImage ?? "/images/default_profile.png";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState<string | null>(null);

  const { 
    vote, 
    totalVote, 
    voteOptions,
    votedMostOptions, 
    castVote,
    cancelVote, 
    endVote
  } = useVoteStore();

  const handleCastVote = async (selectedOptions: string[]) => {
    try {
      const options: Post.CastVoteDto = {
        voteOptionIdList: selectedOptions
      }
      const castVoteResponse = await VoteRscService().castVote(options);
      castVote(selectedOptions);
      console.log('투표완료: ', castVoteResponse);
    }catch(error){
      cancelVote(selectedOptions);
      console.error("투표 처리 에러: ", error);
    }
  }

  const handleImageClick = (imageUrl: string) => {
    setPopupImage(imageUrl);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupImage(null);
  };

  const handleDownload = (fileUrl: string) => {
    console.log(fileUrl);
    const link = document.createElement("a");
    //link.href = fileUrl;
    //link.download = extractFileName(fileUrl); // 파일명 설정
    //link.click();
  };

  //const {isPopupVisible} = usePostStore();
  return (
    <div className="relative flex flex-col bg-post border rounded-post-br mt-4 p-2 shadow-post-sh mb-4 max-w-xl">
      {isPopupVisible ? <PopupMenu
        message="게시글 삭제"
        handleBtn={handlePostDelete}
      />: ''}
      <button 
        className="absolute top-3 right-3 flex items-center justify-center w-10 h-10"
        onClick={toggleMenu}
      >
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
      
      <div className="flex flex-col w-full items-start px-3">
        <div className="w-full">
          <div className="mb-2 text-[24px] font-medium px-1">
            {postData.title}
          </div>
          <div className="mb-2 text-[16px] px-1 pb-2">
            {postData.content}
          </div>

          {/* 나중에 투표 api 생기면 연결 */}
          {postData.isPostVote 
          ? <div className="lg:pr-12 flex w-full">
              <VotingSection 
                onVote={handleCastVote} /> 
            </div>
          : ''}
        </div>
        
        <div className="relative">
          <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto w-full scrollbar-hide pb-3">
            {postData.fileUrlList.map((attachment, index) =>
              isImageFile(attachment) ? (
                <div
                  key={index}
                  className="w-20 h-20 w-min-20 h-min-20 bg-center bg-cover border border-black"
                  style={{ backgroundImage: `url(${attachment})` }}
                  onClick={() => handleImageClick(attachment)}
                />
              ) : (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-20 h-20 w-min-20 h-min-20 border border-black p-2 space-y-2"
                  onClick={() => handleDownload(attachment)}
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
          {isPopupOpen && popupImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <div className="relative w-auto h-auto">
                  <Image
                    src={popupImage}
                    alt="Preview Image"
                    width={300} // 기본 너비를 지정합니다. 필요시 조정
                    height={300} // 기본 높이를 지정합니다. 필요시 조정
                    objectFit="contain" // 원본 비율 유지
                    unoptimized
                  />
                </div>
                <button
                  onClick={handleClosePopup}
                  className="absolute flex items-center justify-center top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 p-2 hover:bg-gray-700"
                >
                  x
                </button>
              </div>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={handleClosePopup}
              ></div>
            </div>
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

