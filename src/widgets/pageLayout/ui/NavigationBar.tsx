'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { House, Settings, Users } from 'lucide-react';

import BoardIcon from '../../../../public/icons/board_icon.svg';

interface NavigationBarProps {
  className?: string;
  isIOS?: boolean;
}

export const NavigationBar = ({ className, isIOS }: NavigationBarProps) => {
  const firstRouter = `/${usePathname().split('/')[1]}`;

  return (
    <div className={className}>
      <Image
        src="/images/cau-logo.png"
        alt="cau logo"
        width={95}
        height={54}
        className="absolute top-6 left-1/2 -translate-x-1/2 transform max-xl:hidden"
      />
      <nav
        className={clsx(
          'bg-default flex h-full w-full items-center justify-evenly rounded-t-2xl xl:flex-col xl:items-end xl:rounded-none xl:rounded-tr-3xl xl:rounded-br-3xl xl:py-0',
          isIOS ? 'pt-3 pb-6' : 'py-3',
        )}
      >
        {icons.map((iconClass) => (
          <Link
            key={iconClass.href}
            href={iconClass.href}
            className={clsx('h-full w-full px-4 md:px-8 xl:h-24 xl:w-11/12 xl:px-0')}
          >
            <span
              className={clsx(
                'flex h-full w-full items-center justify-center rounded-xl xl:rounded-none xl:rounded-tl-2xl xl:rounded-bl-2xl',
                firstRouter === iconClass.href ? 'text-default bg-[#F8F8F8]' : 'bg-default text-white',
                isIOS && 'py-2',
              )}
            >
              {iconClass.icon({ className: 'h-6 w-6 xl:h-10 xl:w-10' })}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const icons = [
  { href: '/home', icon: ({ className }: { className: string }) => <House className={className} /> },
  { href: '/board', icon: ({ className }: { className: string }) => <BoardIcon className={className} /> },
  { href: '/contacts', icon: ({ className }: { className: string }) => <Users className={className} /> },
  { href: '/setting', icon: ({ className }: { className: string }) => <Settings className={className} /> },
];
