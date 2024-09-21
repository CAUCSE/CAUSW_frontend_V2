"use client";
import { PreviousButton, PostRscService, useCreatePostStore, useCreateVoteStore, useFileUpload } from '@/shared';
import React from 'react';
import { useRouter } from "next/navigation";
import { PostForm, VotingForm, CreatePostFooter, FilePreview } from '@/entities';

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
    clearPost,
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
  const { selectedFiles,resetFiles } = useFileUpload();
  const router = useRouter();

  const handleSubmit = async () => {
    if (isVote) {
      submitVote();
    }else {
      const postRequest: Post.CreatePostDto = {
        title,
        content,
        boardId,
        isAnonymous,
        isQuestion,
      };
      try {
        const createPostResponse = await createPost(postRequest,selectedFiles);
        console.log('게시물 생성 완료: ', createPostResponse);
        clearPost();
        resetFiles();
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
        {(selectedFiles.length === 0)
        ? ''
        : <FilePreview/>
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