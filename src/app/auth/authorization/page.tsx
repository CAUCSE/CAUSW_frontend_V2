"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PreviousButton, UserService, useUserStore } from "@/shared";
import SubmitAcademicRecordModal from "@/entities/application/AcademicRecordInput";
import SubmitApplicationModal from "@/entities/application/AdmissionApplicationPage";


const VerificationPage: React.FC = () => {
  const router = useRouter();
  const { getUserAdmissionInfo, checkCurrentAcademicStatus, getUserInfo } = UserService();
  const [ isAdmissionApplicationApplied, setIsAdmissionApplicationApplied] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(true);
  const [ isAcademicRecordModalOpen, setIsAcademicModalOpen ] = useState(false);
  const [ isAdmissionModalOpen, setIsAdmissionModalOpen ] = useState(false);
  const [ isUserUndetermined, setIsUndetermined ] = useState(false);

  useEffect(() => {
    const getInfo = async() => {
          const response = await getUserInfo(); 
          return response;
          // getUserInfo를 통해 await인지 active인지 나눔
          // await인 경우
    }
    
    try{
      
        const response = getInfo();
        console.log(response);
        setIsAdmissionApplicationApplied(true);
    }
    catch (error){
        console.log('가입 신청서 제출 문제 조회 발생');
        setIsAdmissionApplicationApplied(false);
    }
  }, [])

  useEffect(() => {
    
  }, [])

  return (
<div>    
{isAcademicRecordModalOpen && <SubmitAcademicRecordModal onClose = {() => {setIsAcademicModalOpen(false)}}/>}
{isAdmissionModalOpen && <SubmitApplicationModal onClose = {() => {setIsAdmissionModalOpen(false)}}/>}
{ (!isAcademicRecordModalOpen && !isAdmissionModalOpen) && (
    <div className="flex items-center justify-center h-screen bg-gray-100">


        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">

        </div>
        <h1 className="text-2xl font-semibold mb-4">본인 인증 안내</h1>
        <p className="text-gray-600 mb-4">
          서비스 이용을 위해 본인 인증이 필요합니다. 
        </p>
        <p className="text-gray-600 mb-4">
        신청서와 재학 증빙 서류를 제출해 주세요.
        </p>

        <div className="mt-6 space-y-4">
        {isAdmissionApplicationApplied && (
          <div
            className="w-full py-3 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
          >
            가입 신청서 제출 완료됨 (승인 대기중)
          </div>)}

            {!isAdmissionApplicationApplied && (
          <button
            onClick={() => {setIsAdmissionModalOpen(true)}}
            className="w-full py-3 bg-focus text-white rounded-lg hover:bg-blue-500 transition"
          >
            가입 신청서 제출
          </button>)}
          <button
            onClick={() => {setIsAcademicModalOpen(true)}}
            className="w-full py-3 bg-focus text-white rounded-lg hover:bg-blue-500 transition"
          >
            재학 증빙 서류 제출
          </button>

        </div>
      </div>
    </div>)}
  </div>
  );
};

export default VerificationPage;
