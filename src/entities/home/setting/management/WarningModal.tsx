'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { SettingRscService } from '@/shared';

export function WarningModal({
  isOpen,
  onClose,
  admission,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  admission: any;
  type: string;
}) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const rejectOrExpelTarget = async (userId: string, type: string, reason: string) => {
    const { rejectAdmission, expelUser } = SettingRscService();
    try {
      await (type === 'REJECT' ? rejectAdmission(userId, reason) : expelUser(userId, reason));
      toast.success(`${type === 'REJECT' ? '가입 신청서가 거부되었습니다' : '사용자가 추방되었습니다.'}`);

      let path;
      type === 'REJECT' ? (path = 'reject') : (path = 'active');
      setTimeout(() => {
        window.location.assign(`/setting/management/user/${path}`);
      }, 500);
    } catch {
      toast.error('오류가 발생했습니다. 관리자에게 문의하세요');
    }
  };

  const deleteTarget = async (userId) => {
    const { deleteUser } = SettingRscService();
    try {
      await deleteUser(userId);
      toast.success('사용자가 영구 삭제되었습니다.');
      setTimeout(() => {
        window.location.assign('/setting/management/user/admission');
      }, 500);
    } catch {
      toast.error('사용자 삭제에 실패했습니다. 관리자에게 문의하세요');
    }
  };

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-75">
      {(type === 'REJECT' || type === 'EXPEL') && (
        <div className="relative flex h-2/3 w-5/6 flex-col items-center rounded-lg bg-white p-6 lg:w-1/3">
          <button className="absolute right-3 top-3 text-xl" onClick={onClose}>
            x
          </button>
          <>
            <h2 className="mb-2 text-center text-lg font-semibold">
              {admission.name ?? admission.user.name}({admission.studentId ?? admission.user.studentId}){' '}
              {type === 'REJECT' ? '가입 거부' : '추방'} 하기
            </h2>
            <label className="mb-6 block text-center font-semibold text-red-500">
              {type === 'REJECT' ? '거부' : '추방'} 사유 작성
            </label>
            <textarea
              className="mb-24 h-3/6 w-full rounded-lg border border-gray-300 p-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={type === 'REJECT' ? '가입 거부 사유 작성' : '추방 사유 작성'}
            />
            <button
              className={`${type === 'REJECT' ? 'bg-focus hover:bg-blue-500' : 'bg-red-500 hover:bg-red-600'} w-4/6 rounded-lg py-2 text-white`}
              onClick={() => {
                rejectOrExpelTarget(admission.id ?? admission.user.id, type, reason);
              }}
            >
              {type === 'REJECT' ? '가입 거부하기' : '추방하기'}
            </button>
          </>
        </div>
      )}
      {type === 'DELETE' && (
        <div className="relative flex h-1/2 w-5/6 flex-col items-center justify-center rounded-lg bg-white p-6 sm:w-1/2 lg:h-1/3">
          <button className="absolute right-3 top-3 text-xl" onClick={onClose}>
            x
          </button>
          <>
            <h2 className="mb-4 mt-4 text-center text-lg font-semibold lg:text-2xl">
              {admission.name ?? admission.user.name}({admission.studentId ?? admission.user.studentId})을 목록에서 삭제
            </h2>
            <label className="text-ml mb-2 block text-center font-semibold text-red-500 lg:text-lg">
              {admission.name ?? admission.user.name}({admission.studentId ?? admission.user.studentId})을 정말로
              목록에서 삭제하시겠습니까?
            </label>
            <label className="text-ml mb-6 block text-center font-semibold text-red-500 lg:text-lg">
              위 작업은 돌이킬 수 없습니다.
            </label>
            <div className="flex w-full flex-col items-center justify-center lg:flex-row">
              <button
                className="mb-4 mr-2 w-2/3 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
                onClick={() => {
                  deleteTarget(admission.id ?? admission.user.id);
                }}
              >
                목록에서 삭제
              </button>
              <button
                className="mb-4 mr-2 w-2/3 rounded-lg bg-gray-300 py-2 text-white hover:bg-gray-400"
                onClick={() => {
                  onClose();
                }}
              >
                취소
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
}
