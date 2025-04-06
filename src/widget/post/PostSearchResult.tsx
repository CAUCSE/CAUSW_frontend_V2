import { PostItem, PostSearchNotFound } from '@/entities';

interface PostSearchResultProps {
  postList: Post.PostResponseDto[];
  boardId: string;
}

export const PostSearchResult = ({ postList, boardId }: PostSearchResultProps) => {
  return (
    <>
      {postList!.length === 0 ? (
        <PostSearchNotFound />
      ) : (
        <div className="flex flex-col gap-4 pb-4">
          {postList!
            .filter(post => !post.isDeleted)
            .map((post: Post.PostResponseDto) => (
              <PostItem key={post.id} post={post} boardId={boardId as string} targetUrl={`/board/search/${post.id}`} />
            ))}
        </div>
      )}
    </>
  );
};
