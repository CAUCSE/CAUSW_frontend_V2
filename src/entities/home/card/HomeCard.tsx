import Image from "next/image";
import Link from "next/link";
import { CardBox } from "./CardBox";

export interface HomeCardProps {
  title: string;
  subtitle: string;
  bgColor: string;
  icon: string;
  href: string;
}

export const HomeCard = ({
  title,
  subtitle,
  bgColor,
  icon,
  href,
}: HomeCardProps) => {
  return (
    <CardBox>
      <Link href={href}>
        <div className="flex h-full justify-between gap-2 p-[14px]">
          <div
            className={`h-[54px] min-w-[55.07px] ${bgColor} flex items-center justify-center rounded-full`}
          >
            <Image src={icon} alt="icon" width="30" height="30" />
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-[5px]">
            <p className="text-[12px]">{title}</p>
            <p className="text-[9px] text-[rgba(186,186,186,1)]">{subtitle}</p>
          </div>
        </div>
      </Link>
    </CardBox>
  );
};
