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
}
