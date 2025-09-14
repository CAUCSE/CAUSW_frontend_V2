import { sanitizeHtml } from '@/fsd_shared';

interface PostDetailContentProps {
  postContent: Post.PostDto['content'];
}
export const PostDetailContent = ({ postContent }: PostDetailContentProps) => {
  const sanitizedContent = sanitizeHtml(postContent);

  return <div className="break-all whitespace-pre-line" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
