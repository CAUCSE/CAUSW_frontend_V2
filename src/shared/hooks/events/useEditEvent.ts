"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HomeService } from "@/shared/hooks/services/HomeService";
import toast from "react-hot-toast";
import { useEventStore } from "@/shared/hooks/stores/event/useEventStore";

export const useEditEvent = ({ bannerId }: { bannerId?: string }) => {
  const searchParams = useSearchParams();
  const bannerImg = searchParams.get("bannerImg");
  const _url = searchParams.get("url");

  const router = useRouter();

  const [currImg, setCurrImg] = useState<File | null>();
  const [url, setUrl] = useState(_url ? _url : "");

  const { useCreateEvent, useUpdateEvent } = HomeService();
  const { mutateAsync: createEvent } = useCreateEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();

  const eventList = useEventStore((state) => state.eventList);

  const handleSubmit = async () => {
    if (!bannerId) {
      if (!currImg || !url) {
        toast.error("사진과 URL 을 입력해주세요.");
        return;
      }

      if (eventList && eventList.length >= 10) {
        toast.error("이벤트 공지는 최대 10개까지\n등록 가능합니다.");
        return;
      }
      await createEvent({ bannerImg: currImg, url });
    } else {
      if (!url) {
        toast.error("이벤트 공지 URL을 입력해주세요");
        return;
      }
      await updateEvent({ id: bannerId as string, bannerImg: currImg, url });
    }
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setCurrImg(file);
    }
  };

  const handleEditEventUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return {
    bannerImg,
    currImg,
    url,
    handleSubmit,
    handleUploadImage,
    handleEditEventUrl,
  };
};
