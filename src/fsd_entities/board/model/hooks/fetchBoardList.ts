import { getBoardInfoList, getBoardList } from '../../api';

export const fetchBoardList = async () => {
  const [boardList, boardInfoList] = await Promise.all([getBoardList(), getBoardInfoList()]);

  const boardInfoMap: Map<string, Board.BoardDto> = new Map();
  boardInfoList.forEach((board) => {
    boardInfoMap.set(board.id, board);
  });

  const priorityOrder = [
    '서비스 공지',
    '건의/오류 제보 게시판',
    '크자회 공지 게시판',
    '크자회 소통 게시판',
    '학생회 공지 게시판',
    '소프트웨어학부 학부 공지',
    '딜리버드 게시판',
  ];

  const sortedBoardList = [
    ...boardList
      .filter((board) => priorityOrder.includes(board.boardName))
      .sort((a, b) => priorityOrder.indexOf(a.boardName) - priorityOrder.indexOf(b.boardName)),
    ...boardList.filter((board) => !priorityOrder.includes(board.boardName)),
  ];

  // 일반/관리자용 게시판
  const defaultBoardForAdmin = sortedBoardList.filter((board) => board.isDefault);
  const defaultBoardForCommon = sortedBoardList.filter(
    (board) => board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );
  const customBoardForAdmin = sortedBoardList.filter((board) => !board.isDefault);
  const customBoardForCommon = sortedBoardList.filter(
    (board) => !board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );

  return {
    sortedBoardList,
    defaultBoardForAdmin,
    defaultBoardForCommon,
    customBoardForAdmin,
    customBoardForCommon,
  };
};
