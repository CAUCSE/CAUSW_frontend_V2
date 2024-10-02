"use client";

import { AxiosResponse } from "axios";
import { API } from "@/shared";

export const ExcelExport = ({
  exportType,
  id,
}: {
  exportType: Setting.ExportType;
  id?: string;
}) => {
  return (
    <div
      onClick={() => {
        getExcelFile(exportType, id);
      }}
      className="absolute right-0 flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black text-lg md:top-2"
    >
      Excel Export
    </div>
  );
};

const getExcelFile = async (type: Setting.ExportType, id?: string) => {
  const { data } = (await API.get(
    type === "PAYERS"
      ? "/api/v1/user-council-fee/export/excel"
      : type === "ALL_USERS" || type === "WAITING_USERS"
        ? "/api/v1/users/academic-record/export"
        : type === "CIRCLE_MEMBERS" || type === "CIRCLE_APPLY_USERS"
          ? `/api/v1/circles/${id}/users/excel`
          : "/api/v1/users/export",
    {
      responseType: "blob", // 중요: Blob으로 받기
    },
  )) as AxiosResponse<Blob>;

  const url = window.URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = "type.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

/*
  GET
  /api/v1/users/export
  사용자 정보 엑셀 다운로드 API(완료)

  GET
  /api/v1/circles/{circleId}/users/excel
  동아리원 엑셀 다운로드 API

  GET
  /api/v1/users/academic-record/export
  학적 정보 엑셀 파일로 내보내기(관리자용)

  GET
  /api/v1/user-council-fee/export/excel
  학생회비 엑셀 다운로드
*/
