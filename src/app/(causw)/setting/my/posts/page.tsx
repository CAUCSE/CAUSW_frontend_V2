"use client";

import { MyPageHeader, MyPostList } from "@/widget";

import { SettingService } from "@/shared";

const MyPostsPage = () => {
  const { useGetMyPosts } = SettingService();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetMyPosts();
  return (
    <div className="h-full w-full">
      <MyPageHeader pageName="내가 쓴 게시글" />
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

export default MyPostsPage;
