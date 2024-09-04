"use client";

import { CSVLink } from "react-csv";
import { Headers, Data } from "react-csv/lib/core";

export const ExcelExport = ({
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
};
