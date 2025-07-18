'use client';

import Image from 'next/image';

export const MessageItem = ({ msg, showAvatar }: Chat.MessageItemProps) => (
  <div className={`flex w-full flex-row gap-3 ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
    {!msg.isMine && (
      <div style={{ width: '30px', height: '30px', marginBottom: '22px' }}>
        {showAvatar && (
          <div className="h-[30px] w-[30px] overflow-hidden rounded-full">
            <Image
              src={msg.sender_profile ?? ''}
              alt="sender profile"
              width={30}
              height={30}
              className="object-cover"
            />
          </div>
        )}
      </div>
    )}

    <div className={`flex w-full flex-col gap-2 ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
      {showAvatar && !msg.isMine && <div className="text-[15px] font-medium text-black">김재학</div>}

      <div className={`flex w-full flex-row gap-1 ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
        {msg.isMine ? (
          <>
            <div className="mt-auto text-xs font-normal text-gray-400">{msg.timestamp}</div>
            <div className="max-w-[70%] rounded-tl-[20px] rounded-b-[20px] border border-gray-400 px-3 py-2 text-sm font-normal whitespace-pre-line text-[#333333]">
              {msg.message}
            </div>
          </>
        ) : (
          <>
            <div
              className={`max-w-[70%] rounded-tr-[20px] rounded-b-[20px] bg-gray-200 px-3 py-2 text-left text-sm font-normal whitespace-pre-line text-[#333333] ${
                showAvatar ? '' : 'ml-[20px]'
              }`}
            >
              {msg.message}
            </div>
            <div className="mt-auto text-xs font-normal text-gray-400">{msg.timestamp}</div>
          </>
        )}
      </div>
    </div>
  </div>
);
