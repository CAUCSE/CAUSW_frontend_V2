interface PostItemContentProps {
  post: Post.PostResponseDto;
}

export const PostItemContent = ({ post }: PostItemContentProps) => {
  return (
    <div className="flex w-2/3 flex-col">
      <div className="flex-auto truncate">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap pb-2 text-sm font-bold md:text-2xl">
          {post.title}
        </p>
      </div>
      <div className="md:text-md pb-2 text-sm">
        {post.content ? (
          post.content
            .split('\n')
            .slice(0, 2)
            .map((str, idx) => {
              if (idx === 1 && post.content.split('\n').length > 2) {
                return <p key={idx}>{str}...</p>;
              }
              return (
                <p key={idx} className="truncate">
                  {str}
                </p>
              );
            })
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
