import { API } from '@/shared';

import type { EndVoteParam, RestartVoteParam, SubmitVoteRequestDto } from '../type';

export const createVote = async (voteData: Post.CreateVoteDto) => {
  const response = await API.post(`/api/v1/votes/create`, voteData);
  return response.data;
};

export const restartVote = async (param: RestartVoteParam) => {
  const response = await API.post(`/api/v1/votes/${param.voteId}/restart`);
  return response.data;
};

export const endVote = async (param: EndVoteParam) => {
  const response = await API.post(`/api/v1/votes/${param.voteId}/end`);
  return response.data;
};

export const submitVote = async (dto: SubmitVoteRequestDto) => {
  return API.post(`/api/v1/votes/cast`, dto);
};
