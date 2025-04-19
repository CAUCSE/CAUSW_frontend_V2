'use client';

import { useShallow } from 'zustand/react/shallow';

import { PostCreationForm, PostCreationFormButtonGroup } from '@/fsd_widgets/post';
import { VoteCreationForm } from '@/fsd_widgets/vote';

import { UploadFilePreview, usePostCreationStore, useUploadFileStore } from '@/fsd_entities/post';

import { PreviousButton, useCreateApply, usePostForm } from '@/shared';
import { ApplyCreationForm } from '@/widget';

const CreatePostPage = () => {
  const { isApply, isVote } = usePostCreationStore(
    useShallow(state => ({
      isApply: state.isApply,
      isVote: state.isVote,
    })),
  );

  const selectedFileList = useUploadFileStore(state => state.selectedFileList);

  const { methods, register, watch, errors, fields, remove, handleSubmit, addSurveyForm, onSubmit } = useCreateApply();

  const { handlePostSubmit, handleBack } = usePostForm();

  return (
    <>
      <div className="bottom-5 top-0 h-full w-full lg:relative lg:bottom-28">
        <div className="w-full flex-col items-center">
          <PreviousButton routeCallback={handleBack} />
        </div>
        <div className="flex h-full flex-col overflow-y-auto p-2 pt-10 lg:px-5 lg:py-10">
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
              {selectedFileList.length > 0 && <UploadFilePreview />}
            </>
          )}
        </div>
      </div>
      <PostCreationFormButtonGroup handleSubmit={isApply ? handleSubmit(onSubmit) : handlePostSubmit} />
    </>
  );
};

export default CreatePostPage;
