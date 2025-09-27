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
      className="flex h-[118px] w-full items-center rounded-lg bg-white p-4 shadow-lg sm:h-[168px] md:p-6"
      onClick={() => {
        targetUrl ? router.push(targetUrl) : router.push(`${pathname}/${post.id}`);
      }}
    >
      <div className="grid h-full w-full grid-rows-[1fr_1.5rem]">
        <div className="flex h-15 w-full justify-between md:h-21.25">
          <p className="line-clamp-2 overflow-hidden text-xl font-bold break-all md:text-[32px]">{post.title}</p>
          <div className="h-15 w-15 shrink-0 overflow-hidden rounded-lg sm:h-30 sm:w-30">
            {post.postAttachImage && (
              <Image
                src={post.postAttachImage}
                alt="post_thumbnail"
                width={120}
                height={120}
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
