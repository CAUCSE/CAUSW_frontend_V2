"use client";

import {
  CreatePostFooter,
  FilePreview,
  PostForm,
  VotingForm,
} from "@/entities";
import {
  PreviousButton,
  useCreateApply,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUpload,
  usePostForm,
} from "@/shared";

import { ApplyCreationForm } from "@/widget";
import React from "react";

const CreatePostPage = () => {
  // const { roles, roleTxt } = useUserStore();

  const {
    title,
    content,
    isAnonymous,
    isQuestion,
    setContent,
    setTitle,
    toggleAnonymous,
    toggleQuestion,
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
  } = useCreateVoteStore();

  const { selectedFiles } = useFileUpload();

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

  const { handlePostSubmit, handleBack } = usePostForm();

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
