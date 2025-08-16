'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { FormCreationForm } from '@/fsd_widgets/form';
import { PostCreationForm, PostCreationFormButtonGroup } from '@/fsd_widgets/post';
import { VoteCreationForm } from '@/fsd_widgets/vote';

import {
  PostSchema,
  postSchema,
  UploadFilePreview,
  useCreatePostWithForm,
  usePostCreationStore,
  useUploadFileStore,
} from '@/fsd_entities/post';
import { useCreatePost } from '@/fsd_entities/post';
import { useCreateVote } from '@/fsd_entities/vote';

import { PreviousButton } from '@/fsd_shared';

const CreatePostPage = () => {
  const { isApply, isVote, clearPost } = usePostCreationStore(
    useShallow((state) => ({
      isApply: state.isApply,
      isVote: state.isVote,
      clearPost: state.clearPost,
    })),
  );

  const { selectedFileList, clearFileList } = useUploadFileStore(
    useShallow((state) => ({ selectedFileList: state.selectedFileList, clearFileList: state.clearFileList })),
  );
  const router = useRouter();

  const handleBack = () => {
    clearPost();
    clearFileList();
    router.back();
  };

  const { mutateAsync: createPost, isPending: isCreatingPost } = useCreatePost();

  const { mutate: createVote, isPending: isCreatingVote } = useCreateVote();
  const { mutate: createPostWithForm, isPending: isCreatingPostWithForm } = useCreatePostWithForm();

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
          questionCreateRequestDtoList: [
            {
              questionType: 'OBJECTIVE',
              questionText: '',
              isMultiple: false,
              optionCreateRequestDtoList: [
                {
                  optionText: '',
                },
              ],
            },
          ],
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
  const isSubmittingRef = useRef(false);

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (isSubmitting) {
      return;
    }

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;

    try {
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
    } finally {
      isSubmittingRef.current = false;
    }
  });

  const isSubmitting = isCreatingPost || isCreatingVote || isCreatingPostWithForm;
  return (
    <div className="grid h-full w-full grid-rows-[40px_1fr_auto] pt-3">
      <PreviousButton routeCallback={handleBack} className="pl-5" />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-y-auto p-2 lg:px-5">
          <PostCreationForm />
          {isVote && <VoteCreationForm />}
          {isApply && <FormCreationForm />}
          {selectedFileList.length > 0 && <UploadFilePreview />}

          <PostCreationFormButtonGroup disabled={isSubmitting} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePostPage;
