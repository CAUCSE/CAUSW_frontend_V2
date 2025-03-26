"use client";

import { MyPageHeader, MyPostList } from "@/widget";

import { SettingService } from "@/shared";

const MyCommentsPage = () => {
  const { useGetMyCommentPosts } = SettingService();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetMyCommentPosts();
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
