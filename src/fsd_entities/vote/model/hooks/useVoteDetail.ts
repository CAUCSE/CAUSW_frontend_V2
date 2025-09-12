'use client';

import { useEffect, useState } from 'react';

import { useVoteStore } from '@/fsd_entities/vote/model/stores';
import { getVoteById } from '@/fsd_entities/vote/api/get';

export const useVoteDetail = (voteId: string) => {
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
