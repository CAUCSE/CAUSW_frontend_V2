"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PreviousButton, UserService, useUserStore } from "@/shared";
import SubmitAcademicRecordModal from "@/entities/application/AcademicRecordInput";
import SubmitApplicationModal from "@/entities/application/AdmissionApplicationPage";


const VerificationPage: React.FC = () => {
  const router = useRouter();
  const { getUserAdmissionInfo, getUserInfo, checkIsAcademicRecordSubmitted } = UserService();
  const [ isAdmissionApplicationApplied, setIsAdmissionApplicationApplied] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(true);
  const [ isAcademicRecordModalOpen, setIsAcademicModalOpen ] = useState(false);
  const [ isAdmissionModalOpen, setIsAdmissionModalOpen ] = useState(false);
  const [ isUserUndetermined, setIsUndetermined ] = useState(false);
  const [ userState, setUserState ] = useState('');
  const [ userAcademicStatus, setUserAcademicStatus] = useState('');

  // true 상태일 경우 재학 증빙 서류 제출 칸은 비활성화 ( 회색 버튼 )
  // false 상태일 경우 가입 신청서 제출 칸은 비활성화 ( 회색 버튼, 이미 제출 표시 )
  const [ isAwaitStatus, setIsAwaitStatus ] = useState(false); 

  // undetermined 상태일 경우
  const [ isUndeterminedStatus, SetIsUndeterminedStatus ] = useState(false);


  // UNDONE, AWAIT, COMPLETED로 관리
  const [ admissionApplicationStatus , setAdmissionApplicationStatus ] = useState('');

  // BANNED, UNDONE, COMPLETED로 관리
  const [ academicRecordApplicationStatus , setAcademicRecordApplicationStatus ] = useState('');


  useEffect(() => {

      const getInfo = async () => {
        try {
          const response = await getUserInfo();
          console.log(response);

          // 상태 값들 가져오기
          const state = response.data.state;
          const academicStatus = response.data.academicStatus;

          // 상태 업데이트
          setUserState(state);
          setUserAcademicStatus(academicStatus);

          // 조건문 처리 (상태 값이 올바르게 설정된 후에 처리)
          if (state === "AWAIT") {
            setIsAwaitStatus(true);
            console.log("await 인 상태");
            setAcademicRecordApplicationStatus("BANNED");
            checkAdmissionApplication(); // AWAIT인 경우 학적 상태 증빙 서류 제출 못하니까 admissionapplication 체크
          } else if (state === "ACTIVE") {
            setIsAwaitStatus(false);
            console.log("await가 아닌 상태");
            setAdmissionApplicationStatus("COMPLETED");
            checkAcademicRecordApplication(); // AWAIT가 아닌 경우 학적 상태 증빙 서류 제출 필요 academicrecordapplication 체크
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      getInfo();

      }, []);


  const checkAdmissionApplication = async() => {

    try{
      const response = await getUserAdmissionInfo();
      console.log("가입 신청서 제출 정보", response);
      setAdmissionApplicationStatus("COMPLETED");
    }
    catch(error){
      console.log('가입 신청서 조회 에러 ', error);
      setAdmissionApplicationStatus("UNDONE");
    }
  }

  const checkAcademicRecordApplication = async() => {
    try {
      const response = await checkIsAcademicRecordSubmitted();
      setAcademicRecordApplicationStatus("COMPLETED");
      console.log(response);
    }
    catch (error) {

      setAcademicRecordApplicationStatus("UNDONE");
      console.log(error);
    }
  }
  


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
{admissionApplicationStatus === "AWAIT" && (          <div
            className="w-full py-3 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
          >
            가입 신청서 제출 완료됨 (승인 대기중)
          </div>)}

{admissionApplicationStatus === "COMPLETED" && (          <div
            className="w-full py-3 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
          >
            가입 신청서 제출 완료됨 (승인 완료)
          </div>)}

{(admissionApplicationStatus === "UNDONE" &&    <button
            onClick={() => {setIsAdmissionModalOpen(true)}}
            className="w-full py-3 bg-focus text-white rounded-lg hover:bg-blue-500 transition"
          >
            가입 신청서 제출
          </button>)}

{(academicRecordApplicationStatus === "BANNED" &&   <div
            className="w-full py-3 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
          >
            재학 증빙 서류 제출 (가입 신청서 승인 시 활성화)
          </div>)}

{(academicRecordApplicationStatus === "COMPLETED" &&          <div
            className="w-full py-3 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
          >
            재학 증빙 서류 제출됨 (승인이 완료되면 서비스를 이용할 수 있습니다.)
          </div>)}

{(academicRecordApplicationStatus === "UNDONE" &&          <button
            onClick={() => {setIsAcademicModalOpen(true)}}
            className="w-full py-3 bg-focus text-white rounded-lg hover:bg-blue-500 transition"
          >
            재학 증빙 서류 제출
          </button>)}



        </div>
      </div>
    </div>)}
  </div>
  );
};

export default VerificationPage;
