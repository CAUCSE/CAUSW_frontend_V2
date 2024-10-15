declare namespace Comment {
  export interface CommentDto {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    postId: string;
    writerName: string;
    writerAdmissionYear: number;
    writerProfileImage: string | null;
    writerNickname: string;
    updatable: boolean;
    deletable: boolean;
    isAnonymous: boolean;
    isCommentLike: boolean;
    isOwner: boolean;
    numLike: number;
    numChildComment: number;
    childCommentList: Array<ChildCommentDto>;
  }

  export interface CreateCommentDto {
    content: string;
    postId: string;
    isAnonymous: boolean;
  }
}