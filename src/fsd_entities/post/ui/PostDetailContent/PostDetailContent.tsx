import { createDomPurify } from '@/fsd_shared';

interface PostDetailContentProps {
  postContent: Post.PostDto['content'];
}
export const PostDetailContent = ({ postContent }: PostDetailContentProps) => {
  const purify = createDomPurify();
  const sanitizedContent = purify.sanitize(postContent);

  return <div className="break-all" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
