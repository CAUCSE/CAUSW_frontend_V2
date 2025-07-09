'use client';

import DOMPurify from 'dompurify';

interface PostDetailContentProps {
  postContent: Post.PostDto['content'];
}
export const PostDetailContent = ({ postContent }: PostDetailContentProps) => {
  const sanitizedContent = DOMPurify.sanitize(postContent);

  return <div className="break-all" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
