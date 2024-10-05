"use client"
import Image from "next/image";
import { useState } from "react";

interface CommentInputProps {
  handleAddComment: (content: string, isAnonymous: boolean) => void;
}

export const CommentInput = ({handleAddComment}:CommentInputProps) => {
  const [commentContent, setCommentContent] = useState(""); 
  const [isAnonymous, setIsAnonymous] = useState(false); 

const handleSubmit = () => {
  if (commentContent.trim() === "") return;

  console.log("Content:", commentContent);
  console.log("Anonymous:", isAnonymous);
  const comment = commentContent;
  setCommentContent("");
  handleAddComment(comment, isAnonymous);
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 기본 Enter 동작 방지
    handleSubmit();
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCommentContent(e.target.value);
};

  return (
    <div className="fixed flex items-center justify-center bottom-[100px] w-full px-3 lg:bottom-2 lg:left-40 lg:right-72 lg:mr-4 lg:w-auto">
      <div className="flex flex-grow items-center justify-between p-4 bg-comment-input rounded-comment-input-br">
        <div className="flex items-center space-x-2 pr-3">
          <input type="checkbox" className="form-checkbox h-6 w-6 border-gray-300 border-2" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
          <div className="text-gray-400 text-[16px]">
            익명
          </div>
        </div>
        <input
          type="text"
          placeholder="댓글을 입력해주새요!"
          className="flex flex-grow bg-comment-input border-none outline-none text-black text-[16px] "
          value={commentContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        
        <button className="flex items-end" onClick={handleSubmit}>
          <Image src="/images/post/comment-input.svg"
            alt="Comment Input"
            width={20}
            height={20}></Image>
        </button>
      </div>
    </div>
  );
};
