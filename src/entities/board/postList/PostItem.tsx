"use client";

import { PostItemContent, PostItemStatusBar } from "@/entities";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostItemProps {
  post: Post.PostResponseDto;
  boardId: string;
}

export const PostItem = ({ post, boardId }: PostItemProps) => {
  const router = useRouter();

  return (
    <div
      className="flex w-full items-center rounded-xl bg-white p-4 shadow-lg lg:p-6"
      onClick={() => {
        router.push(`/board/${boardId}/${post.id}`);
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <PostItemContent post={post} />
          <div className="h-16 w-16 flex-shrink-0 sm:h-24 sm:w-24">
            <Image
              src={
                post.postAttachImage
                  ? post.postAttachImage
                  : "/images/post_default_thumbnail.png"
              }
              alt="post_thumbnail"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
        <PostItemStatusBar post={post} />
      </div>
    </div>
  );
};
