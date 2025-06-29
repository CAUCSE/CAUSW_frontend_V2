'use client';

import { MyPageHeader, MyPostList } from '@/fsd_entities/user/ui';

import { SettingService } from '@/shared';

const MyFavoritePostsPage = () => {
  const { useGetMyFavoritePosts } = SettingService();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyFavoritePosts();

  return (
    <div className="h-full w-full">
      <>
        <MyPageHeader pageName="내가 찜한 게시글" />
        <MyPostList
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
