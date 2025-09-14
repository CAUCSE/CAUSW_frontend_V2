interface PostDetailTitleProps {
  postTitle: Post.PostDto['title'];
}

export const PostDetailTitle = ({ postTitle }: PostDetailTitleProps) => {
  return <h1 className="text-xl font-medium select-text">{postTitle}</h1>;
};
