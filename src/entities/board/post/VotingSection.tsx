'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useVoteStore, VoteRscService } from '@/shared';

interface VotingSectionProps {
  onVote: (selectedOptions: string[]) => void;
}

const VotingSection: React.FC<VotingSectionProps> = ({
  onVote /* , isMultiple,  isAnonymous, showResult, isOwner */,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { vote, totalVote, voteOptions, votedMostOptions, endVote, restartVote } = useVoteStore();
  const router = useRouter();
  const path = usePathname();

  const isMultiple = vote.allowMultiple;
  const isAnonymous = vote.allowAnonymous;
  const showResult = vote.isEnd || vote.hasVoted;

  const handleChange = (option: string) => {
    if (isMultiple) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleEndRestartVote = async () => {
    if (vote.isEnd) {
      try {
        const endVoteResponse = await VoteRscService().restartVoteById(vote.voteId);
        restartVote();
        toggleMenu();
      } catch (error) {
        endVote();
      }
    } else {
      try {
        const endVoteResponse = await VoteRscService().endVoteById(vote.voteId);
        endVote();
        toggleMenu();
      } catch (error) {
        restartVote();
      }
    }
  };

  const handleViewResult = () => {
    router.push(`${path}/result`);
  };

  const handleVote = () => {
    if (selectedOptions.length > 0) {
      onVote(selectedOptions);
    } else {
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="mb-6 w-full">
      <div className="flex items-center justify-between">
        <span>
          <div className="w-[80px] text-center text-[14px]">{showResult ? `총 ${vote.totalUserCount}명` : ''}</div>
          <div className="w-[80px] text-center text-[14px]">
            {showResult && vote.allowAnonymous ? `총 ${totalVote}표` : ''}
          </div>
        </span>
        <div className="w-max-[300px] mx-2 w-full bg-vote-title px-4 py-3 text-center text-[14px] font-semibold text-red-500">
          {vote.title}
        </div>
        <span>
          <div className="w-[80px] text-center text-[14px] text-gray-500">{isAnonymous ? '익명' : ''}</div>
          <div className="w-[80px] text-center text-[14px] text-gray-500">{isMultiple ? '복수' : ''}</div>
        </span>
      </div>

      {showResult ? (
        <div className="relative mb-4 space-y-3 rounded-lg border-comment-bw border-black bg-white p-4">
          {isMenuOpen && (
            <div className="absolute right-8 top-0 z-10 w-32 rounded-lg border border-gray-300 bg-white shadow-lg">
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleViewResult}
              >
                {vote.isEnd ? '투표 결과 보기' : '투표 현황 보기'}
              </button>
              <hr className="border-gray-300" />
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleEndRestartVote}
              >
                {vote.isEnd ? '투표 재시작' : '투표 종료'}
              </button>
            </div>
          )}
          {vote.isOwner ? (
            <button className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center" onClick={toggleMenu}>
              <Image src="/images/post/comment-menu.svg" alt="Comment Menu" width={4} height={4}></Image>
            </button>
          ) : (
            ''
          )}
          {!vote.allowAnonymous && (
            <div className="absolute bottom-4 right-4">
              <button
                onClick={handleViewResult}
                className="border-b-comment-bw border-normal-board-role-text text-normal-board-role-text focus:outline-none"
              >
                투표 결과 확인하기
              </button>
            </div>
          )}

          {voteOptions!.map(option => {
            const percentage = (option.voteCount / totalVote) * 100;
            return (
              <div key={option.id} className="mx-1 flex flex-col pb-8 pt-1">
                <div className="flex items-center">
                  {votedMostOptions.includes(option.id) ? (
                    <Image
                      src="/images/post/vote-winner.svg"
                      alt="Vote Winner"
                      width={20}
                      height={20}
                      className="my-2 ml-0 mr-4"
                    ></Image>
                  ) : (
                    <div className="my-2 ml-0 mr-4 h-[20px] w-[20px]"></div>
                  )}
                  <span className="flex-1 text-[16px]">{option.optionName}</span>
                  <span className="text-[14px]">{option.voteCount}명</span>
                </div>
                <span className="flex-1">
                  <div className="relative h-2 w-full rounded bg-gray-300">
                    <div
                      className="absolute left-0 top-0 h-full rounded bg-vote-theme"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative mb-4 rounded-lg border-comment-bw border-black bg-white p-3 pt-6">
          {isMenuOpen && (
            <div className="absolute right-8 top-0 z-10 w-32 rounded-lg border border-gray-300 bg-white shadow-lg">
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleViewResult}
              >
                {vote.isEnd ? '투표 결과 보기' : '투표 현황 보기'}
              </button>
              <hr className="border-gray-300" />
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleEndRestartVote}
              >
                {vote.isEnd ? '투표 재시작' : '투표 종료'}
              </button>
            </div>
          )}
          {vote.isOwner ? (
            <button className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center" onClick={toggleMenu}>
              <Image src="/images/post/comment-menu.svg" alt="Comment Menu" width={4} height={4}></Image>
            </button>
          ) : (
            ''
          )}
          {voteOptions.map(option => (
            <label key={option.id} className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="vote"
                value={option.optionName}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleChange(option.id)}
                className="hidden"
              />
              <span
                className={`mr-3 inline-block h-[20px] w-[20px] rounded-full border-comment-bw border-black transition-all duration-200 ${
                  selectedOptions.includes(option.id) ? 'bg-vote-theme shadow-vote-option' : ''
                }`}
              />
              <span className="text-[16px]">{option.optionName}</span>
            </label>
          ))}
          <button onClick={handleVote} className="mt-4 w-full rounded-lg bg-vote-theme py-3 text-[16px] text-white">
            투표하기
          </button>
        </div>
      )}
    </div>
  );
};

export default VotingSection;
