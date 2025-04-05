'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { HomeRscService } from '@/shared';

export function NewCalendarModal() {
  const [currImg, setCurrImg] = useState<File | null>();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const { createCalendar } = HomeRscService();

  const router = useRouter();

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const handleSubmit = async () => {
    if (!year || !month) {
      alert('년도와 월을 선택해주세요.');
      return;
    }
    if (!currImg) {
      alert('이미지를 선택해주세요.');
      return;
    }
    if (await createCalendar(currImg, +year, +month)) alert('저장되었습니다.');
    else alert('저장에 실패했습니다. 관리자에게 문의하세요');

    window.location.href = '/setting/home/calendar';
  };

  return (
    <div
      className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg"
      onClick={() => router.back()}
    >
      <div
        className="relative flex w-[80vw] flex-col items-center overflow-auto bg-white p-5 py-[30px] pb-[50px] max-lg:gap-[10px] lg:h-[70vh] lg:p-[50px]"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={() => router.back()} className="absolute left-[14px] top-[10px]">
          <i className="icon-[ep--close-bold]" />
        </button>
        <p className="w-full text-[21px] font-semibold lg:text-center lg:text-[40px]">캘린더 추가</p>

        <div className="flex w-full flex-col gap-[20px] lg:grid lg:grid-cols-[400px_1fr]">
          {/* 캘린더 이미지 선택 */}
          <div className="flex flex-col gap-[17px]">
            <div className="relative flex h-[250px] flex-col max-lg:w-[250px] lg:h-[400px]">
              <input
                className="hidden"
                id="file"
                type="file"
                accept="image/gif, image/jpeg, image/png"
                onChange={e => {
                  if (!e.target.files) return;
                  const file = e.target.files[0];
                  if (file) {
                    setCurrImg(file);
                  }
                }}
              />
              <label
                htmlFor="file"
                className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-black"
              >
                {currImg ? (
                  <Image
                    src={URL.createObjectURL(currImg)}
                    alt="calendar"
                    width={2070}
                    height={2070}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <i className="icon-[gravity-ui--plus] h-[40px] w-[40px] lg:h-[94px] lg:w-[94px]" />
                )}
              </label>
            </div>
            <p className="w-full whitespace-pre-wrap text-right text-[rgba(180,177,177,1)] max-lg:text-[10px]">
              이미지는 2070 * 2070 px 크기로 맞춰주세요.
              <br />
              10MB 이하의 이미지만 업로드 가능합니다.
            </p>
          </div>

          <div className="flex gap-3 max-lg:flex-col lg:mt-[30px] lg:gap-[30px]">
            <div className="flex h-fit items-center gap-[11px]">
              <p className="text-[20px] font-bold lg:text-[24px]">년</p>
              <FormControl>
                <InputLabel id="year-label">년도</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  value={year?.toString()}
                  type="number"
                  label="년도"
                  onChange={handleChangeYear}
                  style={{ width: '200px' }}
                  MenuProps={{
                    style: { maxHeight: 300 },
                  }}
                >
                  {/* from current year to 1972 */}
                  {Array.from({ length: new Date().getFullYear() - 1971 }, (_, i) => (
                    <MenuItem key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex h-fit items-center gap-[11px]">
              <p className="text-[20px] font-bold lg:text-[24px]">월</p>
              <FormControl>
                <InputLabel id="month-label">월</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={month?.toString()}
                  type="number"
                  label="월"
                  onChange={handleChangeMonth}
                  style={{ width: '100px' }}
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
        <button
          onClick={handleSubmit}
          className="h-[55px] w-[150px] rounded-lg bg-[#6BBEEC] font-semibold lg:mt-[50px] lg:w-[250px] lg:text-[24px]"
        >
          저장
        </button>
      </div>
    </div>
  );
}
