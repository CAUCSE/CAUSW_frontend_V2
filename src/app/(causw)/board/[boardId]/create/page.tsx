"use client";
import { PreviousButton, PostRscService } from '@/shared';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage-instance';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";

// eslint-disable-next-line @next/next/no-async-client-component
const CreatePostPage = (props: any) => {
  console.log(props.params.boardId);
  //추후에 boardId =  params로 변경
  const defaultBoardId = "2c9faf078e17552c018e179d31bf0001";
  const { createPost } = PostRscService();
  const router = useRouter();
  const defaultPostAttachment: Post.AttachmentDto = {
    downloadFilePath: "",
    originalFileName: "",
  };

  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [allowAnonymous, setAllowAnonymousVote] = useState(false);
  const [options, setOptions] = useState(['', '']);

  const handleVoteButton = () => {
    setIsVote(!isVote);
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmitVote = () => {
    const filteredOptions = options.filter((_, i) => options[i] != '');
    console.log('투표 항목들:', filteredOptions);
  };

  const handelSelectMultiple = () => {
    setIsMultipleChoice(!isMultipleChoice)
  };

  const handleAllowAnonymous = () => {
    setAllowAnonymousVote(!allowAnonymous);
  };
  
  const handleQuestionCheckbox = () => {
    setIsQuestion(!isQuestion);
  }
  const handleAnonymousCheckbox = () => {
    setIsAnonymous(!isAnonymous);
  }

  const handleSubmitPost = async () => {
    const postRequest: Post.CreatePostDto = {
      title,
      content,
      boardId: defaultBoardId,
      attachmentList: [
        "http://example.com/file1.jpg",
        "http://example.com/file2.jpg"
      ],
      isAnonymous,
      isQuestion,
    };
    try {
      const createPostResponse = await createPost(postRequest);
      console.log('게시물 생성 완료: ', createPostResponse);
      router.back()
    }catch(error) {
      console.error('게시물 생성 에러: ', error);
    }  
  };

  return (
    <div className="relative h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      {isVote ?
      <div className="h-full flex flex-col p-10 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 w-full">
            <div className="mt-4 w-full">
              <input
                type="text"
                placeholder="투표 이름"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border-b-post-title-input border-black bg-transparent text-[24px] placeholder:text-create-post-text focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <label className="flex items-center justify-center space-x-3 w-[120px]" onClick={handelSelectMultiple}>
                <span className={`w-5 h-5 rounded-full ${isMultipleChoice ? 'bg-red-500' :'bg-gray-400'}`}></span>
                <span className="text-gray-700">복수 선택</span>
              </label>
              <label className="flex items-center justify-center space-x-3 w-[120px]" onClick={handleAllowAnonymous}>
                <span className={`w-5 h-5 rounded-full ${allowAnonymous ? 'bg-red-500' :'bg-gray-400'}`}></span>
                <span className="text-gray-700">익명 투표</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {options.map((option, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                placeholder="항목 입력"
                className="p-2 border-2 border-gray-300 rounded w-full focus:outline-none focus:border-gray-600"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5"
              >
                -
              </button>
            </div>
          ))}
        
          <div 
            className="flex justify-center p-2 border-2 border-gray-300 rounded" 
            onClick={handleAddOption}
          >
            <button
              onClick={handleAddOption}
            >
              +
            </button>
          </div>
        </div>
      </div>
      :
      <div className="h-full flex flex-col p-10 pt-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4 w-full">
            <div className="mt-4 w-full">
              <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border-b-post-title-input border-black bg-transparent text-[24px] placeholder:text-create-post-text focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 w-[85px] mt-4">
              <span onClick={handleQuestionCheckbox}>
                {isQuestion ? 
                  <Image
                    src="/images/post/checked-checkbox.svg"
                    alt="Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image> :
                  <Image
                    src="/images/post/non-checked-checkbox.svg"
                    alt="Non Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image>
                }
              </span>
              <span className={`text-[16px] ${isQuestion ? 'text-checked-text' : 'text-non-checked-text'}`}>질문</span>
            </div>
            <div className="flex items-center space-x-2 w-[85px] mt-4">
              <span onClick={handleAnonymousCheckbox}>
                {isAnonymous ? 
                  <Image
                    src="/images/post/checked-checkbox.svg"
                    alt="Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image> :
                  <Image
                    src="/images/post/non-checked-checkbox.svg"
                    alt="Non Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image>
                }
              </span>
              <span className={`text-[16px] ${isAnonymous ? 'text-checked-text' : 'text-non-checked-text'}`}>익명</span>
            </div>
          </div>
        </div>
        <div className="h-full mb-10">
          <textarea
            placeholder="내용을 입력하세요!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-2 h-40 bg-transparent text-[24px] placeholder:text-create-post-text focus:outline-none resize-none"
          />
        </div>
      </div>
      }

      <div className="absolute bottom-0 left-4 flex space-x-20">
        <div className="flex space-x-4">
          <button className={`flex justify-center p-2 bg-comment-input rounded-full w-[80px]`}>
            <Image
              src="/images/post/camera.svg"
              alt="Upload Picture Icon"
              width={25}
              height={25}
            ></Image>
          </button>
          <button 
            className={`flex justify-center p-2 ${isVote ? 'bg-vote-btn' : 'bg-comment-input'} rounded-full w-[80px]`}
            onClick={handleVoteButton}
          >
            <Image
              src="/images/post/vote.svg"
              alt="Vote Icon"
              width={25}
              height={25}
            ></Image>
          </button>
          <button className={`flex justify-center p-2 bg-comment-input rounded-full w-[80px]`}>
            <Image
              src="/images/post/application.svg"
              alt="Application Icon"
              width={25}
              height={25}
            ></Image>
          </button>
        </div>
        <button
          onClick= {isVote ? handleSubmitVote : handleSubmitPost}
          className="bg-confirm-btn text-white py-2 px-8 rounded-full shadow-md text-[16px] hover:bg-orange-600 focus:outline-none"
        >
          글작성
        </button>
      </div>
    </div>
  );

}

export default CreatePostPage;