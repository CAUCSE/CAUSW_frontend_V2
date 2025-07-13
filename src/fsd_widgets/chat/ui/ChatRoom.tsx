'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import styled from '@emotion/styled';
import { Avatar, Typography } from '@mui/material';
import { ChevronLeft } from 'lucide-react';

import AddIcon from '../../../../public/icons/add-gray.svg';
import SendIcon from '../../../../public/icons/send.svg';

interface ChatMessage {
  id: string | number;
  sender: string;
  message: string;
  timestamp: string;
  isMine: boolean;
  user_idx?: number;
  sender_profile?: string | null;
}

interface OpponentUser {
  user_idx: number;
  user_id: string;
  name: string;
  user_image?: string;
}

export const ChatRoom = () => {
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const router = useRouter();
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [comment, setComment] = useState('');
  const [currentUserIdx, setCurrentUserIdx] = useState<number | null>(null);

  useEffect(() => {
    const dummyMessages: ChatMessage[] = [
      {
        id: 1,
        sender: '상대방',
        message: '안녕하세요!',
        timestamp: '18:10',
        isMine: false,
        sender_profile: '/images/puang_profile.svg',
      },
      {
        id: 2,
        sender: '나',
        message: '안녕하세요. 반갑습니다!',
        timestamp: '18:11',
        isMine: true,
      },
      {
        id: 3,
        sender: '상대방',
        message: '요즘 날씨 너무 덥죠? 🥵',
        timestamp: '18:13',
        isMine: false,
        sender_profile: '/images/puang_profile.svg',
      },
      {
        id: 4,
        sender: '나',
        message: '맞아요. 에어컨 없이는 못 살겠어요!',
        timestamp: '18:15',
        isMine: true,
      },
      {
        id: 5,
        sender: '상대방',
        message: '정말 덥더라고요. 이렇게 더울 수가..',
        timestamp: '18:18',
        isMine: false,
        sender_profile: '/images/puang_profile.svg',
      },
      {
        id: 6,
        sender: '나',
        message:
          '저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!저는 요즘 선풍기랑 에어컨 둘 다 켜놓고 있어요!',
        timestamp: '18:20',
        isMine: true,
      },
      // 날짜 변경
      {
        id: 7,
        sender: '상대방',
        message: '어제는 더 시원했는데 말이죠!',
        timestamp: '10:05',
        isMine: false,
        sender_profile: '/images/puang_profile.svg',
      },
    ];

    setChatData(dummyMessages);
  }, []);

  // 더미용이라 api연동 후 삭제 예정
  const getDateLabel = (index: number): string | null => {
    const today = index === 0 ? '2024.03.07' : index < 6 ? '2024.03.07' : '2024.03.08';
    const prev = index > 0 ? (index <= 6 ? '2024.03.07' : '2024.03.08') : null;

    return today !== prev ? today : null;
  };

  const handleSend = async () => {
    const trimmed = comment.trim();
    if (!trimmed) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: '나',
      message: trimmed,
      timestamp: '18:20',
      isMine: true,
    };

    setChatData((prev) => [...prev, newMessage]);
    setComment('');
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <>
      <div className="fixed top-[55px] left-0 z-20 flex h-13 w-full items-center justify-between rounded-tl-3xl rounded-tr-3xl border-b-1 border-gray-600 bg-[#F8F8F8] px-4">
        <button onClick={() => router.back()}>
          <ChevronLeft className="size-7 text-gray-700" />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] font-medium">
          게시글제목 or 김재학
        </div>
        <div className="w-6" />
      </div>
      <div className="mt-20 flex w-full flex-col gap-4 px-4 pb-24">
        {chatData.map((msg, index) => {
          const showAvatar = !msg.isMine && (index === 0 || chatData[index - 1].sender !== msg.sender);
          const dateLabel = getDateLabel(index);

          return (
            <div key={msg.id}>
              {dateLabel && (
                <div className="mx-auto my-1 w-[106px] rounded-3xl bg-[#848888] py-1 text-center text-sm font-normal text-[#f4f4f4]">
                  {dateLabel}
                </div>
              )}

              <div className={`flex w-full flex-row gap-3 ${msg.isMine ? 'justify-end' : 'justify-start'} `}>
                {!msg.isMine && (
                  <div style={{ width: '30px', height: '30px', marginBottom: '22px' }}>
                    {showAvatar ? (
                      <Avatar
                        src={msg.sender_profile ?? undefined}
                        sx={{ width: '30px', height: '30px', borderRadius: '50%' }}
                      />
                    ) : null}
                  </div>
                )}
                <div className={`flex w-full flex-col gap-2 ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                  {showAvatar && <div className="text-[15px] font-medium text-black">김재학</div>}
                  <div className={`flex w-full flex-row gap-1 ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                    {msg.isMine ? (
                      <>
                        <div className="mt-auto text-xs font-normal text-gray-400">{msg.timestamp}</div>
                        <div className="max-w-[70%] rounded-tl-[20px] rounded-b-[20px] border border-gray-400 px-3 py-2 text-sm font-normal whitespace-pre-line text-black">
                          {msg.message}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`max-w-[70%] rounded-tr-[20px] rounded-b-[20px] bg-gray-200 px-3 py-2 text-left text-sm font-normal whitespace-pre-line text-black ${showAvatar ? '' : 'ml-[20px]'}`}
                        >
                          {msg.message}
                        </div>
                        <div className="mt-auto text-xs font-normal text-gray-400">{msg.timestamp}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed right-0 bottom-16 left-0 z-10 bg-[#f8f8f8] px-6 py-5">
        <div className="items-cetter flex rounded-2xl bg-[#f4f4f4] p-3">
          <button className="mr-2">
            <AddIcon />
          </button>

          <input
            type="text"
            placeholder="채팅을 입력해주세요"
            className="flex-1 bg-transparent text-sm outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button className="ml-2 disabled:opacity-50" disabled={!comment.trim()} onClick={handleSend}>
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
};

const SendButton = styled.div<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: #0fbad1;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConnectionStatus = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5eb;
  z-index: 10;
  margin: 0 auto;
`;
