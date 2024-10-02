"use client";

import { useUserStore } from "@/shared";
import Link from "next/link";
import React from "react";

const MenuItem: React.FC<{
  title: string;
  items: { name: string; link: string }[];
}> = ({ title, items }) => (
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          <Link
            href={item.link}
            className="text-black-500 hover:text-gray-500 hover:underline"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

//CHECK: Role의 역활???
const SettingsPage: React.FC<{ role: User.Role }> = ({ role }) => {
  const {
    roles,
    isStudent,
    isProfessor,
    isAdmin,
    isPresidents,
    isVicePresidents,
    isCircleLeader,
    isCouncil,
    isStudentLeader,
    isAlumniLeader,
  } = useUserStore((state) => ({
    roles: state.roles,
    isStudent: state.isStudent,
    isProfessor: state.isProfessor,
    isAdmin: state.isAdmin,
    isPresidents: state.isPresidents,
    isVicePresidents: state.isVicePresidents,
    isCircleLeader: state.isCircleLeader,
    isCouncil: state.isCouncil,
    isStudentLeader: state.isStudentLeader,
    isAlumniLeader: state.isAlumniLeader,
  }));

  const circleIdIfLeader = useUserStore((state) => state.circleIdIfLeader);
  const circleNameIfLeader = useUserStore((state) => state.circleNameIfLeader);

  const menuItems = {
    계정: [
      { name: "개인정보 관리", link: "/setting/personal-info" },
      { name: "비밀번호 변경", link: "/setting/resetpassword" },
      { name: "로그아웃", link: "" },
      { name: "이용약관", link: "/" },
    ],
    기록: [
      { name: "내가 쓴 글", link: "/setting/my/posts" },
      { name: "내가 쓴 댓글", link: "/setting/my/comments" },
      { name: "내가 찜한 글", link: "/" },
    ],
    관리_동문회장: [{ name: "유저 관리", link: "/" }],
    관리_관리자_학생회장_부학생회장: [
      { name: "권한 관리", link: "/setting/management/role/president" },
      { name: "유저 관리", link: "/setting/management/user/admission" },
      { name: "학생회비 납부자 관리", link: "/setting/management/payer" },
      { name: "학적 상태 관리", link: "/setting/management/attendance/all" },
    ],
    권한위임: [{ name: "권한 위임", link: "/setting/mandate/" + roles[0] }],
    홈화면관리: [
      { name: "이벤트 배너 공지 편집", link: "/setting/home/event" },
      { name: "캘린더 편집", link: "/setting/home/calendar" },
    ],

    동아리관리: (circleId: string) => [
      {
        name: "동아리원 관리",
        link: `/setting/management/circle/${circleId}/member`,
      },
      {
        name: "동아리 가입 신청 관리",
        link: `/setting/management/circle/${circleId}/apply`,
      },
    ],
    동아리관리_관리자: [
      { name: "동아리원 관리", link: "/setting/management/circle/member" },
      {
        name: "동아리 가입 신청 관리",
        link: `/setting/management/circle/apply/`,
      },
    ],
    게시판관리: [
      { name: "게시판 생성 신청 관리", link: "/setting/management/board" },
    ],
  };

  const renderMenuItems = () => {
    return (
      <>
        {/* 기본 유저들에게 나타나는 UI */}
        <MenuItem title="계정" items={menuItems.계정} />
        <MenuItem title="기록" items={menuItems.기록} />

        {/* 권한을 갖는 유저들에게 나타나는 UI */}

        {/* 학생회에만 소속 */}
        {(isCouncil() && !isCircleLeader()) ||
          (isStudentLeader() && !isCircleLeader && (
            <>
              <MenuItem title="권한 위임" items={menuItems.권한위임} />
            </>
          ))}

        {/* 동아리 대표인 경우 */}
        {isCircleLeader() && (
          <>
            <MenuItem title="권한 위임" items={menuItems.권한위임} />
            {circleNameIfLeader?.map((circleName, idx) => (
              <MenuItem
                key={circleName}
                title={`동아리 관리 (${circleName})`}
                items={menuItems.동아리관리(
                  circleIdIfLeader ? circleIdIfLeader[idx] : "",
                )}
              ></MenuItem>
            ))}
          </>
        )}

        {/* 동문회장 */}
        {isAlumniLeader() && (
          <>
            <MenuItem title="관리" items={menuItems.관리_동문회장} />
            <MenuItem title="권한 위임" items={menuItems.권한위임} />
          </>
        )}

        {/* 관리자, 학생회장, 부학생회장 */}
        {(isAdmin() ?? isPresidents() ?? isVicePresidents()) && (
          <>
            <MenuItem
              title="관리"
              items={menuItems.관리_관리자_학생회장_부학생회장}
            />
            <MenuItem title="권한 위임" items={menuItems.권한위임} />
            <MenuItem title="홈 화면 관리" items={menuItems.홈화면관리} />
            <MenuItem title="동아리 관리" items={menuItems.동아리관리_관리자} />
            <MenuItem title="게시판 관리" items={menuItems.게시판관리} />
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 mt-8 text-3xl font-bold">환경설정</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {renderMenuItems()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
