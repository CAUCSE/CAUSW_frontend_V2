"use client";

import { Button, CircleService, Modal } from "@/shared";
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
          key= "닫기"
          action={() => {deleteUser(councilFeeId)}}
          variant="RED"
          className="h-[45px] w-[125px] lg:w-[200px]"
        >목록에서 삭제</Button>

{isSuccessModalOpen &&(
    <Modal closeModal={() =>{
        setIsSuccessModalOpen(false)}}> 
    <div>학생회비 납부자 목록에서 삭제되었습니다.</div></Modal>
)}        
{isErrorModalOpen && (
    <Modal closeModal={() =>{
    setIsSuccessModalOpen(false);
    router.push('./');
}}> 
    <div>목록에서 삭제를 실패했습니다.</div></Modal>
)}
    </div>
)}