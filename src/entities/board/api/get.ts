import { BASEURL, setRscHeader } from '@/shared';

export const getBoardList = async (): Promise<Board.BoardResponseDto[]> => {
  const headers = await setRscHeader();
  const response = await fetch(`${BASEURL}/api/v1/boards/main`, { headers });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const res = await response.json();
  return res;
};

export const getBoardInfoList = async (): Promise<Board.BoardDto[]> => {
  const headers = await setRscHeader();
  const response = await fetch(`${BASEURL}/api/v1/boards`, { headers });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const res = await response.json();
  return res;
};
