'use client';

import { useEffect, useState } from 'react';

import { useVoteStore, VoteRscService } from '@/shared';

export const useVoteDetail = (voteId: string) => {
  const { getVoteById } = VoteRscService();
  const { setVote } = useVoteStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const voteData = await getVoteById(voteId);
        setVote(voteData);
      } catch (error) {
      } finally {
        setLoading(false); // 데이터 가져온 후 로딩 끝
      }
    };

    if (voteId) {
      fetchPost();
    }
  }, [voteId, setVote]);

  return { loading };
};
