import Link from 'next/link';

import { CardBox } from '../CardBox';

interface CardProps {
  title: string;
  sub: string;
  href: string;
  icon: string;
}

export const LinkCard = ({ href }: CardProps) => {
  return (
    <CardBox className="flex h-[86px] w-[213px] flex-col items-center justify-center overflow-hidden">
      <Link href={href} className="h-full w-full">
        {/* TODO : icon 배경 : 사이즈 다른거 디자인팀 문의 */}
        <div className=""></div>
      </Link>
    </CardBox>
  );
};
