import { API, BASEURL } from '@/shared';

export const createVote = async (voteData: Post.CreateVoteDto) => {
  const response = await API.post(`/api/v1/votes/create`, voteData);
  return response.data;
};
