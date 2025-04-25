import { FORMAPI } from '@/shared';

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

  attachImageList.forEach(file => {
    formData.append('attachImageList', new Blob([file], { type: file.type }), file.name);
  });

  const { data }: { data: CreatePostResponse } = await FORMAPI.post('/api/v1/posts', formData);
  return data.id;
};
