"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BannerManageModal() {
  const searchParams = useSearchParams();
  const bannerId = searchParams.get("bannerId");
  const bannerImg = searchParams.get("bannerImg");
  const [currImg, setCurrImg] = useState(bannerImg);
  const [url, setUrl] = useState("");

  const router = useRouter();

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
        <p className="text-[40px] font-semibold">
          이벤트 공지 배너 {bannerId ? "수정" : "추가"}
        </p>
        <div className="relative flex h-[150px] w-full flex-col">
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
            className="flex h-full cursor-pointer items-center justify-center rounded-xl border border-black"
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
        <p className="self-start text-[24px] text-red-500 underline underline-offset-2">
          이벤트 공지 URL
        </p>
        <input
          className="h-[120px] w-full rounded-2xl border border-black p-[20px] text-[20px]"
          placeholder="이벤트 공지 URL을 입력해주세요."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button className="mt-[20px] h-[55px] w-[250px] rounded-lg bg-[#6BBEEC] text-[24px] font-semibold">
          저장
        </button>
      </div>
    </div>
  );
}
