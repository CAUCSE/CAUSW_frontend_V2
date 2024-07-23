"use client";
import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const admissionYearOptions = Array.from({ length: 20 }, (_, i) => 2024 - i); // 입학 년도 선택지 옵션 배열로 저장
  const graduateYearOptions = Array.from({ length: 10 }, (_, i) => 2024 + i); // 졸업 년도 선택지 옵션 배열로 저장

  const conductedSemesters = [];

  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 2; k++) {
      conductedSemesters.push(`${j}-${k}`);
    }
  } // 수행한 학기 배열로 저장 1-1, 1-2, 2-1 ... 4-2 순서대로

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center ">회원가입</h1>
        
        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">아이디</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="아이디를 입력해주세요!" 
            {...register('아이디', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
            <label className="block text-gray-700 font-bold mb-2">비밀번호</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="password" 
            placeholder="8자리 이상, 영어/숫자/특수 문자 조합" 
            {...register('비밀번호', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">비밀번호 확인</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="password" 
            placeholder="8자리 이상, 영어/숫자/특수 문자 조합" 
            {...register('비밀번호 확인', { required: true })}
          />
        </div>
        
        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">이름</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="이름을 입력해주세요" 
            {...register('이름', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">닉네임</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="닉네임을 입력해주세요" 
            {...register('닉네임', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">입학년도</label>
          <select 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
            {...register('입학년도', { required: true })}
          >
            <option value="">-선택해주세요-</option>
            {admissionYearOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">학번</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="number" 
            placeholder="학번을 입력해주세요" 
            {...register('학번', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">학부/학과</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="ex) 소프트웨어학부, 컴퓨터공학부" 
            {...register('학부/학과', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
          <label className="block text-gray-700 font-bold mb-2">연락처</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="-를 넣어 작성해주세요. ex) 010-1234-1234" 
            {...register('연락처', { required: true })}
          />
        </div>

        <div className="mb-6 ml-48">
          <div className = "flex">
            <label className="block text-gray-700 font-bold mb-2">학적 상태</label>
            <p className="text-xs text-red-500 mt-1 ml-4">(졸업 선택 시 추후 재학/휴학 전환이 불가합니다)</p>
          </div>
          <select 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
            {...register('학적 상태', { required: true })}
          >
            <option value="">-선택해주세요-</option>
            <option key="재학/휴학" value="재학/휴학">재학/휴학</option>
            <option key="졸업" value="졸업">졸업</option>
          </select>
        </div>
        

        <div className="mb-6 ml-48">
          <div className = "flex">
            <label className="block text-gray-700 font-bold mb-2">현재 등록 완료된 학기</label>
            <p className="text-xs text-red-500 mt-1 ml-4">(등록금을 납부한 학기)</p>
          </div>
          <select 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
            {...register('현재 등록 완료된 학기', { required: true })}
          >
            <option value="">-선택해주세요-</option>
            {conductedSemesters.map((option, index) => (
              <option key={index + 1} value={option}>
                {`${index + 1}차 학기 (${option})`}
              </option>
            ))}
            <option key="9" value="9차 학기 이상">9차 학기 이상</option>
          </select>
        </div>
        
        <div className="mb-6 ml-48 max-w-md">
          <label className="block text-gray-700 font-bold mb-2">졸업 시기</label>
          <div className="flex space-x-4">
            <p className = "text-gray-700 font-bold mb-2 p-2">년</p>
            <select 
              className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
              {...register('졸업 시기 년', { required: true })}
            >
              <option value="">-선택해주세요-</option>
              {graduateYearOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <p className = "text-gray-700 font-bold mb-2 p-2">월</p>
            <select 
              className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
              {...register('졸업 시기 월', { required: true })}
            >
              <option value="">-선택해주세요-</option>
              <option key="1" value="2월">2월</option>
              <option key="2" value="8월">8월</option>
              <option key="3" value="기타">기타</option>
            </select>
          </div>
        </div>



        <div className="mb-6 ml-48 max-w-md">
          <label className="block text-gray-700 font-bold mb-2">학부 재적/졸업 증빙 자료</label>
          <p className="text-xs text-red-500 mt-1">
          ex) mportal &gt; 내 정보수정 &gt; 등록현황, 재학/휴학 증명서, 졸업 증명서, 졸업장 등
            증빙 자료 포함 필수 요소: 이름, 학번, 학부(학과), 현재 학적 상태(재학/휴학/졸업), 재학/휴학의 경우 수료 학기 차수, 졸업의 경우 졸업 시기
          </p>
          
          <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg p-4">
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span className="text-gray-600 mt-2">파일을 선택하세요</span>
              <input id="file-upload" type="file" className="hidden" {...register('파일', { required: true })} />
            </label>
          </div>
        </div>

        <div className="flex items-center mb-6 ml-48">
          <input 
            type="checkbox" 
            className="mr-2" 
            {...register('약관 동의', { required: true })} 
          />
          <label className="block text-gray-700">약관 읽고 동의 하기!!!</label>
        </div>
        <div className="flex justify-center">

        <button 
            type="submit" 
            className="w-full max-w-xs place-self-center bg-focus text-black p-2 rounded-lg hover:bg-blue-400 transition-colors duration-300"
          >
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
