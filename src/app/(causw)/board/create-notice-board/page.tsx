"use client";
import { PreviousButton } from '@/shared/ui/previousButton';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage-instance';
import React, { useState } from 'react';
import Image from "next/image";

// eslint-disable-next-line @next/next/no-async-client-component
const CreateNoticeBoardPage = (props: any) => {
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [allowAnonymous, setAllowAnonymous] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['상관없음']);
  const [isNameValid, setIsNameValid] = useState(true);

  const roles = [
    '학생회장', '부학생회장', '관리자', '동문회장', '교수', 
    '학년대표', '학생회', '일반 사용자'
  ];

const handleRoleChange = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles.filter(r => r !== '상관없음'), role]);
    }
  };

  const handleAnyRoleChange = () => {
    if (selectedRoles.includes('상관없음')){
      setSelectedRoles([]);
    }else {
      setSelectedRoles(['상관없음']);
    }
  };

  const handleSubmit = () => {
    if (!boardName.trim()) {
      setIsNameValid(false);
      return;
    }
    // 게시판 생성 로직
    console.log({
      boardName,
      boardDescription,
      allowAnonymous,
      selectedRoles,
    });
  };

  return (
    <div className="relative h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      <div className="h-full flex flex-col p-10 pt-10">
        <div className="text-[35px] mt-2 mb-6">게시판 생성</div>
        <div className="relative mb-6">
          <div className="text-[28px] mb-2">게시판 이름</div>
          <input
            type="text"
            className="w-full border-b-post-title-input border-black bg-transparent text-[20px] text-black focus:outline-none"
            value={boardName}
            onChange={(e) => {
              setBoardName(e.target.value);
              setIsNameValid(true);
            }}
          />
          {!isNameValid && (
            <div className="absolute text-red-500 mt-1 right-0">게시판 이름은 필수입니다.</div>
          )}
        </div>

        <div className="mb-6">
          <div className="text-[28px] mb-2">게시판 설명</div>
          <textarea
            className="w-full border-b-post-title-input border-black bg-transparent text-[20px] text-black focus:outline-none"
            value={boardDescription}
            onChange={(e) => setBoardDescription(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <div className="text-[28px] mb-4">게시글 작성 권한 명단</div>
          <div className="p-4 bg-notice-board-role rounded-2xl">
            <div className="flex items-center space-x-3 mb-2">
              <span onClick={handleAnyRoleChange}>
                {selectedRoles.includes('상관없음') ? 
                  <Image
                    src="/images/board/role-checked.svg"
                    alt="Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image> :
                  <Image
                    src="/images/board/role-non-checked.svg"
                    alt="Non Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image>
                }
              </span>
              <span>상관없음</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <div key={role} className="flex items-center space-x-3">
                  <span onClick={() => handleRoleChange(role)}>
                    {selectedRoles.includes(role) ? 
                      <Image
                        src="/images/board/role-checked.svg"
                        alt="Checked Checkbox Icon"
                        width={18}
                        height={18}
                      ></Image> :
                      <Image
                        src="/images/board/role-non-checked.svg"
                        alt="Non Checked Checkbox Icon"
                        width={18}
                        height={18}
                      ></Image>
                    }
                  </span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-2">
          <span onClick={() => setAllowAnonymous(!allowAnonymous)}>
            {allowAnonymous ? 
              <Image
                src="/images/board/role-checked.svg"
                alt="Checked Checkbox Icon"
                width={22}
                height={22}
              ></Image> :
              <Image
                src="/images/board/role-non-checked.svg"
                alt="Non Checked Checkbox Icon"
                width={22}
                height={22}
              ></Image>
            }
          </span>
          <span className='text-[20px]'>익명 허용 여부</span>
        </div>
      </div>
      <div className="absolute bottom-2 w-full translate-x-1/2 flex space-x-20">
        <button
          onClick={handleSubmit}
          className="bg-confirm-btn text-white py-2 px-8 rounded-full shadow-md text-[16px] hover:bg-orange-600 focus:outline-none"
        >
          글작성
        </button>
      </div>
    </div>
  );

}

export default CreateNoticeBoardPage;