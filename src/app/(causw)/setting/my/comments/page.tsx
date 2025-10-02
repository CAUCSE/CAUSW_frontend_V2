'use client';

import { useGetMyCommentPosts } from '@/entities/user/api';
import { MyRecordHeader, MyRecordList } from '@/entities/user/ui';

const MyCommentsPage = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetMyCommentPosts();
  return (
    <div className="flex h-full w-full flex-col">
      <MyRecordHeader pageName="내가 쓴 댓글" />
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

export default MyCommentsPage;
