"use client";
import { useState } from "react";
import { SettingRscService } from "@/shared";

export function WarningModal({ isOpen, onClose, admission, type }: { isOpen: boolean, onClose: () => void, admission: any, type: string }) {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;


  const rejectOrExpelTarget = async (userId: string, type: string, reason: string) => {
    const { rejectAdmission, expelUser } = SettingRscService();
    if (await (type === "REJECT" ? rejectAdmission(userId, reason) : expelUser(userId, reason))) {
      alert(`${type === "REJECT" ? "가입 신청서가 거부되었습니다": "사용자가 추방되었습니다."}`);
      window.history.back();
    }
    else
  {   alert("오류가 발생했습니다. 관리자에게 문의하세요");
  }
  }
  
  
  const deleteTarget = async(userId) => {
    const { deleteUser } = SettingRscService();
    if (await deleteUser(userId)) {
      alert("사용자가 영구 삭제되었습니다.");
      window.history.back();
    }
    else
    {  
      alert("사용자 삭제에 실패했습니다. 관리자에게 문의하세요");
    }
  }

  return (
    <div className="fixed w-full h-full inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
{(type === "REJECT" || type === "EXPEL") &&( <div className="flex flex-col items-center bg-white w-5/6 lg:w-1/3 h-2/3 rounded-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-xl"
          onClick={onClose} 
        >
          x
        </button>
        <>
        <h2 className="text-lg font-semibold mb-2 text-center">{admission.name ?? admission.user.name}({admission.studentId ?? admission.user.studentId}) {type === "REJECT" ? "가입 거부" : "추방"} 하기</h2>
        <label className="text-red-500 font-semibold mb-6 block text-center">       
            {type === "REJECT" ? "거부" : "추방"} 사유 작성
        </label>     
        <textarea
          className="border border-gray-300 rounded-lg p-2 h-3/6 w-full mb-24"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={type === "REJECT" ? "가입 거부 사유 작성" : "추방 사유 작성"} 
        />  
        <button
          className={`${type === "REJECT" ? "bg-focus hover:bg-blue-500" : "bg-red-500 hover:bg-red-600"} text-white w-4/6 py-2 rounded-lg`}
          onClick={() => {
            rejectOrExpelTarget(admission.id ?? admission.user.id, type, reason);
          }}
        >
{type === "REJECT" ? "가입 거부하기" : "추방하기"} 
        </button>
        </>
      </div>)}
{type === "DELETE" &&(<div className="flex justify-center items-center flex-col bg-white w-5/6 sm:w-1/2 h-1/2 lg:h-1/3 rounded-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-xl"
          onClick={onClose} 
        >
          x
        </button>
        <>
        <h2 className="text-lg lg:text-2xl font-semibold mt-4 mb-4 text-center">{admission.name ?? admission.user.name}({admission.studentId ?? admission.user.studentId})을 목록에서 삭제</h2>
        <label className="text-ml lg:text-lg text-red-500 font-semibold mb-2 block text-center">       
        {admission.name ?? admission.user.name}({admission.studentId ?? admission.user.studentId})을 정말로 목록에서 삭제하시겠습니까?
        </label>     
        <label className="text-ml lg:text-lg text-red-500 font-semibold mb-6 block text-center">       
        위 작업은 돌이킬 수 없습니다.
        </label>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full">
        <button
          className= "bg-red-500 hover:bg-red-600 text-white w-2/3 py-2 rounded-lg mr-2 mb-4"
          onClick={() => {
            deleteTarget(admission.id ?? admission.user.id);
          }}
        >목록에서 삭제
        </button>
        <button
          className= "bg-gray-300 hover:bg-gray-400 text-white w-2/3 py-2 rounded-lg mr-2 mb-4"
          onClick={() => {
            onClose();
          }}
        >취소
        </button>
        </div>
        </>
      </div>)}

    </div>
  );
}

