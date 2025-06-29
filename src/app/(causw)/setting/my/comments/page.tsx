'use client';

import { MyRecordHeader, MyRecordList } from '@/fsd_entities/user/ui';

import { SettingService } from '@/shared';

const MyCommentsPage = () => {
  const { useGetMyCommentPosts } = SettingService();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyCommentPosts();
  return (
    <div className="h-full w-full">
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
