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

  const graduateBoardNames = ['서비스 공지', '크자회 공지 게시판', '크자회 소통 게시판', '건의/오류 제보 게시판'];

  const sortedBoardList = [
    ...boardList
      .filter((board) => priorityOrder.includes(board.boardName))
      .sort((a, b) => priorityOrder.indexOf(a.boardName) - priorityOrder.indexOf(b.boardName)),
    ...boardList.filter((board) => !priorityOrder.includes(board.boardName)),
  ];

  // 일반 사용자 및 관리자에게 보여줄 게시판에서 '크자회' 게시판 제외
  const nonGraduateBoardList = sortedBoardList;

  // 일반/관리자용 게시판
  const defaultBoardForAdmin = nonGraduateBoardList.filter((board) => board.isDefault);
  const defaultBoardForCommon = nonGraduateBoardList.filter(
    (board) => board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );
  const customBoardForAdmin = nonGraduateBoardList.filter((board) => !board.isDefault);
  const customBoardForCommon = nonGraduateBoardList.filter(
    (board) => !board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );

  // 졸업생 전용 게시판 (크자회 포함된 고정 목록)
  const defaultBoardForGraduate = sortedBoardList.filter(
    (board) =>
      board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted && graduateBoardNames.includes(board.boardName),
  );
  const customBoardForGraduate = sortedBoardList.filter(
    (board) => !board.isDefault && graduateBoardNames.includes(board.boardName),
  );

  return {
    sortedBoardList,
    defaultBoardForAdmin,
    defaultBoardForCommon,
    customBoardForAdmin,
    customBoardForCommon,
    defaultBoardForGraduate,
    customBoardForGraduate,
  };
};
