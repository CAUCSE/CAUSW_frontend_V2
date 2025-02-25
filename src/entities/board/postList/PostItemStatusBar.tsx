import { Icon } from "@/shared";
import { getTimeDifference } from "@/utils/format";

interface PostItemStatusBarProps {
  post: Post.PostResponseDto;
}

export const PostItemStatusBar = ({ post }: PostItemStatusBarProps) => {
  return (
    <div className="flex gap-2 divide-x-2 sm:gap-4">
      <div className="flex gap-2 lg:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Icon iconName="like" />
          <p className="text-red-500">
            {post.numLike > 999 ? "999+" : post.numLike}
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Icon iconName="scrap" />
          <p className="text-yellow-500">
            {post.numFavorite > 999 ? "999+" : post.numFavorite}
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Icon iconName="comment" />
          <p className="text-blue-300">
            {post.numComment > 999 ? "999+" : post.numComment}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-2 lg:pl-4">
        <Icon iconName={post.isPostVote ? "vote_active" : "vote_inactive"} />
        <Icon iconName={post.isPostForm ? "apply_active" : "apply_inactive"} />
      </div>
      <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
        {getTimeDifference(post.createdAt)}
      </div>
      <div className="sm:text-md flex items-center pl-2 text-center text-xs text-gray-300 lg:pl-4">
        {post.isAnonymous ? "익명" : post.writerName}
      </div>
    </div>
  );
};
