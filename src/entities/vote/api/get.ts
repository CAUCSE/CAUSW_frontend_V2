import { AxiosResponse } from 'axios';

import { API } from '@/shared';
import { BASEURL } from '@/shared';

export const getVoteById = async (
  voteId: string,
): Promise<Post.VoteResponseDto> => {
  const URI = `${BASEURL}/api/v1/votes/${voteId}`;

  const response: AxiosResponse<Post.VoteResponseDto> = await API.get(URI);
  return response.data;
};
