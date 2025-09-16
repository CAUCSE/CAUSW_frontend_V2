import Image from 'next/image';
import Link from 'next/link';

import { CardBox } from '../CardBox';

export interface HomeCardProps {
  title: string;
  subtitle: string;
  bgColor: string;
  icon: string;
  href: string;
}

export const HomeCard = ({ title, subtitle, bgColor, icon, href }: HomeCardProps) => {
  return (
    <CardBox
      className={`group relative overflow-hidden rounded-2xl transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]`}
    >
      <Link href={href} className="block h-full w-full">
        <div className="flex h-full items-center justify-evenly gap-2 p-[14px]">
          <div
            className={`h-[54px] min-w-[55.07px] ${bgColor} flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Image src={icon} alt="icon" width={30} height={30} />
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-[5px] text-center">
            <p className="text-[17px] transition-colors duration-200 group-hover:text-blue-600">{title}</p>
            <p className="text-[12px] text-[rgba(186,186,186,1)] transition-colors duration-200 group-hover:text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>
    </CardBox>
  );
};
