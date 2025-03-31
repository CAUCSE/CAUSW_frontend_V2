import { academicRecordValidationRules, AcademicStatusSelect, AuthFormSubmitButton, InfoTextArea, useAcademicRecordForm } from "@/fsd_entities/auth";
import { ImageUploadField, PreviousButton } from "@/fsd_shared";
import React from "react";
import { AcademicRecordFormHeader } from "./AcademicRecordFormHeader";
import { STATUS_OPTIONS, SEMESTER_OPTIONS, getYearOptions, MONTH_OPTIONS } from "../config/academicRecord";

interface AcademicRecordFormProps {
  curAcademicStatus: "ENROLLED" | "LEAVE_OF_ABSENCE" | "GRADUATED" | "UNDEFINED"; // undefined는 신규 사용자자
  onClose?: () => void;
  rejectionReason?: string;
}

export const AcademicRecordForm = ({curAcademicStatus, onClose, rejectionReason}: AcademicRecordFormProps) => {
  const { register, handleSubmit, watch, errors, onSubmit, onInvalid, setValue } = useAcademicRecordForm({curAcademicStatus});

  const yearOptions = getYearOptions();
  const targetAcademicStatus = watch("targetAcademicStatus");

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="min-h-screen bg-boardPageBackground flex flex-col items-left justify-left gap-y-4 p-8 sm:p-16">
      <PreviousButton></PreviousButton>
      <AcademicRecordFormHeader></AcademicRecordFormHeader>
      <AcademicStatusSelect
        register={register}
        name="targetAcademicStatus"
        label="본 학기 학적 상태"
        options={STATUS_OPTIONS.filter((opt) => opt.value !== curAcademicStatus)}
        rules={academicRecordValidationRules.targetAcademicStatus}
        errorMessage={errors.targetAcademicStatus?.message}
      />

      {targetAcademicStatus === "ENROLLED" && (
        <AcademicStatusSelect
          register={register}
          name="targetCompletedSemester"
          label="본 학기 기준 등록 완료 학기 차수"
          options={SEMESTER_OPTIONS}
          rules={academicRecordValidationRules.targetCompletedSemester}
          errorMessage={errors.targetCompletedSemester?.message}
        />
      )}

      {targetAcademicStatus === "GRADUATED" && (
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
        placeholder="특이사항을 작성해주세요. (500자 이내)"
        rules={academicRecordValidationRules.note}
        errorMessage={errors.note?.message}
      />
      {targetAcademicStatus === "ENROLLED" && (
        <ImageUploadField
          setValue={setValue}
          name="images"
          label="증빙 서류 업로드"
          errorMessage={errors.images?.message}
        >          
          <p className="text-md text-error mt-1">
            mportal &gt; 내 정보수정 &gt; 등록현황 캡처본을 첨부해주세요. 
          </p>
          <p className="text-md text-error mb-2">
            (이외의 파일로는 재학 증빙이 불가능합니다.)
          </p>
        </ImageUploadField>
      )}
      <AuthFormSubmitButton content="제출"/>
    </form>
  );
};