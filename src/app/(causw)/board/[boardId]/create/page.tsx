'use client';

import React from 'react';

import { CreatePostFooter, FilePreview, PostForm, VotingForm } from '@/entities';
import {
  PreviousButton,
  useCreateApply,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUpload,
  usePostForm,
} from '@/shared';
import { ApplyCreationForm } from '@/widget';

const CreatePostPage = () => {
  const {
    title,
    content,
    isAnonymous,
    isQuestion,
    isVote,
    isApply,
    setContent,
    setTitle,
    toggleAnonymous,
    toggleQuestion,
    toggleApply,
    toggleVote,
  } = useCreatePostStore();

  const {
    voteTitle,
    options,
    isMultipleChoice,
    allowAnonymous,
    setVoteTitle,
    setVoteOption,
    addVoteOption,
    removeVoteOption,
    toggleMultipleChoice,
    toggleAllowAnonymous,
  } = useCreateVoteStore();

  const { selectedFiles } = useFileUpload();

  const { methods, register, watch, errors, fields, remove, handleSubmit, addSurveyForm, onSubmit } = useCreateApply();

  const { handlePostSubmit, handleBack } = usePostForm();

  return (
    <>
      <div className="bottom-5 top-0 h-full w-full lg:relative lg:bottom-28">
        <div className="w-full flex-col items-center">
          <PreviousButton routeCallback={handleBack} />
        </div>
        <div className="flex h-full flex-col p-2 pt-10 lg:px-5 lg:py-10">
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
                ''
              )}
              {selectedFiles.length === 0 ? '' : <FilePreview />}
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
