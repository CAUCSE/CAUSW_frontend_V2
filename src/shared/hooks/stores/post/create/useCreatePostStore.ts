import { create } from 'zustand';
import { PostRscService } from '@/shared';

interface CreatePostState {
  title: string;
  content: string;
  isQuestion: boolean;
  isAnonymous: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  toggleQuestion: () => void;
  toggleAnonymous: () => void;
  createPost: (boardId: string) => Promise<void>;
}

export const useCreatePostStore = create<CreatePostState>((set) => ({
  title: '',
  content: '',
  isQuestion: false,
  isAnonymous: false,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  toggleQuestion: () => set((state) => ({ isQuestion: !state.isQuestion })),
  toggleAnonymous: () => set((state) => ({ isAnonymous: !state.isAnonymous })),
  createPost: async (boardId: string) => {
    const { createPost } = PostRscService();
    const { title, content, isQuestion, isAnonymous } = useCreatePostStore.getState();
    const postRequest: Post.CreatePostDto = {
      title,
      content,
      boardId,
      attachmentList: ['http://example.com/file1.jpg'],
      isAnonymous,
      isQuestion,
    };
    try {
      const createPostResponse = await createPost(postRequest);
      console.log('게시물 생성 완료:', createPostResponse);
    } catch (error) {
      console.error('게시물 생성 에러:', error);
    }
  },
}));