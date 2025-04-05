'use client';

import Image from 'next/image';

import { getTimeDifference } from '@/utils/format';

import { PopupMenu } from './PopupMenu';

// 여기도 좋아요 싫어요 디자인 문의하기
interface ChildCommentCardProps {
  childComment: ChildComment.ChildCommentDto;
  numLike: number;
  isDeleted: boolean;
  isPopupVisible: boolean;
  handleChildCommentLike: () => void;
  handleChildCommentToggle: () => void;
  handleDeleteChildComment: () => void;
}

export const ChildCommentCard = ({
  childComment,
  numLike,
  isDeleted,
  isPopupVisible,
  handleChildCommentLike,
  handleChildCommentToggle,
  handleDeleteChildComment,
}: ChildCommentCardProps) => {
  const isAnon = childComment.isAnonymous;
  const writerProfileImage = childComment.isAnonymous ? '/images/default_profile.png' : childComment.writerProfileImage;
  const handleLike = () => {
    if (!isDeleted) {
      handleChildCommentLike();
    }
  };

  const popMenuList = [{ message: '댓글 삭제', handleBtn: handleDeleteChildComment }];
  return (
    <div className="flex flex-row items-center justify-start space-x-4">
      <div className="p-2">
        <Image src="/images/post/child-comment.svg" alt="Child Comment" width={25} height={25}></Image>
      </div>
      <div className="relative mb-4 flex w-full max-w-sm flex-grow flex-col rounded-post-br border bg-white pb-2 shadow-post-sh">
        <button
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center"
          onClick={handleChildCommentToggle}
        >
          <Image src="/images/post/comment-menu.svg" alt="Comment Menu" width={4} height={4}></Image>
        </button>
        {isPopupVisible ? <PopupMenu PopupMenuChildren={popMenuList} /> : ''}
        <div className="mb-1 flex flex-row items-center px-2">
          <Image
            src={writerProfileImage ?? '/images/default_profile.png'}
            alt="Comment Profil"
            width={50}
            height={50}
            className="m-2 bg-contain bg-center bg-no-repeat"
          />
          <div className="flex flex-col items-start">
            <div className="flex items-center text-[16px] font-bold">
              {' '}
              {childComment.isAnonymous ? '익명' : childComment.writerNickname}
            </div>
            <div className="text-[14px] text-gray-500">{getTimeDifference(childComment.createdAt)}</div>
          </div>
        </div>

        <div className="mb-1 px-8 text-[14px]">{isDeleted ? '삭제된 댓글입니다.' : childComment.content}</div>

        <button
          className="flex flex-row items-center justify-start space-x-3 px-8 py-1 text-[13px] text-post-like"
          onClick={handleLike}
        >
          <Image src="/images/post/like.svg" alt="Like Icon" width={20} height={20}></Image>
          <span>{numLike > 999 ? '999+' : numLike}</span>
        </button>
        <button
          className="absolute bottom-3 right-10 flex flex-row items-center justify-between space-x-3 rounded-comment-br bg-comment-btn px-2.5 py-1.5"
          onClick={handleLike}
        >
          <Image
            src="/images/post/comment-like.svg"
            alt="Like Icon"
            width={18}
            height={18}
            className="items-center"
          ></Image>
        </button>
      </div>
    </div>
  );
};
