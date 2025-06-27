'use client';

import { useMemo } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { MessageCircle, Pen, Star, ThumbsUp } from 'lucide-react';

import { PostActionBar } from '@/fsd_widgets/post/ui/PostActionBar';

import { Button } from '@/shadcn/components/ui';

import { PostActionDropdown } from '../PostActionDropdown';
import { PostContentSection } from '../PostContentSection';
import { PostInfoSection } from '../PostInfoSection';

interface PostDetailSectionProps {
  postData: Post.PostDto;
}

export const PostDetailSection = ({ postData }: PostDetailSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const totalCount = useMemo(() => (count: number) => (count > 999 ? '999+' : count), []);

  return (
    <section className="rounded-post-br bg-post shadow-post-sh relative mt-4 mb-4 flex max-w-xl flex-col border p-2">
      <PostActionDropdown
        postId={postData.id}
        isPostSubscribed={postData.isPostSubscribed}
        isOwner={postData.isOwner}
        isPostForm={postData.isPostForm}
        formData={postData.formResponseDto}
      />
      <PostInfoSection
        writerProfileImage={postData.writerProfileImage ?? '/images/default_profile.png'}
        writerNickname={postData.isAnonymous ? '익명' : postData.writerNickname}
        updatedAt={postData.updatedAt}
      />
      <PostContentSection
        postTitle={postData.title}
        postContent={postData.content}
        isPostVote={postData.isPostVote}
        fileUrlList={postData.fileUrlList}
        voteData={postData.voteResponseDto!}
      />
      <PostActionBar
        numLike={postData.numLike}
        numFavorite={postData.numFavorite}
        numComment={postData.numComment}
        isPostForm={postData.isPostForm}
        formResponseDto={postData.formResponseDto}
      />
    </section>
  );
};
