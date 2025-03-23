import {
  OccasionContent,
  OccasionDate,
  OccasionDetail,
  OccasionImage,
} from "@/_deprecated/entities";

interface OccasionNotificationProps {
  occasionId: string;
}

export const OccasionNotificationDetail = ({
  occasionId,
}: OccasionNotificationProps) => {
  const occasionTitle = "홍길동 결혼식";
  const occasionType = "결혼";
  const occasionRegister = "홍길동";
  const occasionContent = `/
  /
  /
  /
  /
  /
  /
  /
  /
  /

  `;

  const startDate = "2023-12-25";
  const endDate = "2023-12-25";

  const imageList = [
    "/images/puang-proud.png",
    "/images/puang-proud.png",
    "/images/puang-proud.png",
    "/images/puang-proud.png",
    "/images/puang-proud.png",
    "/images/puang-proud.png",
    "/images/puang-proud.png",
    "/images/puang-proud.png",
  ];

  return (
    <>
      <div className="flex flex-col gap-3 pb-10 pt-8 md:gap-6">
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDetail title="경조사 분류" description={occasionType} />
          <OccasionDetail title="등록인" description={occasionRegister} />
        </div>
        <OccasionContent
          title="경조사 내용"
          occasionContent={occasionContent}
        />
        <div className="grid grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 lg:gap-32">
          <OccasionDate title="시작 날짜" date={startDate} />
          <OccasionDate title="종료 날짜" date={endDate} />
        </div>
        <OccasionImage imageList={imageList} />
      </div>
    </>
  );
};
