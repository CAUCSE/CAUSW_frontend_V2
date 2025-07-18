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
    writerNickname: User.User['nickname'];
    writerAdmissionYear: User.User['admissionYear'];
    writerProfileImage: User.User['profileImageUrl'];
    updatable: boolean;
    deletable: boolean;
    isAnonymous: boolean;
    isOwner: boolean;
    isCommentLike: boolean;
    isCommentSubscribed: boolean;
    numLike: number;
    numChildComment: number;
    childCommentList: Comment.ChildCommentDto[];
  }

  export interface ChildCommentDto
    extends Omit<Comment.CommentDto, 'postId' | 'isCommentSubscribed' | 'childCommentList'> {}

  export interface CreateCommentDto {
    content: string;
    postId: string;
    isAnonymous: boolean;
  }
}
