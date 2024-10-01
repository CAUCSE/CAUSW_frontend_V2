"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserService, UserRscService, UserCouncilFeeService, Modal, RedirectModal, PreviousButton, useUserStore } from '@/shared';


const PersonalInfoPage = () => {
  const { register, handleSubmit, setValue, watch } = useForm<User.userUpdateDto>({
    defaultValues: {
      profileImage: null,
      nickname: '',
      academicStatus: 'ENROLLED',
    },
  });
  
  const state = useUserStore((data) => data.state)
  console.log(state);

  const [studentCouncilFeeStatus, setStudentCouncilFeeStatus] = useState('');
  const [paidFeeSemesters, setpaidFeeSemesters] = useState('');
  const [remainingFeeSemesters, setRemainingFeeSemesters] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState('/images/default_profile.png');

  // 원래의 학적 상태 저장
  const router = useRouter();
  const { getUserInfo } = UserService();
  const { getUserCouncilFeeInfo } = UserCouncilFeeService();
  const { updateInfo } = UserRscService();

  // 제출 시 모달
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  

  const {
    userEmail,
    userName,
    userAdmissionYear,
    userStudentId,
    userCurrentCompletedSemester,
    userMajor,
    userAcademicStatus,
    userGraduationYear,
  } = useUserStore((state) => ({
    userEmail: state.email,
    userName: state.name,
    userAdmissionYear: state.admissionYear,
    userStudentId: state.studentId,
    userCurrentCompletedSemester: state.currentCompletedSemester,
    userMajor: state.major,
    userAcademicStatus: state.academicStatus,
    userGraduationYear: state.graduationYear,
  }));  

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        // 유저 기본 정보 받아오기
        const responseUserData = await getUserInfo();
        const userData = responseUserData.data;
        console.log(userData);

//         학생회비 납부 정보 받아오기 
        // const responseUserCouncilFeeData = await getUserCouncilFeeInfo();
        // const userCouncilFeeData = responseUserCouncilFeeData.data;
        // console.log(userCouncilFeeData);

        // 유저에 맞게 값들 대입입
        setProfileImagePreview(await userData.profileImageUrl ?? '/images/default_profile.png');
        setValue('nickname', await userData.nickname);
        setValue('academicStatus', await userData.academicStatus);
      

        console.log(userData.profileImageUrl);

        // setStudentCouncilFeeStatus(userCouncilFeeData.isAppliedThisSemester === true ? "O" : "X");
        // setpaidFeeSemesters(`${userCouncilFeeData.numOfPaidSemester}학기`);
        // setRemainingFeeSemesters(`${userCouncilFeeData.restOfSemester}학기`);
        
      } catch (error: any) {
        console.error('Failed to fetch user info:', error?.message);
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
      console.log(file);
    }
  
  };


  // 개인정보 수정한 내용 제출하는 함수
  const onSubmit = async (data: User.userUpdateDto) => {


    
    {
      
      try {
        const response = await updateInfo(data);
        setIsSuccessModalOpen(true)
        console.log(response);
      } catch (error) {
        setIsFailModalOpen(true)
        console.error("개인정보 수정에 실패하였습니다 :", error);
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
              
              <div className="mb-4 ml-4 w-1/2 lg:w-full">
                <div className="w-full lg:w-full">
                  <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학적 상태</label>
                    <div className= "flex flex-row flex-wrap sm:flex-nowrap rounded-md w-full lg:w-5/6">
                      <div className="p-2 mr-2 mb-2 border border-gray-300 rounded-md text-center w-full lg:w-3/6">
                      {userAcademicStatus === "ENROLLED" &&(<>재학</>)}
                      {userAcademicStatus === "LEAVE_OF_ABSENCE" &&(<>휴학</>)}
                      {userAcademicStatus === "GRADUATED" &&(<>졸업</>)}
                      </div>
                      <button onClick = {() => {router.push('./updateacademicrecord')}} className="p-2 mr-2 mb-2 border border-gray-300 rounded-md bg-focus text-white text-center w-full lg:w-5/6">
                      학적 상태 수정</button>
                    </div>
                </div>
              </div>

              

              
              
            </div>
            
          </div>

          {/* 오른쪽: 이메일, 이름, 학번 등 */}
          <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-between">
            <div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">이름</label>
                <p className="text-gray-700">{userName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">이메일</label>
                <p className="text-gray-700">{userEmail}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학번</label>
                <p className="text-gray-700">{userStudentId}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">입학 년도</label>
                <p className="text-gray-700">{userAdmissionYear}</p>
              </div>
              
              {userAcademicStatus === "GRADUATED" && (
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">졸업 년도</label>
                <p className="text-gray-700">{userGraduationYear}</p>
              </div>)}
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">등록 완료 학기</label>
                <p className="text-gray-700">{userCurrentCompletedSemester}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-2xl lg:text-lg font-semibold mb-1">학부(학과)</label>
                <p className="text-gray-700">{userMajor}</p>
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

                {/* 졸업 상태로 변경 시도 시 경고 모달 */}
                {isSuccessModalOpen && (
          <Modal closeModal={() => setIsSuccessModalOpen(false)}>
            <div className='p-2 lg:p-4'>
            <div>변경 사항이 저장되었습니다.</div>
            </div>
          </Modal>
        )}
                {/* 졸업 상태로 변경 시도 시 경고 모달 */}
                {isFailModalOpen && (
          <Modal closeModal={() => setIsFailModalOpen(false)}>
            <div className='p-2 lg:p-4'>
            <div className ="flex flex-col justify-center items-center">
            <div>오류가 발생했습니다. </div>
                <div>다시 시도해주세요</div>
              </div>  
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
