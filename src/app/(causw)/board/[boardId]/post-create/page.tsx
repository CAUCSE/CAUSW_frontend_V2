"use client";
import React, { useState } from 'react';

// eslint-disable-next-line @next/next/no-async-client-component
const CreatePostPage = (props: any) => {
  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button className="text-black">
            <svg width="24" height="24" fill="currentColor" className="text-gray-600">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            이전
          </button>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isQuestion}
                onChange={(e) => setIsQuestion(e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-gray-700">질문</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-red-500">익명</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="내용을 입력하세요!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 h-40 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button className="p-2 bg-gray-200 rounded-full">
              <svg width="24" height="24" fill="currentColor" className="text-gray-600">
                <path d="M12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9-9 4.037-9 9 4.037 9 9 9zm0 0l8-8-4.5-4.5L12 12l-3-3-5.5 5.5"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg width="24" height="24" fill="currentColor" className="text-gray-600">
                <path d="M19 19H5V5h14v14zM3 3v18h18V3H3zm8 14l-4-4h8l-4 4zm0-4l-4-4h8l-4 4z"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg width="24" height="24" fill="currentColor" className="text-gray-600">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none"
          >
            글작성
          </button>
        </div>
      </div>
    </div>
  );

}

export default CreatePostPage;