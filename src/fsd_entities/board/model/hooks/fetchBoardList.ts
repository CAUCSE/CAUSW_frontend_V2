import { getBoardInfoList, getBoardList } from '../../api';

export const fetchBoardList = async () => {
  const [boardList, boardInfoList] = await Promise.all([getBoardList(), getBoardInfoList()]);

  const boardInfoMap: Map<string, Board.BoardDto> = new Map();
  boardInfoList.forEach((board) => {
    boardInfoMap.set(board.id, board);
  });

  const priorityOrder = [
    '서비스 공지',
    '학생회 공지 게시판',
    '소프트웨어학부 학부 공지',
    '동문회 공지 게시판',
    '딜리버드',
  ];

  const sortedBoardList = [
    ...boardList
      .filter((board) => priorityOrder.includes(board.boardName))
      .sort((a, b) => priorityOrder.indexOf(a.boardName) - priorityOrder.indexOf(b.boardName)), // 순서 유지
    ...boardList.filter((board) => !priorityOrder.includes(board.boardName)), // 나머지 보드 추가
  ];

  const defaultBoardForAdmin = sortedBoardList.filter((board) => board.isDefault);
  const defaultBoardForCommon = sortedBoardList.filter(
    (board) => board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );
  const defaultBoardForGraduate = sortedBoardList.filter(
    (board) => board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted && board.boardName.includes('크자회'),
  );

  const customBoardForAdmin = sortedBoardList.filter((board) => !board.isDefault);
  const customBoardForCommon = sortedBoardList.filter(
    (board) => !board.isDefault && !boardInfoMap.get(board.boardId)?.isDeleted,
  );
  const customBoardForGraduate = sortedBoardList.filter(
    (board) => !board.isDefault,
    // && board.boardName.includes('크자회')
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
