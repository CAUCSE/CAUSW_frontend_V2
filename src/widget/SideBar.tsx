"use client";

import { useEffect } from "react";

import { ProfileImage, SubHeader } from "@/entities";
import {
  UserService,
  useUserStore,
  AuthRscService,
  useLayoutStore,
} from "@/shared";
import Link from "next/link";

interface NotificationItemProps {
  title: string;
  timeInfo: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, timeInfo }) => {
  return (
    <div className="flex items-center p-3 border border-gray-300 rounded-lg shadow bg-gray-50">
      <div className="text-yellow-400 text-xl mr-3">📝</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{timeInfo}</p>
      </div>
    </div>
  );
};

const notifications = [
  { title: "홍길동(17) - 결혼", timeInfo: "2025.03.01" },
  { title: "홍길동(17) - 결혼", timeInfo: "2025.03.01" },
  { title: "홍길동(17) - 결혼", timeInfo: "2025.03.01" },
  { title: "홍길동(17) - 결혼", timeInfo: "2025.03.01" },
  
]; // 나중에 api 호출 받아오는 걸로 변경



export const SideBar = () => {
  const { getMe } = UserService();
  const { signout } = AuthRscService();

  const md = useLayoutStore((state) => state.md);
  const sm = useLayoutStore((state) => state.sm);

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const profileImage = useUserStore((state) => state.profileImageUrl);

  const handleNoRefresh = async () => {
    await signout();
    location.href = "/auth/signin";
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <div className="fixed -top-1 right-0 flex h-[55px] w-full items-center justify-end space-y-4 pr-4 xl:h-screen xl:w-72 xl:flex-col xl:justify-center">
        <div className="absolute left-3 top-4 flex flex-col items-center text-black xl:left-52 xl:top-11">
          <span
            className="icon-[codicon--sign-out] text-2xl xl:text-4xl"
            onClick={() => {
              handleNoRefresh();
            }}
          ></span>
          <span className="text-xs text-black underline xl:text-sm">
            로그아웃
          </span>
        </div>

        <div className="max-xl:hidden">
          <ProfileImage src={profileImage} />
        </div>
        <div className="mr-2 flex flex-col items-end xl:mr-0 xl:items-center">
          <SubHeader big>{name}</SubHeader>
          <SubHeader gray>{email}</SubHeader>
        </div>
    
    <div className="max-xl:hidden">
      <div className="w-72 mx-auto p-2 border-2 border-yellow-400 rounded-lg bg-white relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <span className="mr-2">📌</span> 최근 경조사 알림
          </h2>

        <Link href="/occasion/apply" className="px-4 py-1 bg-yellow-400 text-white text-sm font-medium rounded-full shadow">
        신청
      </Link>
        </div>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div className="space-y-3">
            <Link href='/occasion' className="">
            <NotificationItem
              key={index}
              title={notification.title}
              timeInfo={notification.timeInfo}
            />
            </Link>
            </div>
          ))}
        </div>
      </div>  
    </div>

        <div className="xl:hidden">
          <ProfileImage src={profileImage} />
        </div>
      </div>
    </>
  );
};
