"use client";
import { PreviousButton, PostRscService, useCreatePostStore, useCreateVoteStore } from '@/shared';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PostForm, VotingForm, CreatePostFooter } from '@/entities';

// eslint-disable-next-line @next/next/no-async-client-component
const CreatePostPage = (props: any) => {
  console.log(props.params.boardId);
  //추후에 boardId =  params로 변경
  const boardId = props.params.boardId;
  const { createPost } = PostRscService();
  const {
    title,
    content,
    //createPost,
    isAnonymous,
    isQuestion,
    setContent,
    setTitle,
    toggleAnonymous,
    toggleQuestion,
  } = useCreatePostStore();
  const {
    isVote,
    voteTitle,
    options,
    isMultipleChoice,
    allowAnonymous,
    toggleVote,
    setVoteTitle,
    setOption,
    addOption,
    removeOption,
    toggleMultipleChoice,
    toggleAllowAnonymous,
    submitVote,
  } = useCreateVoteStore();
  const router = useRouter();

  /* const [isQuestion, setIsQuestion] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [voteTitle, setVoteTitle] = useState('');
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [allowAnonymous, setAllowAnonymousVote] = useState(false);
  const [options, setOptions] = useState(['', '']);

  // vote 관련 handle 함수들
  const handleVoteButton = () => {
    setIsVote(!isVote);
    console.log(isVote);
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
  
  // 기본 post 관련 handle 함수
  const handleQuestionCheckbox = () => {
    setIsQuestion(!isQuestion);
  }
  const handleAnonymousCheckbox = () => {
    setIsAnonymous(!isAnonymous);
  }

  // 일반 게시글 post api
  const handleSubmitPost = async () => {
    const postRequest: Post.CreatePostDto = {
      title,
      content,
      boardId: boardId,
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
  }; */

  const handleSubmit = async () => {
    if (isVote) {
      submitVote();
    }else {
      const postRequest: Post.CreatePostDto = {
        title,
        content,
        boardId: boardId,
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
    }
  };

  return (
    <div className="relative h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton />
      </div>
      {/* 게시글 공통 부분 - 제목 / 내용 */}
      <div className="h-full flex flex-col p-10 pt-10">
        <PostForm 
          title={title} 
          content={content} 
          isQuestion={isQuestion} 
          isAnonymous={isAnonymous} 
          isVote={isVote} 
          onTitleChange={setTitle} 
          onContentChange={setContent} 
          onQuestionToggle={toggleQuestion} 
          onAnonymousToggle={toggleAnonymous}
        />
        {/* 투표 파트 */}
        {isVote 
        ? <VotingForm 
            voteTitle={voteTitle} 
            options={options} 
            isMultipleChoice={isMultipleChoice} 
            allowAnonymous={allowAnonymous} 
            onVoteTitleChange={setVoteTitle} 
            onAddOption={addOption} 
            onChangeOption={setOption} 
            onRemoveOption={removeOption} 
            onSelectMultiple={toggleMultipleChoice} 
            onAllowAnonymous={toggleAllowAnonymous}/>
        : ''
        }
      </div>
      <CreatePostFooter 
        isVote={isVote} 
        handleSubmit={handleSubmit} 
        handleVoteToggle={toggleVote}/>
    </div>
  );

}

export default CreatePostPage;