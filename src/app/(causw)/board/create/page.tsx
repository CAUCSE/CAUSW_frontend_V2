"use client"
import { PreviousButton } from '@/shared/ui/previousButton';
import { useUserStore, useBoardStore, BoardRscService } from '@/shared';
import React from 'react';
import { useRouter } from "next/navigation";
import { AllowAnonymousToggle, BoardDetailForm, RoleSelectSection } from '@/entities';
import { create } from 'domain';

// eslint-disable-next-line @next/next/no-async-client-component
const CreateBoardPage = (props: any) => {
  const {clearBoardInfo, boardName, setIsNameValid, boardDescription, allowAnonymous, selectedRoles} = useBoardStore();
  const { applyBoard, createBoard} = BoardRscService();
  const {role} = useUserStore();
  
  const router = useRouter();

  const roles = {
    '학생회장': ['PRESIDENT'],
    '부학생회장': ['VICE_PRESIDENT'],
    '관리자': ['AMIN'],
    '동문회장': ['LEADER_ALUMNI'],
    '교수': ['PROFESSOR'],
    '학년대표':['LEADER_1', 'LEADER_2', 'LEADER_3', 'LEADER_4'],
    '학생회':[],
    '일반 사용자':['COMMON']
  };

  const handleSubmit = async () => {
    if (!boardName.trim()) {
      setIsNameValid(false);
      return;
    }
    if (role === 'ADMIN' || role === 'PRESIDENT' || role === 'VICE_PRESIDENT'){
      const boardReqeust: Board.CreateBoardDto = {
        boardName: boardName,
        description: boardDescription,
        createRoleList: selectedRoles,
        isAnonymousAllowed: allowAnonymous
      };
      try {
        const createBoardResponse = await createBoard(boardReqeust);
        console.log('게시판 생성 완료: ', createBoardResponse);
        router.back();
        clearBoardInfo();
      }catch(error) {
        console.error('게시물 생성 에러: ', error);
      }  
    }else {
      const boardReqeust: Board.ApplyBoardDto = {
        boardName: boardName,
        description: boardDescription,
        isAnonymousAllowed: allowAnonymous
      };
      try {
        await applyBoard(boardReqeust);
        console.log('게시판 apply 완료: ');
        router.back();
        clearBoardInfo();
      }catch(error) {
        console.error('게시물 생성 에러: ', error);
      }  
    }
  };
  return (
    
    <div className="relative h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      <div className="h-full flex flex-col p-10 pt-10">
        <BoardDetailForm/>
        <RoleSelectSection 
          userRole={role} 
          roles={roles}
        />

        <AllowAnonymousToggle/>
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

export default CreateBoardPage;