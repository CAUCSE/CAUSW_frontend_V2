"use client";

import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewCalendarModal({ bannerId }: { bannerId?: string }) {
  const [currImg, setCurrImg] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const router = useRouter();

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  return (
    <div
      className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg"
      onClick={() => router.back()}
    >
      <div
        className="relative flex h-[70vh] w-[80vw] flex-col items-center overflow-auto bg-white p-[50px] pb-[50px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute left-[14px] top-[10px]"
        >
          <i className="icon-[ep--close-bold]" />
        </button>
        <p className="text-[40px] font-semibold">캘린더 추가</p>

        <div className="grid w-full grid-cols-[400px_1fr] gap-[20px]">
          {/* 캘린더 이미지 선택 */}
          <div className="flex flex-col gap-[17px]">
            <div className="relative flex h-[400px] flex-col">
              <input
                className="hidden"
                id="file"
                type="file"
                accept="image/gif, image/jpeg, image/png"
                onChange={(e) => {
                  if (!e.target.files) return;
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setCurrImg(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label
                htmlFor="file"
                className="flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-black"
              >
                {currImg ? (
                  <img
                    src={currImg}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <i className="icon-[gravity-ui--plus] h-[94px] w-[94px]" />
                )}
              </label>
            </div>
            <p className="w-full whitespace-pre-wrap text-right text-[rgba(180,177,177,1)]">
              이미지는 1100 * 150 px 크기로 맞춰주세요.
              <br />
              10MB 이하의 이미지만 업로드 가능합니다.
            </p>
          </div>

          <div className="mt-[30px] flex gap-[30px]">
            <div className="flex h-fit items-center gap-[11px]">
              <p className="text-[24px] font-bold">년</p>
              <FormControl>
                <InputLabel id="year-label">년도</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  value={year?.toString()}
                  type="number"
                  label="년도"
                  onChange={handleChangeYear}
                  style={{ width: "200px" }}
                  MenuProps={{
                    style: { maxHeight: 300 },
                  }}
                >
                  {/* from current year to 1972 */}
                  {Array.from(
                    { length: new Date().getFullYear() - 1971 },
                    (_, i) => (
                      <MenuItem key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="flex h-fit items-center gap-[11px]">
              <p className="text-[24px] font-bold">월</p>
              <FormControl>
                <InputLabel id="month-label">월</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={month?.toString()}
                  type="number"
                  label="월"
                  onChange={handleChangeMonth}
                  style={{ width: "100px" }}
                  MenuProps={{
                    style: { maxHeight: 300 },
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <button className="mt-[50px] h-[55px] w-[250px] rounded-lg bg-[#6BBEEC] text-[24px] font-semibold">
          저장
        </button>
      </div>
    </div>
  );
}
