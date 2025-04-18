import { PostCard } from '@/fsd_entities/post';

import { PostSearchNotFound } from './PostSearchNotFound';

interface PostSearchResultProps {
  postList: Post.PostResponseDto[];
}

export const PostSearchResult = ({ postList }: PostSearchResultProps) => {
  return (
    <>
      {postList!.length === 0 ? (
        <PostSearchNotFound />
      ) : (
        <div className="flex flex-col gap-4 pb-4">
          {postList!
            .filter(post => !post.isDeleted)
            .map((post: Post.PostResponseDto) => (
              <PostCard key={post.id} post={post} targetUrl={`/board/search/${post.id}`} />
            ))}
        </div>
      )}
    </>
  );
};
