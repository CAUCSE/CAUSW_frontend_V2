'use client';

import Image from 'next/image';

import { useCommentStore, usePostStore } from '@/shared';
import { getTimeDifference } from '@/utils/format';

import { PopupMenu } from './PopupMenu';

// 여기도 좋아요 싫어요 디자인 문의하기
interface CommentCardProps {
  comment: Comment.CommentDto;
  numLike: number;
  overlayActive: boolean;
  isDeleted: boolean;
  isPopupVisible: boolean;
  handleCommentToggle: () => void;
  handleCommentLike: () => void;
  handleDeleteComment: () => void;
}

export const CommentCard = ({
  comment,
  numLike,
  overlayActive,
  isPopupVisible,
  isDeleted,
  handleCommentToggle,
  handleCommentLike,
  handleDeleteComment,
}: CommentCardProps) => {
  const { toggleCommentOverlay } = useCommentStore();
  const { setCommentInfo: setChildComment } = usePostStore();
  const writerProfileImage = comment.isAnonymous ? '/images/default_profile.png' : comment.writerProfileImage;
  const handleOverlayToggle = () => {
    if (!isDeleted) {
      setChildComment(comment.id);
      toggleCommentOverlay(comment.id);
    }
  };

  const handleLike = () => {
    if (!isDeleted) {
      handleCommentLike();
    }
  };

  const popMenuList = [{ message: '댓글 삭제', handleBtn: handleDeleteComment }];
  return (
    <div
      className={`relative flex flex-col rounded-post-br border pb-2 shadow-post-sh ${overlayActive ? 'bg-overlay-bg' : 'bg-white'} mb-4 max-w-sm`}
    >
      <button
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center"
        onClick={handleCommentToggle}
      >
        <Image src="/images/post/comment-menu.svg" alt="Comment Menu" width={4} height={4}></Image>
      </button>
      {isPopupVisible ? <PopupMenu PopupMenuChildren={popMenuList} /> : ''}

      <div className="mb-1 flex flex-row items-center px-2">
        <Image
          src={writerProfileImage ?? '/images/default_profile.png'}
          alt="Comment Profile"
          width={50}
          height={50}
          className="m-2 bg-contain bg-center bg-no-repeat"
        />
        <div className="flex flex-col items-start">
          <div className="flex items-center text-[16px] font-bold">
            {' '}
            {comment.isAnonymous ? '익명' : comment.writerNickname}
          </div>
          <div className="text-[14px] text-gray-500">{getTimeDifference(comment.createdAt)}</div>
        </div>
      </div>

      <div className="mb-1 px-8 text-[16px]">{isDeleted ? '삭제된 댓글입니다.' : comment.content}</div>

      <button
        className="flex flex-row items-center justify-start space-x-3 px-8 py-1 text-[13px] text-post-like"
        onClick={handleLike}
      >
        <Image src="/images/post/like.svg" alt="Like Icon" width={20} height={20}></Image>
        <span>{numLike > 999 ? '999+' : numLike}</span>
      </button>

      <div
        className={`absolute bottom-3 right-10 flex flex-row items-center justify-between space-x-3 px-2.5 py-1.5 ${overlayActive ? 'bg-overlay-btn' : 'bg-comment-btn'} rounded-comment-br`}
      >
        <button onClick={handleLike}>
          <Image
            src="/images/post/comment-like.svg"
            alt="Like Icon"
            width={18}
            height={18}
            className="items-center"
          ></Image>
        </button>
        <Image
          src="/images/post/comment-divide.svg"
          alt="Like Icon"
          width={3}
          height={10}
          className="items-center"
        ></Image>
        <button onClick={handleOverlayToggle}>
          <Image
            src="/images/post/comment-comment.svg"
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
