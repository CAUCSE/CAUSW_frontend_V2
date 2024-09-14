"use client";

import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  const router = useRouter();

  const handlePasswordResetClick = () => {
    // "resetpassword" 페이지로 이동
    router.push('/auth/resetpassword');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* 비밀번호 변경 버튼 */}
      <button
        onClick={handlePasswordResetClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        비밀번호 변경
      </button>
    </div>
  );
};

export default SettingsPage;
