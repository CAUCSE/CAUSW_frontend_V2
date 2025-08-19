import Image from 'next/image';

import { getTimeDifference } from '@/utils/format';

interface CommentInfoSectionProps {
  writerProfileImage: Comment.CommentDto['writerProfileImage'];
  writerNickname: Comment.CommentDto['writerNickname'];
  isAnonymous: Comment.CommentDto['isAnonymous'];
  createdAt: Comment.CommentDto['createdAt'];
}

export const CommentInfoSection = ({
  writerProfileImage,
  writerNickname,
  isAnonymous,
  createdAt,
}: CommentInfoSectionProps) => {
  return (
    <section className="flex items-center gap-2">
      <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
        <Image
          src={writerProfileImage ?? '/images/default_profile.png'}
          alt="Comment Profile"
          width={50}
          height={50}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-center text-base font-bold">{writerNickname}</div>
        <div className="text-sm text-gray-500">{getTimeDifference(createdAt)}</div>
      </div>
    </section>
  );
};
