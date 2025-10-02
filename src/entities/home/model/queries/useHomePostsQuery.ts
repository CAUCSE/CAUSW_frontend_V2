import { useQuery } from '@tanstack/react-query';

import { getGraduateHomePosts, getHomePosts } from '../../api';
import { homeQueryKey } from '../../config/queryKey/homeQueryKey';

export const useHomePostsQuery = () => {
  return useQuery<Home.GetHomePostsResponseDto>({
    queryKey: homeQueryKey.homePosts(),
    queryFn: () => getHomePosts(),
  });
};

export const useGraduateHomePostsQuery = () => {
  return useQuery<Home.GetHomePostsResponseDto>({
    queryKey: homeQueryKey.graduateHomePosts(),
    queryFn: () => getGraduateHomePosts(),
  });
};
