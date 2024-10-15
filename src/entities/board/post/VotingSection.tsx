"use client"
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import { useVoteStore, VoteRscService } from '@/shared';

interface VotingSectionProps {
  onVote: (selectedOptions: string[]) => void;
}

const VotingSection: React.FC<VotingSectionProps> = ({ onVote/* , isMultiple,  isAnonymous, showResult, isOwner */ }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { vote, totalVote, voteOptions,votedMostOptions, endVote, restartVote} = useVoteStore();
  const router = useRouter();
  const path = usePathname();

  const isMultiple = vote.allowMultiple;
  const isAnonymous = vote.allowAnonymous;
  const showResult = (vote.isEnd || vote.hasVoted);

  const handleChange = (option: string) => {
    if (isMultiple) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleEndRestartVote = async () => {
    if (vote.isEnd){
      try {
        const endVoteResponse = await VoteRscService().restartVoteById(vote.voteId);
        restartVote();
        toggleMenu();
        console.log("투표 재시작 완료: ", endVoteResponse);
      }catch(error){
        endVote();
        console.error("투표 재시작 처리 에러: ", error);
      }
    }else{
      try {
        const endVoteResponse = await VoteRscService().endVoteById(vote.voteId);
        endVote();
        toggleMenu();
        console.log("투표 종료 완료: ", endVoteResponse);
      }catch(error){
        restartVote();
        console.error("투표 종료 처리 에러: ", error);
      }
    }
    
  }

  const handleViewResult = () => {
    router.push(`${path}/result`);
  };

  const handleVote = () => {
    if (selectedOptions.length > 0) {
      onVote(selectedOptions);
    } else {
      console.log('선택안함');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="mb-6 w-full">
      <div className="flex justify-between items-center">
        <span>
          <div className="w-[80px] text-[14px] text-center">{showResult ? `총 ${vote.totalUserCount}명` : ''}</div>
          <div className="w-[80px] text-[14px] text-center">{(showResult && vote.allowAnonymous) ? `총 ${totalVote}표` : ''}</div>
        </span>
        <div className="text-red-500 w-max-[300px] w-full bg-vote-title px-4 py-3 text-[14px] font-semibold text-center mx-2">{vote.title}</div>
        <span>
          <div className="text-gray-500 w-[80px] text-[14px] text-center">{isAnonymous ? '익명':''}</div>
          <div className="text-gray-500 w-[80px] text-[14px] text-center">{isMultiple ? '복수':''}</div>
        </span>
      </div>
      
      {showResult
      ?<div className="relative mb-4 bg-white border-comment-bw border-black p-4 rounded-lg space-y-3">
        {isMenuOpen && 
          <div className="absolute top-0 right-8 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleViewResult}>
              {vote.isEnd ? "투표 결과 보기": "투표 현황 보기"}
            </button>
            <hr className="border-gray-300" />
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEndRestartVote}>
              {vote.isEnd ? "투표 재시작": "투표 종료"}
            </button>
          </div>
        }
        {vote.isOwner ? <button className="absolute top-0 right-0 flex items-center justify-center w-10 h-10" onClick={toggleMenu}>
          <Image
            src="/images/post/comment-menu.svg"
            alt="Comment Menu"
            width={4}
            height={4}
          ></Image>
        </button>: ''}
        {!vote.allowAnonymous && <div className="absolute bottom-4 right-4">
          <button
            onClick={handleViewResult}
            className="text-normal-board-role-text border-b-comment-bw border-normal-board-role-text focus:outline-none"
          >
            투표 결과 확인하기
          </button>
        </div>}
        
        {voteOptions!.map((option) => {
          const percentage = (option.voteCount / totalVote) * 100;
          return (
            <div key={option.id} className="flex flex-col pt-1 mx-1 pb-8">
              <div className="flex items-center">
                {votedMostOptions.includes(option.id) ? <Image
                  src="/images/post/vote-winner.svg"
                  alt="Vote Winner"
                  width={20}
                  height={20}
                  className="my-2 ml-0 mr-4"
                ></Image>:<div className="my-2 ml-0 mr-4 w-[20px] h-[20px]"></div>}
                <span className="text-[16px] flex-1">{option.optionName}</span>
                <span className="text-[14px]">{option.voteCount}명</span>
              </div>
              <span className="flex-1">
                <div className="relative w-full h-2 bg-gray-300 rounded">
                  <div
                    className="absolute top-0 left-0 h-full bg-vote-theme rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </span>
            </div>
          );
        })}
      </div>
      :<div className="relative mb-4 bg-white border-comment-bw border-black pt-6 p-3 rounded-lg">
        {isMenuOpen && 
          <div className="absolute top-0 right-8 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleViewResult}>
              {vote.isEnd ? "투표 결과 보기": "투표 현황 보기"}
            </button>
            <hr className="border-gray-300" />
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleEndRestartVote}>
              {vote.isEnd ? "투표 재시작": "투표 종료"}
            </button>
          </div>
        }
        {vote.isOwner ? <button className="absolute top-0 right-0 flex items-center justify-center w-10 h-10" onClick={toggleMenu}>
          <Image
            src="/images/post/comment-menu.svg"
            alt="Comment Menu"
            width={4}
            height={4}
          ></Image>
        </button>: ''}
        {voteOptions.map((option) => (
          <label key={option.id} className="flex items-center mb-4">
            <input
              type="checkbox"
              name="vote"
              value={option.optionName}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleChange(option.id)}
              className="hidden"
            />
            <span
              className={`inline-block w-[20px] h-[20px] mr-3 rounded-full transition-all duration-200 border-black border-comment-bw ${
                selectedOptions.includes(option.id)
                  ?  'bg-vote-theme shadow-vote-option'
                  : ''
              }`}
            />
            <span className='text-[16px]'>{option.optionName}</span>
          </label>
        ))}
        <button
          onClick={handleVote}
          className="mt-4 bg-vote-theme w-full text-white text-[16px] py-3 rounded-lg"
        >
          투표하기
        </button>
      </div>
      }
    </div>
  );
};

export default VotingSection;
