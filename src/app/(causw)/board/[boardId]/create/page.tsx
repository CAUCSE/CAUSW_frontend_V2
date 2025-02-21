"use client";

import {
  CreatePostFooter,
  FilePreview,
  PostForm,
  VotingForm,
} from "@/entities";
import {
  PostRscService,
  PreviousButton,
  VoteRscService,
  useCreateApply,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUpload,
} from "@/shared";

import { ApplyCreationForm } from "@/widget";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatePostPage = (props: any) => {
  const boardId = props.params.boardId;
  const { createPost } = PostRscService();
  const { createVote } = VoteRscService();
  // const { roles, roleTxt } = useUserStore();
  const router = useRouter();

  const {
    title,
    content,
    isAnonymous,
    isQuestion,
    setContent,
    setTitle,
    toggleAnonymous,
    toggleQuestion,
    clearPost,
  } = useCreatePostStore();

  const {
    isVote,
    isApply,
    voteTitle,
    options,
    isMultipleChoice,
    allowAnonymous,
    toggleVote,
    toggleApply,
    setVoteTitle,
    setVoteOption,
    addVoteOption,
    removeVoteOption,
    toggleMultipleChoice,
    toggleAllowAnonymous,
    clearVote,
  } = useCreateVoteStore();

  const { selectedFiles, resetFiles } = useFileUpload();

  const {
    methods,
    register,
    watch,
    errors,
    fields,
    remove,
    handleSubmit,
    addSurveyForm,
    onSubmit,
  } = useCreateApply(isApply);

  const handlePostSubmit = async () => {
    const postRequest: Post.CreatePostDto = {
      title,
      content,
      boardId,
      isAnonymous,
      isQuestion,
    };
    try {
      const createPostResponse = await createPost(postRequest, selectedFiles);
      clearPost();
      resetFiles();
      if (isVote) {
        const voteRequest: Post.CreateVoteDto = {
          title: voteTitle,
          allowAnonymous: allowAnonymous,
          allowMultiple: isMultipleChoice,
          options: options,
          postId: createPostResponse,
        };
        try {
          await createVote(voteRequest);
          clearVote();
        } catch (error) {
          toast.error("투표 생성에 실패했습니다.");
        }
      }
      router.back();
    } catch (error) {
      toast.error("게시글 생성에 실패했습니다.");
    }
  };

  const handleBack = () => {
    clearPost();
    clearVote();
    resetFiles();
    router.back();
  };

  return (
    <>
      <div className="bottom-5 top-0 h-full w-full lg:relative lg:bottom-28">
        <div className="w-full flex-col items-center">
          <PreviousButton routeCallback={handleBack} />
        </div>
        {/* 게시글 공통 부분 - 제목 / 내용 */}
        <div className="flex h-full flex-col p-4 pt-10 lg:px-5 lg:py-10">
          {isApply ? (
            <ApplyCreationForm
              methods={methods}
              register={register}
              errors={errors}
              watch={watch}
              fields={fields}
              remove={remove}
              handleSubmit={handleSubmit}
              addSurveyForm={addSurveyForm}
              onSubmit={onSubmit}
            />
          ) : (
            <>
              <PostForm
                title={title}
                content={content}
                isQuestion={isQuestion}
                isAnonymous={isAnonymous}
                isVote={isVote}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onQuestionToggle={toggleQuestion}
                onAnonymousToggle={toggleAnonymous}
              />
              {/* 투표 파트 */}
              {isVote ? (
                <VotingForm
                  voteTitle={voteTitle}
                  options={options}
                  isMultipleChoice={isMultipleChoice}
                  allowAnonymous={allowAnonymous}
                  onVoteTitleChange={setVoteTitle}
                  onAddOption={addVoteOption}
                  onChangeOption={setVoteOption}
                  onRemoveOption={removeVoteOption}
                  onSelectMultiple={toggleMultipleChoice}
                  onAllowAnonymous={toggleAllowAnonymous}
                />
              ) : (
                ""
              )}
              {selectedFiles.length === 0 ? "" : <FilePreview />}
            </>
          )}
        </div>
      </div>
      <CreatePostFooter
        isVote={isVote}
        isApply={isApply}
        handleSubmit={isApply ? handleSubmit(onSubmit) : handlePostSubmit}
        handleVoteToggle={toggleVote}
        handleApplyToggle={toggleApply}
      />
    </>
  );
};

export default CreatePostPage;
