declare namespace Board {
  export interface BoardDto {
    id: string;
    name: string;
    description: string;
    createRoleList: User.Role[];
    category: string;
    writable: boolean;
    isDeleted: boolean;
    circleId: string;
    circleName: string;
  }

  export interface BoardResponseDto {
    boardId: string;
    isDefault: boolean;
    boardName: string;
    contents: BoardContentDto[];
  }

  export interface BoardWithPostResponseDto {
    boardId: string;
    boardName: string;
    writable: boolean;
    isFavorite: boolean;
    isBoardSubscribed: boolean;
    post: Post.PostResponseDtoList;
  }

  export interface BoardContentDto {
    title: string;
    contentId: string;
    writerNickname: string | null;
    displayWriterNickname: string;
    createdAt: string;
    isAnonymous: boolean;
    isQuestion: boolean;
  }
  export interface CreateBoardDto {
    boardName: string;
    description: string;
    boardCategory: string;
    createRoleList: User.Role[];
    isAnonymousAllowed: boolean;
    circleId: string | null;
  }

  export interface ApplyBoardDto {
    boardName: string;
    description: string;
    isAnonymousAllowed: boolean;
    circleId?: string;
  }

  export interface ActiveBoardNotificationResponseDto {
    boardId: string;
    userId: string;
    isSubscribe: boolean;
  }
}
