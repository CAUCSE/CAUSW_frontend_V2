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
    writeable: boolean;
    isFavorite: boolean;
    post: Post.PostResponseDtoList;
  }

  export interface BoardContentDto {
    title: string;
    contentId: string;
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
  }
}
