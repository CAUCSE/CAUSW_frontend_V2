"use client";
import React from 'react';
import Link from 'next/link';
import { useUserStore } from '@/shared';


const MenuItem: React.FC<{ title: string; items: { name: string; link: string }[] }> = ({ title, items }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          <Link href={item.link} className="text-black-500 hover:underline hover:text-gray-500">
            {item.name}
          </Link>
        </li>
      ))} 
    </ul>
  </div>
);

const SettingsPage: React.FC<{ role: User.Role }> = ({ role }) => {
  const {isStudent, isProfessor, isAdmin, isPresidents, isVicePresidents, isCircleLeader, isCouncil, isStudentLeader, isAlumniLeader} = useUserStore((state) => ({
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
  
  
  const menuItems = {
    계정: [
      { name: '개인정보 관리', link: '/setting/personal-info' },
      { name: '비밀번호 변경', link: '' },
      { name: '로그아웃', link: '' },
      { name: '이용약관', link: '/' }
    ],
    기록: [
      { name: '내가 쓴 글', link: '/' },
      { name: '내가 쓴 댓글', link: '/' },
      { name: '내가 찜한 글', link: '/' }
    ],
    관리_동문회장: [
      { name: '유저 관리', link: '/' },
    ],
    관리_관리자_학생회장_부학생회장: [
      { name: '권한 관리', link: '/' },
      { name: '유저 관리', link: '/' },
      { name: '학생회비 납부자 관리', link: '/' },
      { name: '학적 상태 관리', link: '/' }
    ],
    권한위임: [
      { name: '권한 위임', link: '/' }
    ],
    홈화면관리: [
      { name: '이벤트 배너 공지 편집', link: '/' },
      { name: '캘린더 편집', link: '/' }
    ],
    동아리관리: [
      { name: '동아리원 관리', link: '/' },
      { name: '동아리 가입 신청 관리', link: '/' }
    ],
    게시판관리: [
      { name: '게시판 생성 신청 관리', link: '/' },
    ]
  };
  const renderMenuItems = () => {


    return (
      <>
      {/* 기본 유저들에게 나타나는 UI */}
        <MenuItem title="계정" items={menuItems.계정} />
        <MenuItem title="기록" items={menuItems.기록} />

      {/* 권한을 갖는 유저들에게 나타나는 UI */}

      {/* 학생회에만 소속 */}
        {(isCouncil() && !isCircleLeader()) || (isStudentLeader() && !isCircleLeader) && 
        <>
          <MenuItem title="권한 위임" items={menuItems.권한위임} />
        </>
        }

      {/* 동아리 대표인 경우 */}
        {(isCircleLeader()) && 
        <>
          <MenuItem title="권한 위임" items={menuItems.권한위임} />
          <MenuItem title="동아리 관리" items={menuItems.동아리관리}/>
        </>
        }

      {/* 동문회장 */}
        {isAlumniLeader() &&
        <>
          <MenuItem title="관리" items={menuItems.관리_동문회장}/>
          <MenuItem title="권한 위임" items={menuItems.권한위임} />
        </>
        }
        
        {/* 관리자, 학생회장, 부학생회장 */}
        {(isAdmin() || isPresidents() || isVicePresidents()) && (
          <>
            <MenuItem title="관리" items={menuItems.관리_관리자_학생회장_부학생회장}/>
            <MenuItem title="권한 위임" items={menuItems.권한위임} />
            <MenuItem title="홈 화면 관리" items={menuItems.홈화면관리} />
            <MenuItem title="동아리 관리" items={menuItems.동아리관리} />
            <MenuItem title="게시판 관리" items={menuItems.게시판관리} />
          </>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mt-8 mb-8">환경설정</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderMenuItems()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;