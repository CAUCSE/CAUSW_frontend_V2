'use client';

import { useEffect } from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { ImageList } from '@/shared/ui/ImageList';

import { usePostStore, useVoteStore, VoteRscService } from '@/shared';

import { PopupMenu } from './PopupMenu';
import VotingSection from './VotingSection';

// 투표 / 사진 / 신청서??? 화면 이해가 진행되어야 할듯
// ++ 이거 버튼 조금 요청해야할듯 2개 잇는 거 이해 안됨
interface PostCardProps {
  postData: Post.PostDto;
  numLike: number;
  numFavorite: number;
  numComment: number;
  isPostForm: boolean;
  formId: string;
  handlePostLike: () => void;
  handlePostFavorite: () => void;
  handleCommentBtn: () => void;
  handlePostDelete: () => void;
  hasVote: boolean;
  options: string[];
  toggleMenu: () => void;
  isPopupVisible: boolean;
}

const isImageFile = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp)$/.test(fileName);
};

export const PostCard = ({
  postData,
  numLike,
  numComment,
  numFavorite,
  isPostForm,
  formId,
  handlePostLike,
  handlePostFavorite,
  handleCommentBtn,
  handlePostDelete,
  toggleMenu,
  isPopupVisible,
}: PostCardProps) => {
  const userImage = postData.isAnonymous ? '/images/default_profile.png' : postData.writerProfileImage;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  const { vote, totalVote, voteOptions, votedMostOptions, castVote, cancelVote, endVote } = useVoteStore();

  const handleCastVote = async (selectedOptions: string[]) => {
    try {
      const options: Post.CastVoteDto = {
        voteOptionIdList: selectedOptions,
      };
      const castVoteResponse = await VoteRscService().castVote(options);
      castVote(selectedOptions);
    } catch (error) {
      cancelVote(selectedOptions);
    }
  };

  //const {isPopupVisible} = usePostStore();
  const router = useRouter();
  const params = useParams();

  const { boardId, postId } = params;

  const popMenuList = [
    { message: '게시물 삭제', handleBtn: handlePostDelete },
    ...(postData.isOwner && postData.isPostForm
      ? [
          {
            message: '신청 현황 보기',
            handleBtn: () => router.push(`/board/${boardId}/${postId}/formInfo/${formId}`),
          },
        ]
      : []),
  ];

  return (
    <div className="relative mb-4 mt-4 flex max-w-xl flex-col rounded-post-br border bg-post p-2 shadow-post-sh">
      {isPopupVisible && (
        <div>
          <PopupMenu PopupMenuChildren={popMenuList} />
        </div>
      )}
      <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center" onClick={toggleMenu}>
        <Image src="/images/post/comment-menu.svg" alt="Comment Menu" width={4} height={4}></Image>
      </button>
      <div className="flex flex-row items-center p-2">
        <Image
          src={userImage ?? '/images/default_profile.png'}
          alt="Comment Profile"
          width={80}
          height={80}
          className="m-2 bg-contain bg-center bg-no-repeat"
        />
        <div className="flex flex-col items-start">
          <div className="flex items-center text-[16px] font-bold">
            {' '}
            {postData.isAnonymous ? '익명' : postData.writerNickname}
          </div>
          <div className="text-[14px] text-gray-500">{postData.updatedAt}</div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start px-3">
        <div className="w-full">
          <div className="mb-2 select-text px-1 text-[24px] font-medium">
            {postData.isQuestion ? '[질문] ' : ''}
            {postData.title}
          </div>
          <div className="mb-2 select-text whitespace-pre-line break-words px-1 pb-2 text-[16px]">
            {postData.content}
          </div>

          {/* 나중에 투표 api 생기면 연결 */}
          {postData.isPostVote ? (
            <div className="flex w-full lg:pr-12">
              <VotingSection onVote={handleCastVote} />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="relative">
          <ImageList images={postData.fileUrlList} imageSize={90} />
        </div>
      </div>

      {/* 디자인 따라 위치 조정해야함 */}
      <div className="flex flex-row space-x-3 p-2">
        <button
          className="flex items-center space-x-2 rounded-post-br bg-post-like p-1 px-3 text-[13px] text-post-like"
          onClick={handlePostLike}
        >
          <Image src="/images/post/like.svg" alt="Like Icon" width={20} height={20}></Image>
          <span>{numLike > 999 ? '999+' : numLike}</span>
        </button>
        <button
          className="flex items-center space-x-2 rounded-post-br bg-post-star p-1 px-3 text-[13px] text-post-star"
          onClick={handlePostFavorite}
        >
          <Image src="/images/post/star.svg" alt="Favorite Icon" width={20} height={20}></Image>
          <span>{numFavorite > 999 ? '999+' : numFavorite}</span>
        </button>
        <button
          className="flex items-center space-x-2 rounded-post-br bg-post-comment p-1 px-3 text-[13px] text-post-comment"
          onClick={handleCommentBtn}
        >
          <Image src="/images/post/comment.svg" alt="Comment Icon" width={20} height={20}></Image>
          <span>{numComment > 999 ? '999+' : numComment}</span>
        </button>
        {isPostForm && (
          <button
            className="flex items-center space-x-2 rounded-post-br bg-post-form p-1 px-3 text-[12px] text-black"
            onClick={() => {
              router.push(`/board/${boardId}/${postId}/${formId}`);
            }}
          >
            <Image src="/images/post/form.svg" alt="Form Icon" width={20} height={20}></Image>
            <span>form 작성</span>
          </button>
        )}
      </div>
    </div>
  );
};
