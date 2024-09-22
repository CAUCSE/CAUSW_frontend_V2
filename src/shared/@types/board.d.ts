declare namespace Board {
  export interface BoardDto {
    id: string,
    name: string,
    description: string,
    createRoleList: Array<string>,
    category: string,
    writable: boolean,
    isDeleted: boolean,
    circleId: string,
    circleName: string
  }
  export interface CreateBoardDto {
    boardName: string,
    description: string,
    createRoleList: Array<string>,
    isAnonymousAllowed: boolean
  }
  
  export interface ApplyBoardDto {
    boardName: string,
    description: string,
    isAnonymousAllowed: boolean
  }
}