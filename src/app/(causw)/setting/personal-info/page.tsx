"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserService, UserCouncilFeeService, Modal, RedirectModal, PreviousButton } from '@/shared';

type FormValues = {
  profileImage: File | null;
  nickname: string;
  academicStatus: string;
};

const PersonalInfoPage = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      profileImage: null,
      nickname: '',
      academicStatus: '재학',
    },
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [admissionYear, setAdmissionYear] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [completedSemester, setCompletedSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [studentCouncilFeeStatus, setStudentCouncilFeeStatus] = useState('');
  const [paidFeeSemesters, setpaidFeeSemesters] = useState('');
  const [remainingFeeSemesters, setRemainingFeeSemesters] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState('/images/default_profile.png');

  const [originAcademicStatus, setOriginAcademicStatus] = useState('');

  const router = useRouter();
  const { getUserInfoRevised, updateUserInfo, checkCurrentAcademicRecord } = UserService();
  const { getUserCouncilFeeInfo, registerCouncilFee } = UserCouncilFeeService();
  const formData = new FormData();


  // 모달 열림/닫힘 상태를 관리
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isWarningAccepted, setIsWarningAccepted] = useState(false);

  // 모달 열기
  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const openWarningModal = () => {
    setIsWarningModalOpen(true);
  }

  // 모달 닫기
  const closeModal = () => {
    if (isSubmitModalOpen)
      setIsSubmitModalOpen(false);
    if (isWarningModalOpen)
    {
      setIsWarningModalOpen(false);
      setIsWarningAccepted(true);
    }
      
  };
  
  const [academicStatus, setAcademicStatus] = useState<string>(''); // 학적 상태를 저장할 상태
  const selectedAcademicStatus = watch('academicStatus');
  

  useEffect(() => {
    setAcademicStatus(selectedAcademicStatus)
  }, [selectedAcademicStatus])

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        // 유저 기본 정보 받아오기
        const responseUserData = await getUserInfoRevised();
        const userData = responseUserData.data;
        console.log(userData);


//         학생회비 납부 정보 받아오기 
//         const responseUserCouncilFeeData = await getUserCouncilFeeInfo();
//         const userCouncilFeeData = responseUserCouncilFeeData.data;
//         console.log(userCouncilFeeData);



        // const responseAcademicRecord = await checkCurrentAcademicRecord();/
        // console.log(responseAcademicRecord);

        // formData에 유저 정보 값들 넣어두기
        formData.append('name', await userData.name);
        formData.append('studentId', '11');
        formData.append('admissionYear', await userData.admissionYear);
        formData.append('major', await userData.major);
        formData.append('currentCompletedSemester', await userData.currentCompletedSemester);
        formData.append('graduationYear', await userData.graduationYear);
        formData.append('graduationMonth', await userData.graduationType);
        formData.append('phoneNumber', '01012363334');

        // 유저에 맞게 값들 대입입
        setProfileImagePreview(userData.profileImage ?? '/images/default_profile.png');
        setValue('nickname', userData.nickname);
        setValue('academicStatus', userData.academicStatus);
        setValue('profileImage', userData.profileImage);

        setName(userData.name);
        setEmail(userData.email);
        setStudentId(userData.studentId);
        setAdmissionYear(userData.admissionYear);
        setGraduationYear(userData.graduationYear);
        setCompletedSemester(userData.currentCompletedSemester);
        setDepartment(userData.major);
        setOriginAcademicStatus(userData.academicStatus);

      } catch (error: any) {
        console.error('Failed to fetch user info:', error);
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImagePreview(newImageUrl);
      setValue('profileImage', file);
    }
  };


  // 개인정보 수정한 내용 제출하는 함수
  const onSubmit = async (data: FormValues) => {
    formData.append('nickname', data.nickname);
    formData.append('academicStatus', data.academicStatus);

    if (data.academicStatus === "ENROLLED" && originAcademicStatus === "LEAVE_OF_ABSENCE")
    {
      openSubmitModal();
    }
    else if (data.academicStatus === "GRADUATED" && isWarningAccepted === false)
    {
      openWarningModal();
    }
    else
    {
      if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
      }
      console.log(formData);  

      try {
        const response = await updateUserInfo(formData);
        if (response.status === 200) {
          console.log("Profile updated successfully");
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이전 버튼 */}
        <div className="sticky top-0 bg-[#F8F8F8] w-full flex justify-left items-center py-2 mb-4">
          <button
            onClick={() => router.back()}
            className="text-black-500 hover:text-gray-500 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            이전
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">개인정보 관리</h1>

        {/* 반응형 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* 왼쪽: 프로필 사진, 닉네임, 학적 상태 */}
          <div className="flex flex-col items-center lg:flex lg:items-center lg:justify-center">
            <img
              src={profileImagePreview}
              alt="프로필"
              className="w-32 h-32 lg:w-32 lg:h-32 rounded-full object-cover mb-4"
            />
            <label
              htmlFor="profileImage"
              className="flex justify-center text-sm text-black-500 cursor-pointer bg-focus text-white p-3 rounded-3xl w-32 lg:w-40 hover:bg-blue-600"
            >
              프로필 사진 수정
            </label>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              {...register('profileImage')}
              onChange={handleProfileImageChange}
            />

            {/* 닉네임과 학적 상태 */}
            <div className="w-full mt-4 flex flex-row lg:flex-col">
              <div className="mb-4 ml-4 w-1/2 lg:w-full">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">닉네임</label>
                <input
                  type="text"
                  {...register('nickname', { required: true })}
                  className="p-2 border border-gray-300 rounded-md w-full lg:w-5/6"
                />
              </div>

              {/* 학적 상태가 졸업이 아닐 경우 */}
              {originAcademicStatus !== "GRADUATED" && (
              <div className="mb-4 ml-4 w-1/2 lg:w-full">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학적 상태</label>
                <select
                  {...register('academicStatus', { required: true })}
                  className="p-2 border border-gray-300 rounded-md w-full lg:w-5/6"
                >
                  <option value="ENROLLED">재학</option>
                  <option value="LEAVE_OF_ABSENCE">휴학</option>
                  <option value="GRADUATED">졸업</option>
                </select>
              </div>)}
              

              
              {/* 학적 상태가 졸업 일 경우 */}
              {originAcademicStatus === "GRADUATED" && (
                <div className="mb-4 ml-4 w-1/2 lg:w-full">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학적 상태</label>
                <div className="p-2 border border-gray-300 rounded-md w-full lg:w-5/6">졸업</div>
              </div>
              )}
              {}
            </div>
            {academicStatus == "GRADUATED" && (
                <label className = "text-red-500 lg:block">학적 상태를 졸업으로 변경할 경우 이후 재학, 휴학으로 변경이 불가합니다.</label>
              )}
            
          </div>

          {/* 오른쪽: 이메일, 이름, 학번 등 */}
          <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-between">
            <div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">이름</label>
                <p className="text-gray-700">{name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">이메일</label>
                <p className="text-gray-700">{email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학번</label>
                <p className="text-gray-700">{studentId}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">입학 년도</label>
                <p className="text-gray-700">{admissionYear}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">졸업 년도</label>
                <p className="text-gray-700">{graduationYear}</p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">등록 완료 학기</label>
                <p className="text-gray-700">{completedSemester}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학부(학과)</label>
                <p className="text-gray-700">{department}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">본 학기 학생회비 적용 여부</label>
                <p className="text-gray-700">{studentCouncilFeeStatus}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">납부한 학생회비 학기 차수</label>
                <p className="text-gray-700">{paidFeeSemesters}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">남은 학생회비 차수</label>
                <p className="text-gray-700">{remainingFeeSemesters}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 재학 증빙서류 제출 안내 모달 */}
        {isSubmitModalOpen &&(
        <RedirectModal closeModal={closeModal} redirectTo="./updatedocuments">
          <div className = "flex items-center flex-col ">
            <h1>휴학->재학 변경 시</h1>
            <p>재학 증빙 서류를 제출해야 합니다.</p>
          </div>
        </RedirectModal>)}

        {/* 졸업 상태로 변경 시도 시 경고 모달 */}
        {isWarningModalOpen && (
          <Modal closeModal={closeModal}>
            <div className='p-2 lg:p-4'>
            <div>졸업 변경 시 추후 재학, 휴학으로 변경이 불가합니다.</div>
            <div>(창을 닫은 후 다시 제출하면 변경사항이 저장됩니다.)</div>
            </div>
          </Modal>
        )}

        {/* 변경 사항 저장 버튼 */}
        <div className="mt-8 flex justify-center">
          <button type="submit" className="bg-focus text-white p-3 rounded-3xl w-32 lg:w-80 hover:bg-blue-600">
            변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoPage;
