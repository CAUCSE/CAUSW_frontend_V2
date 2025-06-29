'use client';

import { MyRecordHeader, MyRecordList } from '@/fsd_entities/user/ui';

import { SettingService } from '@/shared';

const MyPostsPage = () => {
  const { useGetMyPosts } = SettingService();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyPosts();
  return (
    <div className="h-full w-full">
      <MyRecordHeader pageName="내가 쓴 게시글" />
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

export default MyPostsPage;
