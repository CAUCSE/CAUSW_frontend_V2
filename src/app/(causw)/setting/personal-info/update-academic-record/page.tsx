"use client";

import { AcademicRecordForm } from "@/fsd_widgets/auth";
import { useUserStore } from "@/shared";
import React from "react";

const UpdataeAcademicRecordPage = () => {
  const curAcademicStatus = useUserStore((state) => state.academicStatus);
  return (
    <AcademicRecordForm curAcademicStatus={curAcademicStatus}/>
  );
};

export default UpdataeAcademicRecordPage;