'use client';

import { Avatar } from '@mui/material';

export const MessageItem = ({ msg, showAvatar }: Chat.MessageItemProps) => (
  <div className={`flex w-full gap-3 ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
    {!msg.isMine && showAvatar && (
      <Avatar src={msg.sender_profile ?? undefined} sx={{ width: 30, height: 30, marginBottom: '22px' }} />
    )}
    <div className={`flex flex-col gap-1 ${msg.isMine ? 'items-end' : 'items-start'}`}>
      {showAvatar && !msg.isMine && <div className="text-sm font-medium text-black">김재학</div>}
      <div className="flex items-end gap-1">
        {!msg.isMine && <span className="text-xs text-gray-400">{msg.timestamp}</span>}
        <div
          className={`max-w-[70%] px-3 py-2 text-sm whitespace-pre-line ${
            msg.isMine
              ? 'rounded-tl-[20px] rounded-b-[20px] border border-gray-400 text-[#333]'
              : 'rounded-tr-[20px] rounded-b-[20px] bg-gray-200 text-[#333]'
          }`}
        >
          {msg.message}
        </div>
        {msg.isMine && <span className="text-xs text-gray-400">{msg.timestamp}</span>}
      </div>
    </div>
  </div>
);
