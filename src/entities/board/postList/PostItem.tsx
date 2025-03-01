"use client";

import { PostItemContent, PostItemStatusBar } from "@/entities";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostItemProps {
  post: Post.PostResponseDto;
  boardId: string;
  targetUrl?: string;
}

export const PostItem = ({ post, boardId, targetUrl }: PostItemProps) => {
  const router = useRouter();

  return (
    <div
      className="flex max-h-44 w-full items-center rounded-xl bg-white p-4 shadow-lg lg:p-6"
      onClick={() => {
        targetUrl
          ? router.push(targetUrl)
          : router.push(`/board/${boardId}/${post.id}`);
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <PostItemContent post={post} />
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden sm:h-24 sm:w-24">
          {post.postAttachImage && <Image
              src={
                post.postAttachImage
              }
              alt="post_thumbnail"
              width={100}
              height={100}
              className="object-cover"
            />}
          </div>
        </div>
        <PostItemStatusBar post={post} />
      </div>
    </div>
  );
};
