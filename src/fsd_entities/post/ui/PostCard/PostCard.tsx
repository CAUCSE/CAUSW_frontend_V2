'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { PostCardContent } from './PostCardContent';
import { PostCardStatusBar } from './PostCardStatusBar';

interface PostCardProps {
  post: Post.PostResponseDto;
  targetUrl?: string;
}

export const PostCard = ({ post, targetUrl }: PostCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex max-h-44 w-full items-center rounded-xl bg-white p-4 shadow-lg lg:p-6"
      onClick={() => {
        targetUrl ? router.push(targetUrl) : router.push(`${pathname}/${post.id}`);
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <PostCardContent post={post} />
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden sm:h-24 sm:w-24">
            {post.postAttachImage && (
              <Image
                src={post.postAttachImage}
                alt="post_thumbnail"
                width={100}
                height={100}
                className="object-cover"
              />
            )}
          </div>
        </div>
        <PostCardStatusBar post={post} />
      </div>
    </div>
  );
};
