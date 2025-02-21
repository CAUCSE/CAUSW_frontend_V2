"use client";

import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { PostRscService } from "@/shared/hooks/services/PostRscService";
import toast from "react-hot-toast";
import { useCreatePostStore } from "@/shared/hooks/stores/post/create/useCreatePostStore";
import { useFileUploadStore } from "@/shared/hooks/stores/post/create/useFileUploadStore";
import { usePreviousValue } from "@/shared";

export const useCreateApply = (isApply: boolean) => {
  const params = useParams();
  const { boardId } = params;
  const router = useRouter();

  const methods = useForm<Post.PostCreateWithFormRequestDto>({
    defaultValues: {
      title: "",
      content: "",
      boardId: boardId as string,
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
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formCreateRequestDto.questionCreateRequestDtoList",
  });

  const { selectedFiles, clearFiles } = useFileUploadStore();

  const {
    title,
    content,
    isAnonymous,
    isQuestion,
    setContent,
    setTitle,
    setIsAnonymous,
    setIsQuestion,
    clearPost,
  } = useCreatePostStore();

  const { createPostWithForm } = PostRscService();

  const ALL_SEMESTER = [
    "FIRST_SEMESTER",
    "SECOND_SEMESTER",
    "THIRD_SEMESTER",
    "FOURTH_SEMESTER",
    "FIFTH_SEMESTER",
    "SIXTH_SEMESTER",
    "SEVENTH_SEMESTER",
    "EIGHTH_SEMESTER",
    "ABOVE_NINTH_SEMESTER",
  ];

  const onSubmit = async (data: any) => {
    if (
      data.formCreateRequestDto.enrolledRegisteredSemesterList.length === 0 &&
      data.formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList.length ===
        0 &&
      !data.formCreateRequestDto.isAllowedEnrolled &&
      !data.formCreateRequestDto.isAllowedGraduation &&
      !data.formCreateRequestDto.isNeedCouncilFeePaid &&
      !data.formCreateRequestDto.isAllowedLeaveOfAbsence
    ) {
      setError("formCreateRequestDto.isAllowedLeaveOfAbsence", {
        type: "manual",
        message: "신청 가능 대상을 하나 이상 지정해주세요",
      });
      return;
    }

    if (
      data.formCreateRequestDto.isAllowedEnrolled &&
      data.formCreateRequestDto.enrolledRegisteredSemesterList.length === 0 &&
      !data.formCreateRequestDto.allowAllEnrolledRegisteredSemester
    ) {
      setError("formCreateRequestDto.isAllowedEnrolled", {
        type: "manual",
        message: "신청 가능 학년을 하나 이상 지정해주세요 ",
      });
      return;
    }

    if (
      data.formCreateRequestDto.isAllowedLeaveOfAbsence &&
      data.formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList.length ===
        0 &&
      !data.formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester
    ) {
      setError("formCreateRequestDto.isAllowedLeaveOfAbsence", {
        type: "manual",
        message: "신청 가능 학년을 하나 이상 지정해주세요",
      });
    }
    const postCreateWithFormRequestDto = { ...data };
    if (
      postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllEnrolledRegisteredSemester
    ) {
      postCreateWithFormRequestDto.formCreateRequestDto.enrolledRegisteredSemesterList =
        ALL_SEMESTER;
      delete postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllEnrolledRegisteredSemester;
    }

    if (
      postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllLeaveOfAbsenceRegisteredSemester
    ) {
      postCreateWithFormRequestDto.formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList =
        ALL_SEMESTER;
      delete postCreateWithFormRequestDto.formCreateRequestDto
        .allowAllLeaveOfAbsenceRegisteredSemester;
    }

    postCreateWithFormRequestDto.formCreateRequestDto.questionCreateRequestDtoList.forEach(
      (question: Post.QuestionCreateRequestDto) => {
        if (question.questionType === "SUBJECTIVE") {
          question.optionCreateRequestDtoList.length = 0;
          question.isMultiple = false;
        }
      },
    );

    try {
      await createPostWithForm(postCreateWithFormRequestDto, selectedFiles);
      clearPost();
      clearFiles();
      router.back();
    } catch (error) {
      toast.error("게시물 생성 실패");
    }
  };

  const addSurveyForm = useCallback(() => {
    append({
      questionType: "OBJECTIVE",
      questionText: "",
      isMultiple: false,
      optionCreateRequestDtoList: [{ optionText: "" }],
    });
  }, [append]);

  const isAllowedEnrolled = watch("formCreateRequestDto.isAllowedEnrolled");

  const isNeedCouncilFeePaid = watch(
    "formCreateRequestDto.isNeedCouncilFeePaid",
  );

  useEffect(() => {
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

  const prevIsAllowedEnrolled = usePreviousValue<boolean>(isAllowedEnrolled);

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
  }, [enrolledRegisteredSemesterList]);

  const leaveOfAbsenceRegisteredSemesterList = watch(
    "formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList",
  );

  const isAllowedLeaveOfAbsence = watch(
    "formCreateRequestDto.isAllowedLeaveOfAbsence",
  );
  const prevIsAllowedLeaveOfAbsence = usePreviousValue<boolean>(
    isAllowedLeaveOfAbsence,
  );

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
  }, [isAllowedLeaveOfAbsence]);

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
  }, [leaveOfAbsenceRegisteredSemesterList]);

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
  }, [allowAllEnrolledRegisteredSemester]);

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
  }, [allowAllLeaveOfAbsenceRegisteredSemester]);

  useEffect(() => {
    if (fields.length === 0) {
      addSurveyForm();
    }
  }, [fields, addSurveyForm]);

  const postTitle = watch("title");
  const postContent = watch("content");
  const postIsAnonymous = watch("isAnonymous");
  const postIsQuestion = watch("isQuestion");

  useEffect(() => {
    if (isApply) {
      setTitle(postTitle);
      setContent(postContent);
      setIsAnonymous(postIsAnonymous);
      setIsQuestion(postIsQuestion);
    }
  }, [postTitle, postContent, postIsAnonymous, postIsQuestion]);

  useEffect(() => {
    if (!isApply) {
      setValue("title", title);
      setValue("content", content);
      setValue("isAnonymous", isAnonymous);
      setValue("isQuestion", isQuestion);
    }
  }, [title, content, isAnonymous, isQuestion]);

  return {
    methods,
    register,
    watch,
    errors,
    fields,
    remove,
    handleSubmit,
    addSurveyForm,
    onSubmit,
  };
};
