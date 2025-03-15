import { PageableObject } from "./form.d";
declare namespace Form {
  export interface ICustomCheckBox {
    colSize: 1 | 2 | 3 | 4 | 5;
    // targetValue: any;
    // callback: ChangeEventHandler<HTMLInputElement>;
    value?: any;
    name: string;
    register: any;
  }

  export interface QuestionReplyRequestDtoList {
    questionReplyRequestDtoList: QuestionReplyRequestDto[];
  }

  export interface QuestionReplyRequestDto {
    questionId: string;
    questionReply: string | null;
    selectedOptionList: number[];
  }

  export interface OptionProps {
    questionIndex: number;
    optionIndex: number;
    removeOption: () => void;
  }

  export interface QuestionProps {
    index: number;
    removeQuestion: () => void;
  }

  export interface QuestionSummaryResponseDto {
    questionId: string;
    questionType: Post.QuestionType;
    questionText: string;
    questionAnswerList: string[] | null;
    optionSummarieList: OptionSummaryResponseDto[] | null;
  }

  export interface OptionSummaryResponseDto {
    optionId: string;
    optionNumber: number;
    optionText: string;
    selectedCount: number;
  }

  export interface ReplyPageResponseDto {
    questionResponseDtoList: Post.QuestionResponseDto[];
    replyResponseDtoPage: ReplyResponseDtoPage;
  }

  export interface ReplyResponseDtoPage extends Pagination.PageableObject {
    content: ReplyResponseDto[];
  }

  export interface ReplyResponseDto {
    replyUserResponseDto: ReplyUserResponseDto;
    replyQuestionResponseDtoList: ReplyQuestionResponseDto[];
    createdAt: string;
  }

  export interface ReplyUserResponseDto {
    userId: string;
    email: string;
    name: string;
    nickName: string;
    admissionYear: number;
    studentId: string;
    major: string;
    phoneNumber: string;
    academicStatus: AcademicStatusType;
    currentCompletedSemester: number;
    graduationYear: number;
    graduationType: GraduationYearType;
    createdAt: string;
    isAppliedThisSemester: boolean;
    paidAt: number;
    numOfPaidSemester: number;
    restOfSemester: number;
    isRefunded: boolean;
  }

  export interface ReplyQuestionResponseDto {
    questionId: string;
    questionAnswer: string;
    selectedOptionList: number[];
  }

  type AcademicStatusType =
    | "ENROLLED"
    | "LEAVE_OF_ABSENCE"
    | "GRADUATED"
    | "DROPPED_OUT"
    | "PROBATION"
    | "PROFESSOR"
    | "UNDETERMINED";

  type GraduationYearType = "FEBRUARY" | "AUGUST";

  export type TResultView = "summary" | "detail";
}
