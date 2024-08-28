"use client";
import { PreviousButton } from '@/shared/ui/previousButton';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage-instance';
import React, { useState } from 'react';
import Image from "next/image";

// eslint-disable-next-line @next/next/no-async-client-component
const CreatePostVotePage = (props: any) => {
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [options, setOptions] = useState(['', '']);
  const [isVote, setIsVote] = useState(false);
  const [title, setTitle] = useState('');

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

  const handleSubmit = () => {
    const filteredOptions = options.filter((_, i) => options[i] != '');
    console.log('투표 항목들:', filteredOptions);
  };

  const handelSelectMultiple = () => {
    setIsMultipleChoice(!isMultipleChoice)
  };

  const handleSetAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <div className="relative h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
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
                <span className={`w-5 h-5 rounded-full ${isMultipleChoice ? 'bg-red-500' :'bg-gray-400'} inline-block`}></span>
                <span className="text-gray-700">복수 선택</span>
              </label>
              <label className="flex items-center justify-center space-x-3 w-[120px]" onClick={handleSetAnonymous}>
                <span className={`w-5 h-5 rounded-full ${isAnonymous ? 'bg-red-500' :'bg-gray-400'} inline-block`}></span>
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

export default CreatePostVotePage;