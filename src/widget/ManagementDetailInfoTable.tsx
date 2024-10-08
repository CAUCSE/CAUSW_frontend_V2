import Image from "next/image";
import { ReactNode } from "react";
import { PreviousButton } from "@/shared";
const TableUnit = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className="flex flex-col text-[14px] lg:text-[20px]">
      <p>{title}</p>
      {title === "학부 재적/졸업 증빙 자료" ? (
        <Image src={data} alt={title} width={200} height={200} />
      ) : (
        <p className="text-[rgba(180,177,177,1)] max-lg:text-[14px]">{data}</p>
      )}
    </div>
  );
};

export function ManagementDetailInfoTable({
  data,
  titleMapping,
  additionalUnit,
}: {
  data: { [key: string]: string };
  titleMapping: { [key: string]: string };
  additionalUnit?: ReactNode;
}) {
  return (
    <div className="grid h-full w-full font-semibold grid-cols-2 justify-around gap-y-[27px]">
      <PreviousButton></PreviousButton>
      {Object.keys(data).map((k) => {
        const key = k as keyof typeof data;
        return <TableUnit key={key} title={titleMapping[k]} data={data[key]} />;
      })}
      {additionalUnit}
    </div>
  );
}
