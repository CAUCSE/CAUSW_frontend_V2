'use client';

import { useEffect, useRef } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { FormCreationForm } from '@/widgets/form';
import { PostCreationForm, PostCreationFormButtonGroup } from '@/widgets/post';
import { VoteCreationForm } from '@/widgets/vote';

import {
  PostSchema,
  postSchema,
  UploadFilePreview,
  useCreatePostWithForm,
  usePostCreationStore,
  useUploadFileStore,
} from '@/entities/post';
import { useCreatePost } from '@/entities/post';
import { useCreateVote } from '@/entities/vote';

import { PreviousButton } from '@/shared';

const CreatePostPage = () => {
  const { isApply, isVote, clearPost } = usePostCreationStore(
    useShallow((state) => ({
      isApply: state.isApply,
      isVote: state.isVote,
      clearPost: state.clearPost,
    })),
  );

  const { selectedFileList, clearFileList } = useUploadFileStore(
    useShallow((state) => ({
      selectedFileList: state.selectedFileList,
      clearFileList: state.clearFileList,
    })),
  );
  const router = useRouter();

  const handleBack = () => {
    clearPost();
    clearFileList();
    router.back();
  };
  const boardId = useParams().boardId;
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: createVote } = useCreateVote();
  const { mutateAsync: createPostWithForm } = useCreatePostWithForm();

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
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;

    try {
      let postId: Post.PostDto['id'] | undefined;
      if (isApply) {
        const { title, content, isAnonymous, isQuestion } = data;
        const { formCreateRequestDto } = data;
        if (
          formCreateRequestDto?.enrolledRegisteredSemesterList.includes(
            'ALL_SEMESTER',
          )
        ) {
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

        if (
          formCreateRequestDto?.leaveOfAbsenceRegisteredSemesterList.includes(
            'ALL_SEMESTER',
          )
        ) {
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

        postId = await createPostWithForm({
          title,
          content,
          isAnonymous,
          isQuestion,
          formCreateRequestDto:
            formCreateRequestDto as Post.PostCreateWithFormRequestDto['formCreateRequestDto'],
        });
      } else {
        const { title, content, isAnonymous, isQuestion } = data;

        postId = await createPost({ title, content, isAnonymous, isQuestion });

        if (isVote) {
          const { title, options, allowAnonymous, allowMultiple } =
            data.voteCreateRequestDto as Post.CreateVoteDto;

          postId = await createVote({
            title,
            allowAnonymous,
            allowMultiple,
            options,
            postId,
          });
        }
      }
      if (postId) {
        router.replace(`/board/${boardId}/${postId}`);
        clearPost();
        clearFileList();
      }
    } catch (error) {
      isSubmittingRef.current = false;
    }
  });

  const isSubmitting = isSubmittingRef.current;

  return (
    <div className="grid h-full w-full grid-rows-[40px_1fr_auto] pt-3">
      <PreviousButton routeCallback={handleBack} className="pl-5" />

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col overflow-y-auto p-2 lg:px-5"
        >
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
