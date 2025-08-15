import { PostCommentCountBadge, PostFormWriteButton, PostLikeButton, PostScrapButton } from '@/fsd_entities/post';

interface PostActionButtonGroupProps {
  numLike: number;
  numFavorite: number;
  numComment: number;
  isPostForm: boolean;
  formResponseDto: Post.PostDto['formResponseDto'];
  isPostLiked: boolean;
}

export const PostActionBar = ({
  numLike,
  numFavorite,
  numComment,
  isPostForm,
  formResponseDto,
  isPostLiked,
}: PostActionButtonGroupProps) => {
  return (
    <div className="flex gap-3 p-2">
      <PostLikeButton numLike={numLike} isPostLiked={isPostLiked} />
      <PostScrapButton numFavorite={numFavorite} />
      <PostCommentCountBadge numComment={numComment} />
      {isPostForm && formResponseDto?.formId && <PostFormWriteButton formId={formResponseDto.formId} />}
    </div>
  );
};
