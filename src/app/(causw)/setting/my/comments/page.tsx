'use client';

import { SettingService } from '@/shared';
import { MyPageHeader, MyPostList } from '@/widget';

const MyCommentsPage = () => {
  const { useGetMyCommentPosts } = SettingService();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMyCommentPosts();
  return (
    <div className="h-full w-full">
      <MyPageHeader pageName="내가 쓴 댓글" />
      <MyPostList
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
