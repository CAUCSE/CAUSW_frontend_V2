'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { API, FORMAPI } from '@/fsd_shared';
import { useCreatePostStore, useCreateVoteStore, useFileUploadStore } from '@/shared';

export const PostService = () => {
  const useCreatePost = () => {
    const router = useRouter();
    const clearPost = useCreatePostStore((state) => state.clearPost);
    const clearFiles = useFileUploadStore((state) => state.clearFiles);
    return useMutation({
      mutationFn: async ({ postData, attachImageList }: { postData: Post.CreatePostDto; attachImageList: File[] }) => {
        const formData = new FormData();
        formData.append(
          'postCreateRequestDto',
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
            { type: 'application/json' },
          ),
        );

        attachImageList.forEach((file) => {
          formData.append('attachImageList', new Blob([file], { type: file.type }), file.name);
        });

        const { data }: { data: { id: string } } = await FORMAPI.post('/api/v1/posts', formData);
        return data.id;
      },

      onSuccess: () => {
        router.back();
        clearPost();
        clearFiles();
      },
      onError: () => {
        toast.error('게시글 생성에 실패했습니다.');
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
          'postCreateWithFormRequestDto',
          new Blob([JSON.stringify(postWithFormData)], {
            type: 'application/json',
          }),
        );

        attachImageList.forEach((file) => {
          formData.append('attachImageList', new Blob([file], { type: file.type }), file.name);
        });

        const { data } = await FORMAPI.post('/api/v1/posts/form', formData);
        return data;
      },
      onSuccess: () => {
        router.back();
        clearPost();
        clearFiles();
      },
      onError: () => {
        toast.error('게시글 생성에 실패했습니다.');
      },
    });
  };

  const useCreatePostWithVote = () => {
    const router = useRouter();
    const clearPost = useCreatePostStore((state) => state.clearPost);
    const clearFiles = useFileUploadStore((state) => state.clearFiles);
    const { voteTitle, options, isMultipleChoice, allowAnonymous, clearVote } = useCreateVoteStore();
    return useMutation({
      mutationFn: async ({ postData, attachImageList }: { postData: Post.CreatePostDto; attachImageList: File[] }) => {
        const formData = new FormData();
        formData.append(
          'postCreateRequestDto',
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
            { type: 'application/json' },
          ),
        );

        attachImageList.forEach((file) => {
          formData.append('attachImageList', new Blob([file], { type: file.type }), file.name);
        });

        const { data }: { data: { id: string } } = await FORMAPI.post('/api/v1/posts', formData);
        const id = data.id;

        const voteRequest: Post.CreateVoteDto = {
          title: voteTitle,
          allowAnonymous: allowAnonymous,
          allowMultiple: isMultipleChoice,
          options: options,
          postId: id,
        };

        await API.post('/api/v1/votes/create', voteRequest);
      },
      onSuccess: () => {
        router.back();
        clearPost();
        clearFiles();
        clearVote();
      },
      onError: () => {
        toast.error('게시글 생성에 실패했습니다.');
      },
    });
  };

  return {
    useCreatePost,
    useCreatePostWithForm,
    useCreatePostWithVote,
  };
};
