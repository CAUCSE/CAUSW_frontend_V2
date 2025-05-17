'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { FormCreationForm } from '@/fsd_widgets/form';
import { PostCreationForm, PostCreationFormButtonGroup } from '@/fsd_widgets/post';
import { VoteCreationForm } from '@/fsd_widgets/vote';

import {
  postSchema,
  PostSchema,
  UploadFilePreview,
  useCreatePostWithForm,
  usePostCreationStore,
  useUploadFileStore,
} from '@/fsd_entities/post';
import { useCreatePost } from '@/fsd_entities/post';
import { useCreateVote } from '@/fsd_entities/vote';

import { PreviousButton } from '@/fsd_shared';
import { useCreateApply, usePostForm } from '@/shared';

const CreatePostPage = () => {
  const { isApply, isVote } = usePostCreationStore(
    useShallow((state) => ({
      isApply: state.isApply,
      isVote: state.isVote,
    })),
  );

  const selectedFileList = useUploadFileStore((state) => state.selectedFileList);

  const { handlePostSubmit, handleBack } = usePostForm();

  const { mutateAsync: createPost } = useCreatePost();
  const { mutate: createVote } = useCreateVote();
  const { mutate: createPostWithForm } = useCreatePostWithForm();

  const methods = useForm<PostSchema>({
    mode: 'all',
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      isAnonymous: false,
      isQuestion: false,
      formCreateRequestDto: undefined,
      voteCreateRequestDto: undefined,
    },
  });

  useEffect(() => {
    let newValues = methods.getValues();
    if (isVote) {
      newValues = {
        ...newValues,
        formCreateRequestDto: undefined,
        voteCreateRequestDto: {
          title: '',
          allowAnonymous: false,
          allowMultiple: false,
          options: [''],
        },
      };
    }

    if (isApply) {
      newValues = {
        ...newValues,
        voteCreateRequestDto: undefined,
        formCreateRequestDto: {
          title: '',
          questionCreateRequestDtoList: [],
          isAllowedEnrolled: false,
          allowAllEnrolledRegisteredSemester: false,
          enrolledRegisteredSemesterList: [],
          isNeedCouncilFeePaid: false,
          isAllowedLeaveOfAbsence: false,
          allowAllLeaveOfAbsenceRegisteredSemester: false,
          leaveOfAbsenceRegisteredSemesterList: [],
          isAllowedGraduation: false,
        },
      };
    }

    if (!isApply && !isVote) {
      newValues = {
        ...newValues,
        formCreateRequestDto: undefined,
        voteCreateRequestDto: undefined,
      };
    }

    methods.reset(newValues, {
      keepErrors: true,
    });
  }, [isVote, isApply, methods]);

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (isApply) {
      const { title, content, isAnonymous, isQuestion } = data;
      let { formCreateRequestDto } = data;
      if (formCreateRequestDto?.enrolledRegisteredSemesterList.includes('ALL_SEMESTER')) {
        formCreateRequestDto.enrolledRegisteredSemesterList = [
          'FIRST_SEMESTER',
          'SECOND_SEMESTER',
          'THIRD_SEMESTER',
          'FOURTH_SEMESTER',
          'FIFTH_SEMESTER',
          'SIXTH_SEMESTER',
          'SEVENTH_SEMESTER',
          'EIGHTH_SEMESTER',
          'ABOVE_NINTH_SEMESTER',
        ];
      }

      if (formCreateRequestDto?.leaveOfAbsenceRegisteredSemesterList.includes('ALL_SEMESTER')) {
        formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList = [
          'FIRST_SEMESTER',
          'SECOND_SEMESTER',
          'THIRD_SEMESTER',
          'FOURTH_SEMESTER',
          'FIFTH_SEMESTER',
          'SIXTH_SEMESTER',
          'SEVENTH_SEMESTER',
          'EIGHTH_SEMESTER',
          'ABOVE_NINTH_SEMESTER',
        ];
      }

      createPostWithForm({
        title,
        content,
        isAnonymous,
        isQuestion,
        formCreateRequestDto: formCreateRequestDto as Post.PostCreateWithFormRequestDto['formCreateRequestDto'],
      });
      return;
    }

    const { title, content, isAnonymous, isQuestion } = data;
    const postId = await createPost({ title, content, isAnonymous, isQuestion });
    if (isVote) {
      const { title, options, allowAnonymous, allowMultiple } = data.voteCreateRequestDto as Post.CreateVoteDto;
      createVote({
        title,
        allowAnonymous,
        allowMultiple,
        options,
        postId,
      });
    }
  });

  return (
    <>
      <div className="bottom-5 top-0 h-full w-full lg:relative lg:bottom-28">
        <PreviousButton routeCallback={handleBack} />
        <div className="h-14 bg-[#F8F8F8]" />
        <div className="flex h-full flex-col overflow-y-auto p-2 lg:px-5">
          <FormProvider {...methods}>
            <PostCreationForm />
            {isVote && <VoteCreationForm />}
            {isApply && <FormCreationForm />}
            {selectedFileList.length > 0 && <UploadFilePreview />}
          </FormProvider>
        </div>
      </div>
      <PostCreationFormButtonGroup handleSubmit={handleSubmit} />
    </>
  );
};

export default CreatePostPage;
