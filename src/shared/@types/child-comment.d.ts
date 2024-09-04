declare namespace ChildComment {
  export interface ChildCommentDto {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    tagUserName?: string | null;
    refChildComment?: string | null;
    writerName: string;
    writerAdmissionYear: number;
    writerProfileImage: string;
    updatable: boolean;
    deletable: boolean;
    isAnonymous: boolean;
    numLike: number;
  }
  export interface CreateChildCommentDto {
    content: string;
    parentCommentID: string;
    refChildComment: string | null;
    isAnonymous: boolean;
  }
}