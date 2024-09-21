import { useCreatePostStore, useCreateVoteStore } from '@/shared';

export const usePostForm = (boardId: string) => {
  const {
    title,
    content,
    isQuestion,
    isAnonymous,
    setTitle,
    setContent,
    toggleQuestion,
    toggleAnonymous,
    createPost,
  } = useCreatePostStore();

  const handleSubmitPost = async () => {
    await createPost(boardId);
  };

  return {
    title,
    content,
    isQuestion,
    isAnonymous,
    handleTitleChange: setTitle,
    handleContentChange: setContent,
    handleQuestionToggle: toggleQuestion,
    handleAnonymousToggle: toggleAnonymous,
    handleSubmitPost,
  };
};