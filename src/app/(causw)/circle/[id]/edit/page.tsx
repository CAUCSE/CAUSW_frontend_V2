"use client";

//API 호출을 최소화하기 위해 관리자로 접속시 이미지와 학번이 관리자로 표기됨.

import { CircleRscService, CircleService, useUserStore } from "@/shared";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/utils";
import { LoadingComponent, Header, SubHeader, ProfileImage } from "@/entities";

const CircleDetailEdit = ({ params: { id } }: { params: { id: string } }) => {
  const { getCircle } = CircleRscService();
  const { editCircle } = CircleService();

  const [circle, setCircle] = useState<Circle.CircleRequestDto>();
  const [mainImg, setMainImg] = useState<File | undefined>();

  const circleIdIfLeader = useUserStore((state) => state.circleIdIfLeader);
  const admissionYear = useUserStore((state) => state.admissionYear);
  const profileImage = useUserStore((state) => state.profileImage);
  const isAdmin = useUserStore((state) => state.isAdmin);

  const router = useRouter();

  const handleChange = debounce(
    <K extends keyof Circle.CircleRequestDto>(
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      key: K,
    ) => {
      const newCircle = { ...circle };

      newCircle[key] =
        key === "joinedAt"
          ? ((event.target.value +
              "T23:59:59.999999") as Circle.CircleRequestDto[K])
          : (event.target.value as Circle.CircleRequestDto[K]);

      setCircle(newCircle as Circle.CircleRequestDto);
    },
    300,
  );

  useEffect(() => {
    if (!isAdmin() && !circleIdIfLeader?.includes(id))
      router.push("/no-permission");

    (async () => {
      const data = await getCircle(id);
      setCircle(data);
    })();
  }, []);

  if (!circle) return <LoadingComponent />;

  const submitHandler = () => {
    const formData = new FormData();

    formData.append(
      "circleUpdateRequestDto",
      new Blob(
        [
          JSON.stringify({
            name: circle.name,
            description: circle.description,
            circleTax: circle.circleTax,
            recruitMembers: circle.numMember,
            recruitEndDate: circle.joinedAt,
            isRecruit: circle.isRecruit,
          }),
        ],
        { type: "application/json" },
      ),
    );

    if (mainImg)
      formData.append(
        "mainImage",
        new Blob([mainImg], { type: mainImg.type }),
        mainImg.name,
      );

    editCircle(id, formData);
  };

  return (
    <>
      <div className="ml-[3%] mt-8 grid h-[800px] w-[90%] grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_1fr_4fr_6fr_1fr_1fr_1fr_1fr_1fr] gap-4 md:mt-[6%] lg:h-5/6">
        <div className="col-span-3 min-h-24 md:row-span-2">
          <div
            onClick={() => router.back()}
            className="mb-4 flex items-center text-lg"
          >
            <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
            이전
          </div>
          <Header bold>{circle.name}</Header>
        </div>

        <label
          className="row-span-4 flex min-h-36 min-w-36 items-center overflow-hidden"
          htmlFor="upload"
        >
          <img
            src={
              mainImg
                ? URL.createObjectURL(mainImg)
                : (circle.mainImage ?? "/images/signin-logo.png")
            }
            alt={"Circle Image"}
            className="h-36 w-36 rounded-2xl object-cover md:h-64 md:w-64"
          />
        </label>
        <input
          type="file"
          id="upload"
          className="hidden"
          name="upload"
          accept="image/*"
          capture="environment"
          onChange={(event) => {
            if (event.target.files) setMainImg(event.target.files[0]);
          }}
        ></input>

        <div className="col-span-2 flex flex-col text-sm md:h-10 md:flex-row md:items-center md:text-lg">
          <div className="mr-4 font-bold lg:mr-6">동아리 회비</div>
          <div>
            <input
              type="number"
              placeholder={"" + circle.circleTax}
              className="mr-1 w-24 rounded-md text-center md:pl-4"
              onChange={(event) => handleChange(event, "circleTax")}
            ></input>
            <span>원</span>
          </div>
        </div>

        <div className="col-span-2 flex flex-col text-sm md:h-10 md:flex-row md:items-center md:text-lg">
          <div className="mr-[32px] font-bold lg:mr-[39px]">모집 인원</div>
          <div>
            <input
              type="number"
              placeholder={"" + circle.recruitMembers}
              className="mr-1 w-24 rounded-md text-center md:pl-4"
              onChange={(event) => handleChange(event, "recruitMembers")}
            ></input>
            <span>명</span>
          </div>
        </div>

        <div className="col-span-2 flex flex-col text-sm md:h-10 md:flex-row md:items-center md:text-lg">
          <div className="mr-[36px] font-bold lg:mr-[45px]">동아리원</div>
          <div>
            <input
              type="number"
              readOnly
              value={circle.numMember}
              className="mr-1 w-24 rounded-md text-center md:pl-4"
            ></input>
            <span>명</span>
          </div>
        </div>

        <div className="col-span-2 flex flex-col text-sm md:h-10 md:flex-row md:items-center md:text-lg">
          <div className="mr-4 font-bold lg:mr-6">모집 마감일</div>
          <input
            type="date"
            className="rounded-md pl-4"
            onChange={(event) => handleChange(event, "joinedAt")}
          ></input>
        </div>

        <div className="col-span-3 row-span-1 flex w-32 flex-col items-center gap-2 md:col-span-1 md:row-span-4">
          <div className="mb-6 mt-6 w-full text-2xl font-bold">운영진</div>
          <ProfileImage src={profileImage}></ProfileImage>
          <SubHeader bold>
            회장 {circle.leaderName} ({admissionYear % 100})
          </SubHeader>
        </div>

        <div className="col-span-3 row-span-1 md:col-span-2 md:row-span-4">
          <div className="mb-6 mt-6 text-2xl font-bold">설명</div>
          <textarea
            className="h-36 w-full rounded-md p-2"
            placeholder={circle.description}
            onChange={(event) => handleChange(event, "description")}
          ></textarea>
        </div>

        <div
          onClick={() => {
            submitHandler();
          }}
          className="col-span-3 row-span-3 flex h-10 items-center justify-center rounded-xl bg-red-500 text-lg text-white md:col-span-3 md:row-span-2 md:h-16 lg:text-xl"
        >
          수정 완료
        </div>
        <div className="h-5"></div>
      </div>
    </>
  );
};

export default CircleDetailEdit;
