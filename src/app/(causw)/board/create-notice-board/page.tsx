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
        

        <div className="absolute bottom-2 flex space-x-20">
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