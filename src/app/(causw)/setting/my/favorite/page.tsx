'use client';

import { useGetMyFavoritePosts } from '@/fsd_entities/user/api/get';
import { MyRecordHeader, MyRecordList } from '@/fsd_entities/user/ui';

const MyFavoritePostsPage = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyFavoritePosts();

  return (
    <div className="h-full w-full">
      <>
        <MyRecordHeader pageName="내가 찜한 게시글" />
        <MyRecordList
          data={data!}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </>
    </div>
  );
};

export default MyFavoritePostsPage;
