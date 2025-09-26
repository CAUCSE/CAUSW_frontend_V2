'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

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
      className="flex h-29.5 w-full items-center rounded-xl bg-white px-2.5 py-4 shadow-lg sm:h-42 md:p-6"
      onClick={() => {
        targetUrl ? router.push(targetUrl) : router.push(`${pathname}/${post.id}`);
      }}
    >
      <div className="flex h-full w-full items-center justify-between gap-1.5 sm:gap-3">
        <div className="grid h-full w-59 grid-rows-[1fr_1.5rem] sm:w-7/8">
          <p className="text-xl font-bold md:text-[32px]">{post.title}</p>
          <PostCardStatusBar post={post} />
        </div>
        <div className="h-24 w-24 overflow-hidden rounded-xl sm:h-30 sm:w-30">
          {post.postAttachImage ? (
            <Image
              src={post.postAttachImage}
              alt="post_thumbnail"
              width={120}
              height={120}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="h-full w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};
