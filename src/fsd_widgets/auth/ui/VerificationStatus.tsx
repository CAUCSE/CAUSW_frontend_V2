import { StatusButton } from "@/fsd_entities/auth";
import React from "react";
import { ADMISSION_MESSAGES, ACADEMIC_MESSAGES } from "../config/verificationStatus";

interface VerificationStatusProps {
  admissionApplicationStatus: User.StatusType;
  academicRecordApplicationStatus: User.StatusType;
  onAdmissionClick: () => void;
  onAcademicRecordClick: () => void;
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({
  admissionApplicationStatus,
  academicRecordApplicationStatus,
  onAdmissionClick,
  onAcademicRecordClick,
}) => {
  return (
        <div className="mt-2 space-y-4">
          <StatusButton
            status={admissionApplicationStatus}
            messages={ADMISSION_MESSAGES}
            onClick={onAdmissionClick}
          />

          <StatusButton
            status={academicRecordApplicationStatus}
            messages={ACADEMIC_MESSAGES}
            onClick={onAcademicRecordClick}
          />
        </div>
  );
};
