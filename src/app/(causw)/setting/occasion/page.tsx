'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { 
  noAccessTokenCode, 
  noPermissionCode, 
  AuthRscService 
} from "@/shared";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  message: string;
}

const Occasion = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentClass, setStudentClass] = useState('17');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const router = useRouter();
  const { signout, updateAccess } = AuthRscService();
  const classes = ['15', '18', '19', '20'];

  const handleError = async (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error.response?.data?.message || error.message;
    
    if (typeof errorMessage === 'string' && noAccessTokenCode.includes(errorMessage)) {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        await signout();
        location.href = "/auth/signin";
      } else {
        try {
          await updateAccess(refresh);
          return true;
        } catch {
          await signout();
          location.href = "/auth/signin";
        }
      }
    } else if (typeof errorMessage === 'string' && noPermissionCode.includes(errorMessage)) {
      router.push("/no-permission");
    } else {
      setError(errorMessage as string);
    }
    return false;
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/notifications/occasion');
      setNotifications(response.data);
    } catch (err) {
      await handleError(err as AxiosError<ErrorResponse>);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put('/api/v1/notifications/occasion', {
        studentClass,
      });
      alert('설정이 저장되었습니다.');
    } catch (err) {
      const shouldRetry = await handleError(err as AxiosError<ErrorResponse>);
      if (shouldRetry) {
        handleSave();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-6">경조사 관리 페이지</h1>
      
      <div className="mb-6">
        <h2 className="text-lg mb-4">경조사 알림을 받을 학번 설정</h2>
        
        <div className="relative mb-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={studentClass}
              className="w-20 p-2 border rounded"
              readOnly
            />
            <span className="ml-2">학번</span>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="ml-2 px-4 py-1 bg-blue-400 text-white rounded"
            >
              추가
            </button>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute z-10 w-48 mt-1 bg-white border rounded shadow-lg">
              {classes.map((classNum) => (
                <div
                  key={classNum}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStudentClass(classNum);
                    setIsDropdownOpen(false);
                  }}
                >
                  {classNum}학번
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
            />
            <span>모든 학번의 경조사 알림 받기</span>
          </label>
        </div>
      </div>

      <button 
        className="w-full py-2 bg-blue-400 text-white rounded"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? '저장 중...' : '저장'}
      </button>

      {error && (
        <p className="mt-4 text-red-500">오류: {error}</p>
      )}
    </div>
  );
};

export default Occasion;