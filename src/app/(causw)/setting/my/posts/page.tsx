'use client';

import { useGetMyPosts } from '@/entities/user/api';
import { MyRecordHeader, MyRecordList } from '@/entities/user/ui';

const MyPostsPage = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyPosts();
  return (
    <div className="flex h-full w-full flex-col">
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
