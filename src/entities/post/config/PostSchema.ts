import { z } from 'zod';

const SEMESTER_LIST = [
  'ALL_SEMESTER',
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

const voteSchema = z.object({
  title: z.string().min(1, { message: '투표 제목을 입력해주세요.' }),
  allowAnonymous: z.boolean(),
  allowMultiple: z.boolean(),
  options: z.array(z.string().min(1, { message: '투표 항목을 입력해주세요.' })),
});

const formSchema = z
  .object({
    title: z.string().min(1, { message: '신청서 제목을 입력해주세요.' }),
    questionCreateRequestDtoList: z.array(
      z.object({
        questionType: z.enum(['SUBJECTIVE', 'OBJECTIVE']),
        questionText: z.string().min(1, { message: '질문을 입력해주세요.' }),
        isMultiple: z.boolean(),
        optionCreateRequestDtoList: z.array(
          z.object({
            optionText: z
              .string()
              .min(1, { message: '선택지를 입력해주세요.' }),
          }),
        ),
      }),
    ),
    isAllowedEnrolled: z.boolean(),
    allowAllEnrolledRegisteredSemester: z.boolean(),
    enrolledRegisteredSemesterList: z.array(
      z.enum(SEMESTER_LIST as [string, ...string[]]),
    ),
    isNeedCouncilFeePaid: z.boolean(),
    isAllowedLeaveOfAbsence: z.boolean(),
    allowAllLeaveOfAbsenceRegisteredSemester: z.boolean(),
    leaveOfAbsenceRegisteredSemesterList: z.array(
      z.enum(SEMESTER_LIST as [string, ...string[]]),
    ),
    isAllowedGraduation: z.boolean(),
  })
  .refine(
    (data) => {
      if (
        data.isAllowedEnrolled &&
        data.enrolledRegisteredSemesterList.length === 0
      ) {
        return false;
      }
      return true;
    },
    {
      message: '재학 학기를 선택해주세요.',
      path: ['enrolledRegisteredSemesterList'],
    },
  )
  .refine(
    (data) => {
      if (
        data.isAllowedLeaveOfAbsence &&
        data.leaveOfAbsenceRegisteredSemesterList.length === 0
      ) {
        return false;
      }
      return true;
    },
    {
      message: '수료 학기를 선택해주세요.',
      path: ['leaveOfAbsenceRegisteredSemesterList'],
    },
  );

export const postSchema = z.object({
  title: z.string().min(1, { message: '게시물 제목을 입력해주세요.' }),
  content: z.string().min(1, { message: '게시물 내용을 입력해주세요.' }),
  isAnonymous: z.boolean(),
  isQuestion: z.boolean(),
  formCreateRequestDto: formSchema.optional(),
  voteCreateRequestDto: voteSchema.optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
