'use client';

import { useGetMyFavoritePosts } from '@/entities/user/api';
import { MyRecordHeader, MyRecordList } from '@/entities/user/ui';

const MyFavoritePostsPage = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyFavoritePosts();

  return (
    <div className="flex h-full w-full flex-col">
      <MyRecordHeader pageName="내가 찜한 게시글" />
      <MyRecordList
        data={data!}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default MyFavoritePostsPage;
