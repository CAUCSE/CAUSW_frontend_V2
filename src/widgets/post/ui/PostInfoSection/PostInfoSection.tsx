import { PostWriterProfileImage } from '@/entities/post';

import { getTimeDifference } from '@/shared/lib';

interface PostInfoSectionProps {
  writerProfileImage: Post.PostDto['writerProfileImage'];
  writerNickname: Post.PostDto['writerNickname'];
  updatedAt: Post.PostDto['updatedAt'];
}

export const PostInfoSection = ({
  writerProfileImage,
  writerNickname,
  updatedAt,
}: PostInfoSectionProps) => {
  return (
    <section className="flex items-center gap-2 p-2">
      <PostWriterProfileImage
        profileImage={writerProfileImage ?? '/images/default_profile.png'}
        nickname={writerNickname}
      />
      <div className="flex flex-col items-start">
        <p className="text-base font-semibold">{writerNickname}</p>
        <p className="text-sm text-gray-500">{getTimeDifference(updatedAt)}</p>
      </div>
    </section>
  );
};
