declare namespace Chat {
  interface ChatItem {
    id: string;
    title: string;
    profileImage: string;
    preview: string;
    unreadCount: number;
    time: string;
  }
  interface ChatItemProps {
    chatData: ChatItem;
  }
  interface ChatMessage {
    id: string | number;
    sender: string;
    message: string;
    timestamp: string;
    isMine: boolean;
    user_idx?: number;
    sender_profile?: string | null;
  }
  interface MessageItemProps {
    msg: ChatMessage;
    showAvatar: boolean;
  }
}
