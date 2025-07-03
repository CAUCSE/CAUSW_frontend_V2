interface PostDetailContentProps {
  postContent: Post.PostDto['content'];
}
export const PostDetailContent = ({ postContent }: PostDetailContentProps) => {
  return <p className="text-base break-words whitespace-pre-line select-text">{postContent}</p>;
};
