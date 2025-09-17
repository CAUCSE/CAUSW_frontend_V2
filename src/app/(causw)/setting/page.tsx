'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import toast from 'react-hot-toast';

import { withdrawUserCSR } from '@/entities/user';
import {
  isAdmin,
  isAlumniLeader,
  isCircleLeader,
  isCouncil,
  isGraduate,
  isPresidents,
  isStudent,
  isStudentLeader,
  isVicePresidents,
  useMyInfo,
  userRoleCodes,
} from '@/entities/user/model';

import { LoadingComponent } from '@/shared/ui';

import { tokenManager } from '@/shared';

const UseTerms = dynamic(() => import('@/shared').then((mod) => mod.UseTerms), {
  ssr: false,
});

const SettingsPage = () => {
  const { signoutAndRedirect } = tokenManager();
  const { data: userInfo, isLoading } = useMyInfo();
  const [isUseTermsOpen, setIsUseTermsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <LoadingComponent />;
  if (!userInfo) return notFound();

  const roles = userInfo.roles;
  const isPureGraduate = isGraduate(userInfo.academicStatus) && !isAlumniLeader(roles);
  const isAdminGroup = isAdmin(roles) || isPresidents(roles) || isVicePresidents(roles);

  const circleIdIfLeader = userInfo.circleIdIfLeader;
  const circleNameIfLeader = userInfo.circleNameIfLeader;
  const roleItems: {
    name: string;
    link: string;
  }[] = [];

  // roles.forEach((role) => {
  //   if (role !== 'LEADER_CIRCLE')
  //     roleItems.push({
  //       name: userRoleCodes[role] + ' 권한 위임',
  //       link: '/setting/mandate/' + role.toLowerCase() + '/none',
  //     });
  // });

  // const circleLeaderItems =
  //   circleIdIfLeader && circleIdIfLeader.length > 0
  //     ? circleIdIfLeader.map((id, index) => ({
  //         name: circleNameIfLeader![index] + ' 동아리장 권한 위임',
  //         link: '/setting/mandate/leader_circle/' + id,
  //       }))
  //     : [];

  const handleDeleteAccount = async () => {
    try {
      await withdrawUserCSR();
      toast.success('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
      signoutAndRedirect();
    } catch (e) {
      toast.error('회원 탈퇴 실패: 잠시 후 다시 시도해주세요.');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const menuItems = {
    account: [
      { name: '개인정보 관리', link: '/setting/personal-info' },
      { name: '비밀번호 변경', link: '/setting/resetpassword' },
      { name: '로그아웃', onClick: signoutAndRedirect },
      { name: '이용약관', onClick: () => setIsUseTermsOpen(true) },
      { name: '회원 탈퇴', onClick: () => setShowDeleteConfirm(true) },
    ],
    records: [
      { name: '내가 쓴 게시글', link: '/setting/my/posts' },
      { name: '내가 쓴 댓글', link: '/setting/my/comments' },
      { name: '내가 찜한 게시글', link: '/setting/my/favorite' },
      { name: '내 동문수첩', link: '/contact/profile' },
    ],
    contact: [{ name: '메일 : caucsedongne@gmail.com' }, { name: '인스타그램 : @causwcse_dongne' }],
    managementAlumniPresident: [{ name: '유저 관리', link: '/' }],
    managementAdmin: [
      // { name: '권한 관리', link: '/setting/management/role/president' },
      { name: '유저 관리', link: '/setting/management/user/admission' },
      { name: '학생회비 납부자 관리', link: '/setting/management/payer' },
      { name: '학적 상태 관리', link: '/setting/management/attendance/all' },
    ],
    // delegation: [...roleItems, ...circleLeaderItems],
    homeManagement: [
      { name: '이벤트 배너 관리', link: '/setting/home/banner' },
      { name: '캘린더 관리', link: '/setting/home/calendar' },
    ],
    homeManagementAlumniLeader: [{ name: '이벤트 배너 관리', link: '/setting/home/banner' }],

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

    report: [
      { name: '신고 콘텐츠 목록', link: '/setting/management/report/content' },
      { name: '신고 유저 관리', link: '/setting/management/report/user' },
    ],

    occasionManagement: [
      { name: '내 경조사 목록 보기', link: '/ceremony/list' },
      { name: '내 경조사 신청', link: '/ceremony/create' },
      { name: '경조사 알림 설정', link: '/ceremony/setting' },
      { name: '경조사 관리', link: '/setting/management/ceremony/request' },
    ],

    occasionUserManagement: [
      { name: '내 경조사 목록 보기', link: '/ceremony/list' },
      { name: '내 경조사 신청', link: '/ceremony/create' },
      { name: '경조사 알림 설정', link: '/ceremony/setting' },
    ],
  };

  const MenuItem: React.FC<{
    title: string;
    items: { name: string; link?: string; onClick?: () => void }[];
  }> = ({ title, items }) => (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            {item.link ? (
              <Link href={item.link} className="text-black-500 hover:text-gray-500 hover:underline">
                {item.name}
              </Link>
            ) : item.onClick ? (
              <button onClick={item.onClick} className="text-black-500 text-left hover:text-gray-500 hover:underline">
                {item.name}
              </button>
            ) : (
              <span className="text-gray-800">{item.name}</span>
            )}
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

        {/* 학생 또는 졸업생인 경우 */}
        {(isStudent(roles) || isPureGraduate) && !isAdminGroup && (
          <>
            <MenuItem title="경조사 관리" items={menuItems.occasionUserManagement} />
          </>
        )}

        {/* 교수인 경우 */}

        {/* 학생회에만 소속 */}
        {/* 요청으로 인해 '권한 위임/관리' 주석처리(20250819) */}
        {/* {(isCouncil(roles) && !isCircleLeader(roles)) ||
          (isStudentLeader(roles) && !isCircleLeader(roles) && (
            <>
              <MenuItem title="권한 위임" items={menuItems.delegation} />
            </>
          ))} */}

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
        {isAlumniLeader(roles) && (
          <>
            {/* <MenuItem title="권한 위임" items={menuItems.delegation} /> */}
            <MenuItem title="홈 화면 관리" items={menuItems.homeManagementAlumniLeader} />
            <MenuItem title="경조사 관리" items={menuItems.occasionManagement} />
          </>
        )}

        {/* 관리자, 학생회장, 부학생회장 */}
        {isAdminGroup && (
          <>
            <MenuItem title="관리" items={menuItems.managementAdmin} />
            {/* <MenuItem title="권한 위임" items={menuItems.delegation} /> */}
            <MenuItem title="홈 화면 관리" items={menuItems.homeManagement} />
            <MenuItem title="게시판 관리" items={menuItems.boardManagement} />
            <MenuItem title="경조사 관리" items={menuItems.occasionManagement} />
            <MenuItem title="신고" items={menuItems.report} />
          </>
        )}

        <MenuItem title="문의하기" items={menuItems.contact} />
      </>
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center">
      <div className="w-full max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
        <h1 className="mt-8 mb-8 text-3xl font-bold">환경설정</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{renderMenuItems()}</div>
        {isUseTermsOpen && <UseTerms closeModal={() => setIsUseTermsOpen(false)}></UseTerms>}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
              <p className="mb-6 text-center text-lg font-semibold">
                정말 탈퇴하시겠습니까? <br />
                회원정보는 이용약관에 따라 탈퇴 처리됩니다.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
