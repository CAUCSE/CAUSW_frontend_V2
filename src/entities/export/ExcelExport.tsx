"use client";

export const ExcelExport = ({
  exportType,
}: {
  exportType: Setting.ExportType;
}) => {
  console.log(exportType);
  return (
    <div className="absolute right-0 flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black text-lg md:top-2">
      Excel Export
    </div>
  );
};

//Export 서버 다운으로 구조가 바뀜에 따라 불필요
/* export const ExcelExport = ({
  data,
  headers,
}: {
  data: Data;
  headers: Headers;
}) => {
  return (
    <CSVLink
      headers={headers}
      data={data}
      filename="causw.csv"
      target="_blank"
      className="absolute right-0 md:top-2"
    >
      <div className="flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black text-lg">
        Excel Export
      </div>
    </CSVLink>
  );
}; */
