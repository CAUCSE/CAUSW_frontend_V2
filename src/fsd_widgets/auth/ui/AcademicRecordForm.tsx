import React from 'react';

import {
  academicRecordValidationRules,
  AcademicStatusSelect,
  AuthFormSubmitButton,
  InfoTextArea,
  useAcademicRecordForm,
} from '@/fsd_entities/auth';

import { ImageUploadField, MESSAGES, PreviousButton } from '@/fsd_shared';
import { Header } from '@/fsd_shared';

import { getYearOptions, MONTH_OPTIONS, SEMESTER_OPTIONS, STATUS_OPTIONS } from '../config/academicRecord';

interface AcademicRecordFormProps {
  curAcademicStatus: User.AcademicStatus;
  onClose?: () => void;
  rejectionReason?: string;
}

export const AcademicRecordForm = ({ curAcademicStatus, onClose, rejectionReason }: AcademicRecordFormProps) => {
  const { register, handleSubmit, watch, errors, onSubmit, onInvalid, setValue } = useAcademicRecordForm({
    curAcademicStatus,
  });

  const yearOptions = getYearOptions();
  const targetAcademicStatus = watch('targetAcademicStatus');

  return (
    <>
      <PreviousButton></PreviousButton>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="items-left justify-left bg-board-page-background flex min-h-screen flex-col gap-y-4 p-8 sm:p-16"
      >
        <Header bold>학부 재학 증빙 서류 제출</Header>
        <p className="hidden text-gray-600 lg:block">
          재학 중일 시 학부 사무실, 동문회 등의 사업/행사 신청을 위한 증빙 절차입니다. 증빙이 되지 않으면 휴학/졸업이
          아닌 재학 중인 회원은 서비스 이용이 어렵습니다.
        </p>
        <AcademicStatusSelect
          register={register}
          name="targetAcademicStatus"
          label="본 학기 학적 상태"
          options={STATUS_OPTIONS.filter((opt) => opt.value !== curAcademicStatus)}
          rules={academicRecordValidationRules.targetAcademicStatus}
          errorMessage={errors.targetAcademicStatus?.message}
        />

        {targetAcademicStatus === 'ENROLLED' && (
          <AcademicStatusSelect
            register={register}
            name="targetCompletedSemester"
            label="본 학기 기준 등록 완료 학기 차수"
            options={SEMESTER_OPTIONS}
            rules={academicRecordValidationRules.targetCompletedSemester}
            errorMessage={errors.targetCompletedSemester?.message}
          />
        )}

        {targetAcademicStatus === 'GRADUATED' && (
          <>
            <AcademicStatusSelect
              register={register}
              name="graduationYear"
              label="졸업 년도"
              options={yearOptions}
              rules={academicRecordValidationRules.graduationYear}
              errorMessage={errors.graduationYear?.message}
            />
            <AcademicStatusSelect
              register={register}
              name="graduationType"
              label="졸업 월"
              options={MONTH_OPTIONS}
              rules={academicRecordValidationRules.graduationType}
              errorMessage={errors.graduationType?.message}
            />
          </>
        )}
        <InfoTextArea
          register={register}
          name="note"
          label="유저 작성 특이사항"
          placeholder="(선택) 특이사항을 작성해주세요. (500자 이내)"
          rules={academicRecordValidationRules.note}
          errorMessage={errors.note?.message}
        />
        {targetAcademicStatus === 'ENROLLED' && (
          <ImageUploadField
            setValue={setValue}
            name="images"
            label="증빙 서류 업로드"
            errorMessage={errors.images?.message}
            maxFiles={1}
          >
            <p className="text-md text-error mt-1">mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요.</p>
            <p className="text-md text-error">(이외의 파일로는 재학 증빙이 불가능합니다.)</p>
            <p className="mb-2 text-sm text-gray-400">{MESSAGES.FILE_TYPE_INFO}</p>
          </ImageUploadField>
        )}
        <AuthFormSubmitButton content="제출" />
      </form>
    </>
  );
};
