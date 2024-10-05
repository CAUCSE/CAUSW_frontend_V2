"use client";

import { Button, Modal } from "@/shared";
import { useRouter } from 'next/navigation';
import { UserCouncilFeeService } from "@/shared";
import { useState } from "react";
export function CouncilFeeButtons({ params: { councilFeeId, isRefunded } }: { 
  params: { councilFeeId: string; isRefunded: boolean | undefined;} 
}) 
  
{
    const router = useRouter();
    const { deleteUserCouncilFeeInfo } = UserCouncilFeeService();
    const [ isSuccessModalOpen, setIsSuccessModalOpen ] = useState(false);
    const [ isErrorModalOpen, setIsErrorModalOpen ] = useState(false);
    const [ isWarningModalOpen, setIsWarningModalOpen ] = useState(false);

    const deleteAndNavigateAndReload = async () => {
        try {
          await router.push('./'); // 페이지 이동
          window.location.reload(); // 페이지 새로고침
        } catch (error) {
          console.error('이동 중 오류 발생:', error);
        }
      };


    const deleteUser = async(councilFeeId: string) => {
        try{
            const response = deleteUserCouncilFeeInfo(councilFeeId);
            setIsSuccessModalOpen(true);
        }
        catch(error){
            setIsErrorModalOpen(true);
        }
    }
  return (
    <div className="flex justify-center mt-8 gap-[30px] lg:gap-[60px]">
            <Button
          key= "닫기"
          action={() => {router.push('./')}}
          variant="BLUE"
          className="h-[45px] w-[125px] lg:w-[200px]"
        >닫기</Button>
                    <Button
          key= "삭제"
          action={() => {setIsWarningModalOpen(true)}}
          variant="RED"
          className="h-[45px] w-[125px] lg:w-[200px]"
        >목록에서 삭제</Button>

{isSuccessModalOpen &&(
    <Modal closeModal={() =>{
        setIsSuccessModalOpen(false)
        deleteAndNavigateAndReload()}
        }> 
    <div>학생회비 납부자 목록에서 삭제되었습니다.</div></Modal>
)}        
{isErrorModalOpen && (
    <Modal closeModal={() =>{
    setIsSuccessModalOpen(false);
}}> 
    <div>목록에서 삭제를 실패했습니다.</div></Modal>
)}

{isWarningModalOpen && (    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
        <p className="font-bold text-md lg:text-xl text-red-500">정말 납부자 목록에서 삭제하시곘습니까?</p>
        <p className="font-bold text-md lg:text-xl text-red-500">이 작업은 복구할 수 없습니다.</p>

        <div className="flex space-x-8 p-4 m-4">
          <Button
            key= "추방"
            action={() => {
                setIsWarningModalOpen(false);
                deleteUser(councilFeeId);
            }}
            variant="RED"
            className="h-[45px] w-[125px] lg:w-[200px]"
          >
            삭제
          </Button>
          <Button
            key= "모달 닫기"
            action={() => {setIsWarningModalOpen(false);}}
            variant="GRAY"
            className="h-[45px] w-[125px] lg:w-[200px]"
          >
            취소
          </Button>
        </div>
      </div>
    </div>)}


    </div>
)}