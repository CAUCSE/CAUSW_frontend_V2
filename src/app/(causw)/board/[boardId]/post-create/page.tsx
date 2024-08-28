"use client";
import { PreviousButton } from '@/shared/ui/previousButton';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage-instance';
import React, { useState } from 'react';
import Image from "next/image";

// eslint-disable-next-line @next/next/no-async-client-component
const CreatePostPage = (props: any) => {
  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleVoteButton = () => {
    setIsVote(!isVote);
  }
  const handleQuestionCheckbox = () => {
    setIsQuestion(!isQuestion);
  }
  const handleAnonymousCheckbox = () => {
    setIsAnonymous(!isAnonymous);
  }

  console.log(props.params.boardId);

  const handleSubmit = () => {
    console.log({
      title,
      content,
      isQuestion,
      isAnonymous,
    });
  };

  return (
    <div className="relative h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
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

        <div className="absolute bottom-2 flex space-x-20">
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
            onClick={handleSubmit}
            className="bg-confirm-btn text-white py-2 px-8 rounded-full shadow-md text-[16px] hover:bg-orange-600 focus:outline-none"
          >
            글작성
          </button>
        </div>
      </div>
    </div>
  );

}

export default CreatePostPage;