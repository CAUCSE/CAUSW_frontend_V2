"use client";

import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

import Image from "next/image";
import { PreviousButton } from "@/shared";

interface IFormInput {
  searchContent: string;
}

const ModalContent = () => (
  <div className="flex flex-col items-center">
    <h1 className="pb-10 text-lg font-bold md:text-xl">
      이미 존재하는 게시판 이름
    </h1>
    <p className="text-center">동일한 이름의 게시판이 이미 존재합니다.</p>
    <p className="pb-10 text-center">다른 이름을 입력해주세요</p>
  </div>
);

const SearchPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //TODO 검색 api 연동
    console.log(data);
  };

  return (
    <div className="absolute bottom-24 top-28 w-full overflow-y-auto bg-boardPageBackground p-5 scrollbar-hide md:bottom-0 md:left-40 md:right-72 md:top-0 md:w-auto">
      <div className="flex h-full w-full flex-col items-center">
        <PreviousButton />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Image
            src="/images/search_bg.png"
            alt="검색화면배경사진"
            width={150}
            height={150}
          />
          <p className="text-2xl">게시물을 검색해주세요 !</p>
        </div>
        <div className="flex h-12 w-full justify-center">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-between gap-4 lg:w-3/4"
          >
            <input
              className="w-full rounded-3xl border border-black text-center"
              type="text"
              {...register("searchContent", { required: true })}
              id="searchContent"
              placeholder="글 제목, 내용, 해시태그"
            />
            <button
              className="w-36 rounded-3xl bg-red-500 text-white"
              type="submit"
            >
              검색
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchPost;
