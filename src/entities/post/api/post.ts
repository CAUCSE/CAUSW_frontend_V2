import { API, FORMAPI } from '@/fsd_shared';

export interface CreatePostParams {
  postData: Post.CreatePostDto;
  attachImageList: File[];
}

export interface CreatePostResponse {
  id: string;
}

export const createPost = async ({ postData, attachImageList }: CreatePostParams) => {
  const formData = new FormData();
  formData.append(
    'postCreateRequestDto',
    new Blob(
      [
        JSON.stringify({
          ...postData,
        }),
      ],
      { type: 'application/json' },
    ),
  );

  attachImageList.forEach((file) => {
    formData.append('attachImageList', new Blob([file], { type: file.type }), file.name);
  });

  const { data }: { data: CreatePostResponse } = await FORMAPI.post('/api/v1/posts', formData);
  return data.id;
};

export const createPostWithForm = async ({ postData, attachImageList }: CreatePostParams) => {
  const formData = new FormData();
  formData.append(
    'postCreateWithFormRequestDto',
    new Blob([JSON.stringify({ ...postData })], { type: 'application/json' }),
  );
  attachImageList.forEach((file) => {
    formData.append('attachImageList', new Blob([file], { type: file.type }), file.name);
  });

  const { data }: { data: CreatePostResponse } = await FORMAPI.post('/api/v1/posts/form', formData);
  return data.id;
};

export const subscribePost = async ({ postId }: { postId: Post.PostDto['id'] }) => {
  const { data }: { data: Post.PostSubscribeResponseDto } = await API.post(`/api/v1/posts/subscribe/${postId}`);
  return data;
};

export const likePost = async ({ postId }: { postId: Post.PostDto['id'] }) => {
  return await API.post(`/api/v1/posts/${postId}/like`);
};

export const scrapPost = async ({ postId }: { postId: Post.PostDto['id'] }) => {
  return await API.post(`/api/v1/posts/${postId}/favorite`);
};
