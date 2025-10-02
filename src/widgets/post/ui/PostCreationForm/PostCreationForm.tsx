import {
  AnonymousToggle,
  PostContentTextarea,
  PostTitleInput,
  QuestionToggle,
} from '@/entities/post';

export const PostCreationForm = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <div className="mt-4 flex w-full items-center space-x-2 lg:space-x-4">
          <PostTitleInput />
          <QuestionToggle />
          <AnonymousToggle />
        </div>
      </div>
      <PostContentTextarea />
    </div>
  );
};
