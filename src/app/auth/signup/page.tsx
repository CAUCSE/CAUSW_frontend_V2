"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const SignUpPage = () => {

  const [selectedStatus, setSelectedStatus] = useState(''); // 학적상태 선택에 따른 UI 표시
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };


  interface IAuthForm {
    id: string;
    pw: string;
    pwConfirm: string;
    nickname: string;
    name: string;
    agreeToTerms: boolean;
    graduateYear: string;
    graduateMonth: string;
    admissionYear: string;
    studentNumber: number;
    studentState: "재학/휴학" | "졸업";
    major: string;
    conductedSemesters: string;
    phoneNumber: string;
    file: File;
  }
  
  const { register, handleSubmit, watch, formState: { errors }, getValues} = useForm<IAuthForm>({mode: 'onBlur'});
  const yearOptions = Array.from({ length: 100 }, (_, i) => 2024 - i); // 입학 년도, 졸업 년도 선택지 옵션 배열로 저장

  const conductedSemesters = [];

  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 2; k++) {
      conductedSemesters.push(`${j}-${k}`);
    }
  } // 수행한 학기 배열로 저장 1-1, 1-2, 2-1 ... 4-2 순서대로

  const onSubmit = (data: any) => {
    console.log(data);
  };
  



  
  console.log(watch());
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h1 className="text-3xl sm:text-2xl font-bold mb-6 text-center ">회원가입</h1>
        
        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">아이디</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="아이디를 입력해주세요" 
            {...register('id', { 
              required: '아이디를 입력해주세요'})}
          />
          <p>{errors?.id?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
            <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">비밀번호</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="password" 
            placeholder="8자리 이상, 영어/숫자/특수 문자 조합" 
            {...register('pw', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '8글자 이상 입력해주세요',
              },
              pattern: {
                value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                message:
                '비밀번호를 8~16자로 영문, 숫자, 특수기호를 조합해서 사용하세요. ',
              }
            })}
          />
          <p>{errors?.pw?.message}</p>

        </div>

        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">비밀번호 확인</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="password" 
            placeholder="8자리 이상, 영어/숫자/특수 문자 조합" 
            {...register('pwConfirm', { 
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '8글자 이상 입력해주세요',
              },
              pattern: {
                value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                message:
                '비밀번호를 8~16자로 영문, 숫자, 특수기호를 조합해서 사용하세요. ',
              },
              validate: {
                check: (val) => {
                if (getValues("pw") !== val) {
                    return "비밀번호가 일치하지 않습니다.";
                }
              }
            }
            })}/>
          <p>{errors?.pwConfirm?.message}</p>

        </div>
        
        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">이름</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="이름을 입력해주세요" 
            {...register('name', {
              required: '이름을 입력해주세요' })}
          />
          <p>{errors?.name?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">닉네임</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="닉네임을 입력해주세요" 
            {...register('nickname', { 
              required: '닉네임을 입력해주세요' })}
          />
          <p>{errors?.nickname?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">입학년도</label>
          <select 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
            {...register('admissionYear', { 
              required: '입학 년도를 선택해주세요' })}
          >
            <option value="">-선택해주세요-</option>
            {yearOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>{errors?.admissionYear?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">학번</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="number" 
            placeholder="학번을 입력해주세요" 
            {...register('studentNumber', { required: 
              '학번을 입력해주세요' })}
          />
          <p>{errors?.studentNumber?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">학부/학과</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="ex) 소프트웨어학부, 컴퓨터공학부" 
            {...register('major', {
              required: '학부/학과를 입력해주세요'})}
          />
          <p>{errors?.major?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">연락처</label>
          <input 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md" 
            type="text" 
            placeholder="-를 넣어 작성해주세요. ex) 010-1234-1234" 
            {...register('phoneNumber', { 
              required: '연락처를 입력해주세요',
              pattern: {
                value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                message: '전화번호 형식이 아닙니다.'
              } })}
          />
          <p>{errors?.phoneNumber?.message}</p>
        </div>

        <div className="mb-6 ml-4 mr-4">
          <div className = "flex sm:flex-col">
            <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2 sm:mb-0">학적 상태</label>
            <p className="text-md text-red-500 mt-1 ml-4 sm:ml-0">(졸업 선택 시 추후 재학/휴학 전환이 불가합니다)</p>
          </div>
          <select
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
            {...register('studentState', { 
              required: '학적 상태를 선택해주세요' })}
              onChange={handleStatusChange}
          >
            <option value="">-선택해주세요-</option>
            <option key="재학/휴학" value="재학/휴학">재학/휴학</option>
            <option key="졸업" value="졸업">졸업</option>
          </select>
          <p>{errors?.studentState?.message}</p>
        </div>
        
        {selectedStatus === '재학/휴학' &&(
        <div className="mb-6 ml-4 mr-4">
          <div className = "flex sm:flex-col">
            <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2 sm:mb-0">현재 등록 완료된 학기</label>
            <p className="text-md text-red-500 mt-1 ml-4 sm:ml-0">(등록금을 납부한 학기)</p>
          </div>
          <select 
            className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
            {...register('conductedSemesters', { 
              required: '현재 등록 완료된 학기를 선택해주세요' })}
          >
            <option value="">-선택해주세요-</option>
            {conductedSemesters.map((option, index) => (
              <option key={index + 1} value={option}>
                {`${index + 1}차 학기 (${option})`}
              </option>
            ))}
            <option key="9" value="9차 학기 이상">9차 학기 이상</option>
          </select>
          <p>{errors?.conductedSemesters?.message}</p>
        </div>)}
        

        {selectedStatus === '졸업' &&(
        <div>
          <div className="mb-6 ml-4 mr-4 max-w-md">
            <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">졸업 시기</label>

            <div className="flex space-x-4 sm:space-x-0 sm:flex-col">

              <div>
                <div className="flex space-x-4">
                  <p className = "text-gray-700 text-xl sm:text-lg font-bold mb-2 p-2">년</p>
                  <select 
                    className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
                    {...register('graduateYear', { 
                      required: '졸업 년도를 선택해주세요' })}
                  >
                    <option value="">-선택해주세요-</option>
                    {yearOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <p>{errors?.graduateYear?.message}</p>

              </div>

              <div>
                <div className="flex space-x-4">
                  <p className = "text-gray-700 text-xl sm:text-lg font-bold mb-2 p-2">월</p>
                  <select 
                    className="p-2 border-2 border-gray-300 rounded-lg w-full max-w-md"
                    {...register('graduateMonth', { 
                      required: '졸업한 월을 선택해주세요' })}
                  >
                    <option value="">-선택해주세요-</option>
                    <option key="1" value="2월">2월</option>
                    <option key="2" value="8월">8월</option>
                    <option key="3" value="기타">기타</option>
                  </select>
                </div>
                <p>{errors?.graduateMonth?.message}</p>
              </div>
            </div>
          </div>


        </div>)}



        <div className="mb-6 ml-4 mr-4 max-w-md">
          <label className="block text-gray-700 text-xl sm:text-lg font-bold mb-2">학부 재적/졸업 증빙 자료</label>
          <p className="text-md text-red-500 mt-1">
          ex) mportal &gt; 내 정보수정 &gt; 등록현황, 재학/휴학 증명서, 졸업 증명서, 졸업장 등
            증빙 자료 포함 필수 요소: 이름, 학번, 학부(학과), 현재 학적 상태(재학/휴학/졸업), 재학/휴학의 경우 수료 학기 차수, 졸업의 경우 졸업 시기
          </p>
          
          <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg p-4">
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span className="text-gray-600 mt-2">파일을 선택하세요</span>
              <input id="file-upload" type="file" className="hidden" {...register('file', { 
                required: '학부 재적/졸업 증빙 자료를 첨부해주세요' })} />
            </label>
          </div>

        </div>

        <div className="flex items-center ml-4">
          <input 
            type="checkbox" 
            className="mr-2" 
            {...register('agreeToTerms', { 
              required: '약관에 동의해주세요' })} 
          />
          <label className="block text-gray-700">약관 읽고 동의 하기!!!</label>
        </div>
        <p className = "flex items-center mb-6 ml-4 mr-4">{errors?.agreeToTerms?.message}</p>

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
