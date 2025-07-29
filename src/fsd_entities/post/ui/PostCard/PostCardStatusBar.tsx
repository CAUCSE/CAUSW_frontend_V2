import clsx from 'clsx';
import { MessageCircle, Star, ThumbsUp } from 'lucide-react';

import { Divider } from '@/fsd_shared';
import { getTimeDifference } from '@/utils/format';

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
    <div className="flex items-center gap-2">
      <div className="flex gap-2 lg:gap-4">
        <div className="flex items-center gap-1 text-red-500 sm:gap-2">
          <ThumbsUp size={16} />
          <p className="">{totalCount(post.numLike)}</p>
        </div>
        <div className="hidden items-center gap-1 text-yellow-500 sm:flex">
          <Star size={16} />
          <p>{totalCount(post.numFavorite)}</p>
        </div>
        <div className="flex items-center gap-1 text-blue-300 sm:gap-2">
          <MessageCircle size={16} />
          <p>{totalCount(post.numComment)}</p>
        </div>
      </div>
      <Divider vertical />
      <div className="flex items-center gap-2">
        <VoteIcon className={clsx(post.isPostVote ? 'text-[#FFC71B]' : 'text-[#B4B1B1]', 'h-4 w-4')} />
        <FormIcon className={clsx(post.isPostForm ? 'text-[#FFC71B]' : 'text-[#B4B1B1]', 'h-4 w-4')} />
      </div>
      <Divider vertical />
      <div className="sm:text-md flex items-center text-center text-xs text-gray-300">
        {getTimeDifference(post.createdAt)}
      </div>
      <Divider vertical />
      <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
        {post.isAnonymous ? '익명' : post.writerNickname}
      </div>
    </div>
  );
};
