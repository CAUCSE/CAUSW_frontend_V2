'use client';

import { useGetMyPosts } from '@/fsd_entities/user/api';
import { MyRecordHeader, MyRecordList } from '@/fsd_entities/user/ui';

const MyPostsPage = () => {
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
