"use client";

import { HomeRscService } from "@/shared";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function EventEditModal({ bannerId }: { bannerId?: string }) {
  const searchParams = useSearchParams();
  const bannerImg = searchParams.get("bannerImg");
  const _url = searchParams.get("url");
  const [currImg, setCurrImg] = useState<File | null>();
  const [url, setUrl] = useState(_url ? _url : "");

  const { createEvent, updateEvent } = HomeRscService();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!bannerId) {
      if (!currImg || !url) {
        alert("사진과 url을 입력해주세요.");
        return;
      }
      const done = await createEvent(currImg, url);
      if (!done) alert("저장에 실패했습니다. 관리자에게 문의하세요");
      alert("저장되었습니다.");
    } else {
      // updateEvent
      if (!url) {
        alert("url을 입력해주세요.");
        return;
      }
      const done = currImg
        ? await updateEvent(bannerId, currImg, url)
        : await updateEvent(bannerId, null, url);
      if (!done) alert("수정에 실패했습니다. 관리자에게 문의하세요");
    }

    window.location.href = "/setting/home/event";
  };

  return (
    <div
      className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg"
      onClick={() => router.back()}
    >
      <div
        className="relative flex flex-col items-center overflow-auto bg-white p-5 py-[30px] pb-[50px] max-lg:gap-[10px] lg:h-[70vh] lg:p-[50px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute left-[14px] top-[10px]"
        >
          <i className="icon-[ep--close-bold]" />
        </button>
        <p className="w-full text-[21px] font-semibold lg:text-center lg:text-[40px]">
          이벤트 공지 배너 {bannerId ? "수정" : "추가"}
        </p>
        <div className="relative flex h-[150px] w-[1100px] flex-col">
          <input
            className="hidden"
            id="file"
            type="file"
            accept="image/gif, image/jpeg, image/png"
            onChange={(e) => {
              if (!e.target.files) return;
              const file = e.target.files[0];
              if (file) {
                setCurrImg(file);
              }
            }}
          />
          <label
            htmlFor="file"
            className="flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-black"
          >
            {bannerImg || currImg ? (
              currImg ? (
                <Image
                  alt={""}
                  width={1100}
                  height={150}
                  src={URL.createObjectURL(currImg)}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                bannerImg && (
                  <Image
                    alt={""}
                    width={1100}
                    height={150}
                    src={bannerImg}
                    className="h-full w-full rounded-lg object-cover"
                  />
                )
              )
            ) : (
              <i className="icon-[gravity-ui--plus] h-[94px] w-[94px]" />
            )}
          </label>
        </div>
        <p className="w-full whitespace-pre-wrap text-right text-[rgba(180,177,177,1)] max-lg:text-[10px]">
          이미지는 1100 * 150 px 크기로 맞춰주세요.
          <br />
          10MB 이하의 이미지만 업로드 가능합니다.
        </p>
        <p className="self-start text-[20px] text-red-500 underline underline-offset-2 lg:text-[24px]">
          이벤트 공지 URL
        </p>
        <input
          className="h-[120px] w-full rounded-2xl border border-black p-[20px] text-[14px] lg:text-[20px]"
          placeholder="이벤트 공지 URL을 입력해주세요."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button
          className="mt-[40px] h-[55px] w-[250px] rounded-lg bg-[#6BBEEC] max-lg:w-[150px] lg:mt-[80px] lg:text-[24px] lg:font-semibold"
          onClick={handleSubmit}
        >
          {bannerId ? "배너 수정" : "저장"}
        </button>
      </div>
    </div>
  );
}
