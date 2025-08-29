declare namespace Comment {
  export interface GetCommentListResponseDto extends Pagination.PageableObject {
    content: Comment.CommentDto[];
  }
  export interface CommentDto {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    postId: Post.PostDto['id'];
    writerName: User.User['name'];
    displayWriterNickname: string;
    writerNickname: User.User['nickname'];
    writerAdmissionYear: User.User['admissionYear'];
    writerProfileImage: User.User['profileImageUrl'];
    updatable: boolean;
    deletable: boolean;
    isBlocked: boolean;
    isAnonymous: boolean;
    isOwner: boolean;
    isCommentLike: boolean;
    isCommentSubscribed: boolean;
    numLike: number;
    numChildComment: number;
    childCommentList: Comment.ChildCommentDto[];
    isChildCommentLike: boolean;
  }

  export interface ChildCommentDto
    extends Omit<Comment.CommentDto, 'postId' | 'isCommentSubscribed' | 'childCommentList'> {}

  export interface CreateCommentDto {
    content: string;
    postId: string;
    isAnonymous: boolean;
  }
  export interface PostChildCommentProps {
    setChildCommentActiveId: (id: string | undefined) => void;
    setCommentContent: (content: string) => void;
    postId: string;
  }
}
