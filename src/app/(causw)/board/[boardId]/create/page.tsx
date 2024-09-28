"use client";

import {
  CreatePostFooter,
  FilePreview,
  PostForm,
  VotingForm,
} from "@/entities";
import { CustomCheckBox, Question } from "@/entities";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  PostRscService,
  PreviousButton,
  useCreatePostStore,
  useCreateVoteStore,
  useFileUpload,
} from "@/shared";
import React, { useEffect, useRef, useState } from "react";

import { STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR } from "next/dist/lib/constants";
import { all } from "axios";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @next/next/no-async-client-component
const CreatePostPage = (props: any) => {
  const boardId = props.params.boardId;
  const { createPost } = PostRscService();

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
    submitVote,
  } = useCreateVoteStore();
  const { selectedFiles, resetFiles } = useFileUpload();
  const router = useRouter();

  const methods = useForm<Post.PostCreateWithFormRequestDto>({
    defaultValues: {
      title: "",
      content: "",
      boardId: boardId,
      isAnonymous: false,
      isQuestion: false,
      formCreateRequestDto: {
        title: "",
        questionCreateRequestDtoList: [
          {
            questionType: "OBJECTIVE",
            questionText: "",
            isMultiple: false,
            optionCreateRequestDtoList: [
              {
                optionText: "",
              },
            ],
          },
        ],
        isAllowedEnrolled: false,
        enrolledRegisteredSemesterList: [],
        allowAllEnrolledRegisteredSemester: false,
        isNeedCouncilFeePaid: false,
        isAllowedLeaveOfAbsence: false,
        allowAllLeaveOfAbsenceRegisteredSemester: false,
        leaveOfAbsenceRegisteredSemesterList: [],
        isAllowedGraduation: false,
      },
      attachImageList: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formCreateRequestDto.questionCreateRequestDtoList",
  });

  const onSubmit = (data) => {
    //TODO 신청서 생성 완료 -> api 연동
    // if (selectedStatus.length === 0) {
    //   setError("allowedAcademicStatus", {
    //     type: "manual",
    //     message: "하나 이상의 항목을 선택해야 합니다.",
    //   });
    //   return;
    // }

    // if (selectedGrade.length === 0) {
    //   setError("allowedGrades", {
    //     type: "manual",
    //     message: "하나 이상의 항목을 선택해야 합니다.",
    //   });
    //   return;
    // }

    console.log(data);
  };

  const addSurveyForm = () => {
    append({
      questionType: "OBJECTIVE",
      questionText: "",
      isMultiple: false,
      optionCreateRequestDtoList: [{ optionText: "" }],
    });
  };

  const [isViewPointLg, setIsViewPointLg] = useState(false);
  useEffect(() => {
    const checkWidth = () => {
      setIsViewPointLg(window.innerWidth >= 1024 ? true : false);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const SemesterOptions = [
    { colSize: 1, name: "1-1 수료", value: "FIRST_SEMESTER" },
    { colSize: 1, name: "1-2 수료", value: "SECOND_SEMESTER" },
    { colSize: 1, name: "2-1 수료", value: "THIRD_SEMESTER" },
    { colSize: 1, name: "2-2 수료", value: "FOURTH_SEMESTER" },
    { colSize: 1, name: "3-1 수료", value: "FIFTH_SEMESTER" },
    { colSize: 1, name: "3-2 수료", value: "SIXTH_SEMESTER" },
    { colSize: 1, name: "4-1 수료", value: "SEVENTH_SEMESTER" },
    { colSize: 1, name: "4-2 수료", value: "EIGHTH_SEMESTER" },
    { colSize: 1, name: "5-1 이상", value: "ABOVE_NINTH_SEMESTER" },
  ];

  const handlePostSubmit = async () => {
    if (isVote) {
      submitVote();
    } else {
      const postRequest: Post.CreatePostDto = {
        title,
        content,
        boardId,
        isAnonymous,
        isQuestion,
      };
      try {
        const createPostResponse = await createPost(postRequest, selectedFiles);
        console.log("게시물 생성 완료: ", createPostResponse);
        clearPost();
        resetFiles();
        router.back();
      } catch (error) {
        console.error("게시물 생성 에러: ", error);
      }
    }
  };

  const isAllowedEnrolled = watch("formCreateRequestDto.isAllowedEnrolled");

  const isNeedCouncilFeePaid = watch(
    "formCreateRequestDto.isNeedCouncilFeePaid",
  );

  const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  useEffect(() => {
    console.log(isAllowedEnrolled);
    if (!isAllowedEnrolled) {
      setValue("formCreateRequestDto.isNeedCouncilFeePaid", false);
      if (enrolledRegisteredSemesterList.length > 0) {
        setValue("formCreateRequestDto.enrolledRegisteredSemesterList", []);
      }
      if (allowAllEnrolledRegisteredSemester) {
        setValue(
          "formCreateRequestDto.allowAllEnrolledRegisteredSemester",
          false,
        );
      }
    }
  }, [isAllowedEnrolled, setValue]);

  useEffect(() => {
    if (isNeedCouncilFeePaid) {
      setValue("formCreateRequestDto.isAllowedEnrolled", true);
    }
  }, [isNeedCouncilFeePaid, setValue]);

  const enrolledRegisteredSemesterList = watch(
    "formCreateRequestDto.enrolledRegisteredSemesterList",
  );

  const prevIsAllowedEnrolled = usePrevious(isAllowedEnrolled);

  useEffect(() => {
    if (enrolledRegisteredSemesterList.length > 0) {
      setValue(
        "formCreateRequestDto.allowAllEnrolledRegisteredSemester",
        false,
      );
      if (!isAllowedEnrolled && !prevIsAllowedEnrolled) {
        setValue("formCreateRequestDto.isAllowedEnrolled", true);
      }
    }
    if (enrolledRegisteredSemesterList.length === 9) {
      setValue("formCreateRequestDto.allowAllEnrolledRegisteredSemester", true);
      setValue("formCreateRequestDto.enrolledRegisteredSemesterList", []);
    }
  }, [enrolledRegisteredSemesterList, setValue]);

  const leaveOfAbsenceRegisteredSemesterList = watch(
    "formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList",
  );

  const isAllowedLeaveOfAbsence = watch(
    "formCreateRequestDto.isAllowedLeaveOfAbsence",
  );
  const prevIsAllowedLeaveOfAbsence = usePrevious(isAllowedLeaveOfAbsence);

  useEffect(() => {
    if (!isAllowedLeaveOfAbsence) {
      if (leaveOfAbsenceRegisteredSemesterList.length > 0) {
        setValue(
          "formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList",
          [],
        );
      }
      if (allowAllLeaveOfAbsenceRegisteredSemester) {
        setValue(
          "formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester",
          false,
        );
      }
    }
  }, [isAllowedLeaveOfAbsence, setValue]);

  useEffect(() => {
    if (leaveOfAbsenceRegisteredSemesterList.length > 0) {
      setValue(
        "formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester",
        false,
      );
      if (!isAllowedLeaveOfAbsence && !prevIsAllowedLeaveOfAbsence) {
        setValue("formCreateRequestDto.isAllowedLeaveOfAbsence", true);
      }
    }
    if (leaveOfAbsenceRegisteredSemesterList.length === 9) {
      setValue(
        "formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester",
        true,
      );
      setValue("formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList", []);
    }
  }, [leaveOfAbsenceRegisteredSemesterList, setValue]);

  const allowAllEnrolledRegisteredSemester = watch(
    "formCreateRequestDto.allowAllEnrolledRegisteredSemester",
  );

  useEffect(() => {
    if (allowAllEnrolledRegisteredSemester) {
      setValue("formCreateRequestDto.enrolledRegisteredSemesterList", []);
      setValue("formCreateRequestDto.allowAllEnrolledRegisteredSemester", true);
      if (!isAllowedEnrolled && !prevIsAllowedEnrolled) {
        setValue("formCreateRequestDto.isAllowedEnrolled", true);
      }
    }
  }, [allowAllEnrolledRegisteredSemester, setValue]);

  const allowAllLeaveOfAbsenceRegisteredSemester = watch(
    "formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester",
  );

  useEffect(() => {
    if (allowAllLeaveOfAbsenceRegisteredSemester) {
      setValue("formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList", []);
      setValue(
        "formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester",
        true,
      );
      if (!isAllowedLeaveOfAbsence && !prevIsAllowedLeaveOfAbsence) {
        setValue("formCreateRequestDto.isAllowedLeaveOfAbsence", true);
      }
    }
  }, [allowAllLeaveOfAbsenceRegisteredSemester, setValue]);

  useEffect(() => {
    if (fields.length === 0) {
      addSurveyForm();
    }
  }, [fields, addSurveyForm]);

  return (
    <>
      <div className="bottom-5 top-0 h-full w-full lg:relative lg:bottom-28">
        <div className="w-full flex-col items-center">
          <PreviousButton />
        </div>
        {/* 게시글 공통 부분 - 제목 / 내용 */}
        <div className="flex h-full flex-col p-4 pt-10 lg:px-5 lg:py-10">
          {isApply ? (
            <FormProvider {...methods}>
              <div className="h-full w-full">
                <div className="h-[calc(100%-9rem)] w-full overflow-y-auto">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col items-center gap-8 lg:items-start"
                  >
                    <div className="flex w-56 flex-col items-center border-b border-black">
                      <input
                        type="text"
                        id="title"
                        {...register("title", {
                          required: true,
                        })}
                        placeholder="신청서 제목 텍스트 필드"
                        className="h-10 bg-[#F8F8F8] text-xl placeholder:text-center"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">
                          신청서 제목을 입력해주세요
                        </p>
                      )}
                    </div>
                    <div className="flex h-full w-full flex-col items-center gap-5 lg:items-start">
                      <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[490px]">
                        <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                          <CustomCheckBox
                            colSize={1}
                            name="재학생"
                            register={register(
                              "formCreateRequestDto.isAllowedEnrolled",
                            )}
                          />
                          <CustomCheckBox
                            colSize={isViewPointLg ? 4 : 1}
                            name="학생회비 납부자"
                            register={register(
                              "formCreateRequestDto.isNeedCouncilFeePaid",
                            )}
                          />

                          <CustomCheckBox
                            colSize={1}
                            name="상관없음"
                            register={register(
                              "formCreateRequestDto.allowAllEnrolledRegisteredSemester",
                            )}
                          />
                          {SemesterOptions.map((grade, idx) => (
                            <CustomCheckBox
                              colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                              value={grade.value}
                              name={grade.name}
                              key={idx}
                              register={register(
                                "formCreateRequestDto.enrolledRegisteredSemesterList",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      {/* {errors.allowedAcademicStatus && (
                        <p className="text-red-500">
                          {errors.allowedAcademicStatus.message}
                        </p>
                      )} */}
                      <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
                      <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[490px]">
                        <div className="grid grid-cols-2 gap-x-5 gap-y-1 lg:grid-cols-5 lg:gap-2">
                          <CustomCheckBox
                            colSize={1}
                            name="휴학생"
                            register={register(
                              "formCreateRequestDto.isAllowedLeaveOfAbsence",
                            )}
                          />
                          <CustomCheckBox
                            colSize={isViewPointLg ? 4 : 1}
                            name="졸업생"
                            register={register(
                              "formCreateRequestDto.isAllowedGraduation",
                            )}
                          />
                          <CustomCheckBox
                            colSize={1}
                            name="상관없음"
                            register={register(
                              "formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester",
                            )}
                          />
                          {SemesterOptions.map((grade, idx) => (
                            <CustomCheckBox
                              colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                              value={grade.value}
                              name={grade.name}
                              key={idx}
                              register={register(
                                "formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      {/* {errors.allowedGrades && (
                        <p className="text-red-500">
                          {errors.allowedGrades.message}
                        </p>
                      )} */}
                      <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
                      <div className="flex w-3/4 min-w-[260px] flex-col bg-white lg:min-w-[500px]"></div>
                    </div>
                    {fields.map((field, idx) => {
                      return (
                        <Question
                          key={field.id}
                          index={idx}
                          removeQuestion={() => remove(idx)}
                        />
                      );
                    })}
                    <button
                      type="button"
                      onClick={addSurveyForm}
                      className="flex h-12 w-3/4 min-w-[260px] items-center justify-center rounded-xl bg-[#D9D9D9] text-[46px] font-bold lg:min-w-[490px]"
                    >
                      +
                    </button>
                  </form>
                </div>
              </div>
            </FormProvider>
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
