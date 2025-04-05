import { PostSkeleton } from '@/entities/board/post/PostSkeleton';

export const PostSkeletonList = () => {
  const array = new Array(3).fill(0);
  return (
    <div className="flex flex-col gap-4 pb-4">
      {array.map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};
