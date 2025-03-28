"use client";
import { useState, useEffect } from "react";
import { checkIsAcademicRecordSubmitted, getUserAdmissionInfo } from "../api/get";
import { UserService, useUserStore } from "@/shared";
export const useVerification = () => {
  const { getMyInfo } = UserService();
  const [emailValue, setEmailValue] = useState("");
  const [admissionApplicationStatus, setAdmissionApplicationStatus] =
    useState<User.StatusType>("BANNED");
  const [academicRecordApplicationStatus, setAcademicRecordApplicationStatus] =
    useState<User.StatusType>("BANNED");
  const [admissionRejectMessage, setAdmissionRejectMessage] = useState("");
  const [academicRecordRejectMessage, setAcademicRecordRejectMessage] =
    useState("");
  const setEmail = useUserStore((state) => state.setEmail);
  const getInfo = async () => {
    try {
      const response = await getMyInfo();
      const { state, rejectionOrDropReason, email } = response.data;
      setEmailValue(email);
      setEmail(email)

      if (state === "REJECT") {
        setAdmissionApplicationStatus("REJECTED");
        setAcademicRecordApplicationStatus("BANNED");
        setAdmissionRejectMessage(rejectionOrDropReason);
        return;
      }

      if (state === "AWAIT") {
        setAcademicRecordApplicationStatus("BANNED");
        return checkAdmissionApplication();
      }

      if (state === "ACTIVE") {
        setAdmissionApplicationStatus("COMPLETE");
        return checkAcademicRecordApplication();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkAdmissionApplication = async () => {
    try {
      await getUserAdmissionInfo();
      setAdmissionApplicationStatus("AWAIT");
    } catch (error) {
      setAdmissionApplicationStatus("UNDONE");
    }
  };

  const checkAcademicRecordApplication = async () => {
    try {
      const { isRejected, rejectMessage } = (
        await checkIsAcademicRecordSubmitted()
      ).data;
      if (isRejected) {
        setAcademicRecordApplicationStatus("REJECTED");
        setAcademicRecordRejectMessage(rejectMessage);
      } else {
        setAcademicRecordApplicationStatus("AWAIT");
      }
    } catch (error) {
      setAcademicRecordApplicationStatus("UNDONE");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return {
    emailValue,
    admissionApplicationStatus,
    academicRecordApplicationStatus,
    admissionRejectMessage,
    academicRecordRejectMessage,
    getInfo,
    checkAdmissionApplication,
    checkAcademicRecordApplication,
  };
};