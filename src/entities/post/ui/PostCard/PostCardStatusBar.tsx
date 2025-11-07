import clsx from 'clsx';
import { MessageCircle, Star, ThumbsUp } from 'lucide-react';

import { getTimeDifference } from '@/shared/lib';

import { Divider } from '@/shared';

import FormIcon from '../../../../../public/icons/form_icon.svg';
import VoteIcon from '../../../../../public/icons/vote_icon.svg';

interface PostCardStatusBarProps {
  post: Post.PostResponseDto;
}

export const PostCardStatusBar = ({ post }: PostCardStatusBarProps) => {
  const totalCount = (count: number) => {
    return count > 999 ? '999+' : count;
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-1 lg:gap-2">
        <div className="flex items-center gap-1 text-red-500 sm:gap-2">
          <ThumbsUp size={16} className="md:size-5" />
          <p className="text-sm md:text-xl">{totalCount(post.numLike)}</p>
        </div>
        <div className="hidden items-center gap-1 text-yellow-500 sm:flex">
          <Star size={16} className="md:size-5" />
          <p className="text-sm md:text-xl">{totalCount(post.numFavorite)}</p>
        </div>
        <div className="flex items-center gap-1 text-blue-300 sm:gap-2">
          <MessageCircle size={16} className="md:size-5" />
          <p className="text-sm md:text-xl">{totalCount(post.numComment)}</p>
        </div>
      </div>
      <Divider vertical />
      <div className="flex items-center gap-1">
        <VoteIcon
          className={clsx(
            post.isPostVote ? 'text-[#FFC71B]' : 'text-[#B4B1B1]',
            'h-4 w-4 md:h-5 md:w-5',
          )}
        />
        <FormIcon
          className={clsx(
            post.isPostForm ? 'text-[#FFC71B]' : 'text-[#B4B1B1]',
            'h-4 w-4 md:h-5 md:w-5',
          )}
        />
      </div>
      <Divider vertical />
      <div className="flex items-center text-center text-sm text-gray-300 md:text-xl">
        {getTimeDifference(post.createdAt)}
      </div>
      <Divider vertical />
      <div className="line-clamp-1 flex items-center text-center text-sm text-gray-300 md:text-xl">
        {post.displayWriterNickname
          ? post.displayWriterNickname
          : post.isAnonymous
            ? '익명'
            : post.writerNickname}
      </div>
    </div>
  );
};
