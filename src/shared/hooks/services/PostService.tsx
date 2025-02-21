"use client";

import {
  API,
  FORMAPI,
  postQueryKey,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUploadStore,
} from "@/shared";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { clear } from "console";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const PostService = () => {
  const useGetPostList = (boardId) => {
    return useInfiniteQuery({
      queryKey: postQueryKey.list(boardId),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: Board.BoardWithPostResponseDto } =
          await API.get(
            `/api/v1/posts?boardId=${boardId}&pageNum=${pageParam}`,
          );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.post.last ? null : lastPage.post.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.post.content);
      },
    });
  };

  const useGetSearchPostList = (
    boardId: string,
    keyword: string,
    isSearch: boolean,
  ) => {
    return useInfiniteQuery({
      queryKey: postQueryKey.searchResult(boardId, keyword),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: Board.BoardWithPostResponseDto } =
          await API.get(
            `/api/v1/posts/search?boardId=${boardId}&keyword=${encodeURIComponent(keyword)}&pageNum=${pageParam}`,
          );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.post.last ? null : lastPage.post.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.post.content);
      },
      enabled: isSearch && keyword !== "",
    });
  };

  const useCreatePost = () => {
    const router = useRouter();
    const clearPost = useCreatePostStore((state) => state.clearPost);
    const clearFiles = useFileUploadStore((state) => state.clearFiles);
    return useMutation({
      mutationFn: async ({
        postData,
        attachImageList,
      }: {
        postData: Post.CreatePostDto;
        attachImageList: File[];
      }) => {
        const formData = new FormData();
        formData.append(
          "postCreateRequestDto",
          new Blob(
            [
              JSON.stringify({
                title: postData.title,
                content: postData.content,
                boardId: postData.boardId,
                isAnonymous: postData.isAnonymous,
                isQuestion: postData.isQuestion,
              }),
            ],
            { type: "application/json" },
          ),
        );

        attachImageList.forEach((file) => {
          formData.append(
            "attachImageList",
            new Blob([file], { type: file.type }),
            file.name,
          );
        });

        const { data }: { data: { id: string } } = await FORMAPI.post(
          "/api/v1/posts",
          formData,
        );
        return data.id;
      },

      onSuccess: () => {
        clearPost();
        clearFiles();
        router.back();
      },
      onError: () => {
        toast.error("게시글 생성에 실패했습니다.");
      },
    });
  };

  const useCreatePostWithForm = () => {
    const router = useRouter();
    const clearPost = useCreatePostStore((state) => state.clearPost);
    const clearFiles = useFileUploadStore((state) => state.clearFiles);
    return useMutation({
      mutationFn: async ({
        postWithFormData,
        attachImageList,
      }: {
        postWithFormData: Post.PostCreateWithFormRequestDto;
        attachImageList: File[];
      }) => {
        const formData = new FormData();
        formData.append(
          "postCreateWithFormRequestDto",
          new Blob([JSON.stringify(postWithFormData)], {
            type: "application/json",
          }),
        );

        attachImageList.forEach((file) => {
          formData.append(
            "attachImageList",
            new Blob([file], { type: file.type }),
            file.name,
          );
        });

        const { data } = await FORMAPI.post("/api/v1/posts/form", formData);
        return data;
      },
      onSuccess: () => {
        clearPost();
        clearFiles();
        router.back();
      },
      onError: () => {
        toast.error("게시글 생성에 실패했습니다.");
      },
    });
  };

  const useCreatePostWithVote = () => {
    const router = useRouter();
    const clearPost = useCreatePostStore((state) => state.clearPost);
    const clearFiles = useFileUploadStore((state) => state.clearFiles);
    const { voteTitle, options, isMultipleChoice, allowAnonymous, clearVote } =
      useCreateVoteStore();
    return useMutation({
      mutationFn: async ({
        postData,
        attachImageList,
      }: {
        postData: Post.CreatePostDto;
        attachImageList: File[];
      }) => {
        const formData = new FormData();
        formData.append(
          "postCreateRequestDto",
          new Blob(
            [
              JSON.stringify({
                title: postData.title,
                content: postData.content,
                boardId: postData.boardId,
                isAnonymous: postData.isAnonymous,
                isQuestion: postData.isQuestion,
              }),
            ],
            { type: "application/json" },
          ),
        );

        attachImageList.forEach((file) => {
          formData.append(
            "attachImageList",
            new Blob([file], { type: file.type }),
            file.name,
          );
        });

        const { data }: { data: { id: string } } = await FORMAPI.post(
          "/api/v1/posts",
          formData,
        );
        const id = data.id;

        const voteRequest: Post.CreateVoteDto = {
          title: voteTitle,
          allowAnonymous: allowAnonymous,
          allowMultiple: isMultipleChoice,
          options: options,
          postId: id,
        };

        await API.post("/api/v1/votes/create", voteRequest);
      },
      onSuccess: () => {
        clearPost();
        clearFiles();
        clearVote();
        router.back();
      },
      onError: () => {
        toast.error("게시글 생성에 실패했습니다.");
      },
    });
  };

  return {
    useGetPostList,
    useGetSearchPostList,
    useCreatePost,
    useCreatePostWithForm,
    useCreatePostWithVote,
  };
};
