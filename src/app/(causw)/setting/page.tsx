'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { UseTerms } from '@/fsd_shared';
import { userRoleCodes, useUserStore } from '@/shared';

const SettingsPage = () => {
  const { roles, isAdmin, isPresidents, isVicePresidents, isCircleLeader, isCouncil, isStudentLeader, isAlumniLeader } =
    useUserStore(state => ({
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

  const circleIdIfLeader = useUserStore(state => state.circleIdIfLeader);
  const circleNameIfLeader = useUserStore(state => state.circleNameIfLeader);
  const [isUseTermsOpen, setIsUseTermsOpen] = useState(false);
  const roleItems: {
    name: string;
    link: string;
  }[] = [];

  roles.forEach(role => {
    if (role !== 'LEADER_CIRCLE')
      roleItems.push({
        name: userRoleCodes[role] + ' 권한 위임',
        link: '/setting/mandate/' + role.toLowerCase() + '/none',
      });
  });

  const circleLeaderItems =
    circleIdIfLeader && circleIdIfLeader.length > 0
      ? circleIdIfLeader.map((id, index) => ({
          name: circleNameIfLeader![index] + ' 동아리장 권한 위임',
          link: '/setting/mandate/leader_circle/' + id,
        }))
      : [];

  const menuItems = {
    account: [
      { name: '개인정보 관리', link: '/setting/personal-info' },
      { name: '비밀번호 변경', link: '/setting/resetpassword' },
      { name: '로그아웃', link: '/auth/signin' },
      { name: '이용약관', link: '/setting/useterms' },
    ],
    records: [
      { name: '내가 쓴 글', link: '/setting/my/posts' },
      { name: '내가 쓴 댓글', link: '/setting/my/comments' },
      { name: '내가 찜한 글', link: '/setting/my/favorite' },
    ],
    managementAlumniPresident: [{ name: '유저 관리', link: '/' }],
    managementAdmin: [
      { name: '권한 관리', link: '/setting/management/role/president' },
      { name: '유저 관리', link: '/setting/management/user/admission' },
      { name: '학생회비 납부자 관리', link: '/setting/management/payer' },
      { name: '학적 상태 관리', link: '/setting/management/attendance/all' },
    ],
    delegation: [...roleItems, ...circleLeaderItems],
    homeManagement: [
      { name: '이벤트 배너 관리', link: '/setting/home/banner' },
      { name: '캘린더 관리', link: '/setting/home/calendar' },
    ],

    /* clubManagement: (circleId: string) => [
      {
        name: "동아리원 관리",
        link: `/setting/management/circle/${circleId}/member`,
      },
      {
        name: "동아리 가입 신청 관리",
        link: `/setting/management/circle/${circleId}/apply`,
      },
    ], */

    boardManagement: [{ name: '게시판 생성 신청 관리', link: '/setting/management/board' }],

    occasionManagement: [{ name: '경조사 관리', link: '/setting/management/occasion/request' }],
  };

  const MenuItem: React.FC<{
    title: string;
    items: { name: string; link: string }[];
  }> = ({ title, items }) => (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link href={item.link} className="text-black-500 hover:text-gray-500 hover:underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderMenuItems = () => {
    return (
      <>
        {/* 기본 유저들에게 나타나는 UI */}
        <MenuItem title="계정" items={menuItems.account} />
        <MenuItem title="기록" items={menuItems.records} />

        {/* 권한을 갖는 유저들에게 나타나는 UI */}

        {/* 학생회에만 소속 */}
        {(isCouncil() && !isCircleLeader()) ||
          (isStudentLeader() && !isCircleLeader && (
            <>
              <MenuItem title="권한 위임" items={menuItems.delegation} />
            </>
          ))}

        {/* 동아리 대표인 경우: 동아리 비활성화 */}
        {/* {isCircleLeader() && (
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
        )} */}

        {/* 동문회장 */}
        {isAlumniLeader() && (
          <>
            <MenuItem title="관리" items={menuItems.managementAlumniPresident} />
            <MenuItem title="권한 위임" items={menuItems.delegation} />
          </>
        )}

        {/* 관리자, 학생회장, 부학생회장 */}
        {(isAdmin() || isPresidents() || isVicePresidents()) && (
          <>
            <MenuItem title="관리" items={menuItems.managementAdmin} />
            <MenuItem title="권한 위임" items={menuItems.delegation} />
            <MenuItem title="홈 화면 관리" items={menuItems.homeManagement} />
            <MenuItem title="게시판 관리" items={menuItems.boardManagement} />
            <MenuItem title="경조사 관리" items={menuItems.occasionManagement} />
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 mt-8 text-3xl font-bold">환경설정</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{renderMenuItems()}</div>
        {isUseTermsOpen && <UseTerms closeModal={() => setIsUseTermsOpen(false)}></UseTerms>}
      </div>
    </div>
  );
};

export default SettingsPage;
