import { sanitizeHtml } from '@/fsd_shared';

interface PostCardContentProps {
  post: Post.PostResponseDto;
}

export const PostCardContent = ({ post }: PostCardContentProps) => {
  const sanitizedContent = sanitizeHtml(post.content, {
    // 기본적으로 허용된 태그에 목록, 링크, 코드 관련 태그 추가 h태그는 제목이라서 제외함
    ALLOWED_TAGS: [
      'p',
      'span',
      'b',
      'i',
      'u',
      's',
      'strong',
      'em',
      'ul',
      'ol',
      'li',
      'a',
      'br',
      'blockquote',
      'code',
      'pre',
      'hr',
    ],
    // a 태그에 허용할 속성 명시
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });

  return (
    <div className="grid h-[96px] grow grid-rows-[2rem_1fr]">
      <div className="w-full truncate">
        <p className="overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap md:text-2xl">{post.title}</p>
      </div>
      <div className="relative min-h-0">
        <div
          className="md:text-md h-full overflow-y-hidden text-sm break-all"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-white to-transparent" />
      </div>
    </div>
  );
};
