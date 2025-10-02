import {
  PostCommentCountBadge,
  PostFormWriteButton,
  PostLikeButton,
  PostScrapButton,
} from '@/entities/post';

interface PostActionButtonGroupProps {
  like: {
    numLike: number;
    isPostLiked: boolean;
  };
  favorite: {
    numFavorite: number;
    isPostFavorite: boolean;
  };
  comment: {
    numComment: number;
  };
  form: {
    isPostForm: boolean;
    formResponseDto: Post.PostDto['formResponseDto'];
  };
}
export const PostActionBar = ({
  like,
  favorite,
  comment,
  form,
}: PostActionButtonGroupProps) => {
  return (
    <div className="flex gap-3 p-2">
      <PostLikeButton numLike={like.numLike} isPostLiked={like.isPostLiked} />
      <PostScrapButton
        numFavorite={favorite.numFavorite}
        isPostFavorite={favorite.isPostFavorite}
      />
      <PostCommentCountBadge numComment={comment.numComment} />
      {form.isPostForm && form.formResponseDto?.formId && (
        <PostFormWriteButton formId={form.formResponseDto.formId} />
      )}
    </div>
  );
};
