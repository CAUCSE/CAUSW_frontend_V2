'use client';

import React from 'react';

import { PostCreationForm } from '@/fsd_widgets/post';
import { VoteCreationForm } from '@/fsd_widgets/vote';

import { CreatePostFooter, FilePreview } from '@/entities';
import { PreviousButton, useCreateApply, useCreatePostStore, useFileUpload, usePostForm } from '@/shared';
import { ApplyCreationForm } from '@/widget';

const CreatePostPage = () => {
  const { isVote, isApply, toggleApply, toggleVote } = useCreatePostStore();

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
              <PostCreationForm />
              {/* 투표 파트 */}
              {isVote && <VoteCreationForm />}
              {selectedFiles.length > 0 && <FilePreview />}
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
