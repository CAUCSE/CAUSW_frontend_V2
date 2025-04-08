export const StatusButton: React.FC<User.StatusButtonProps> = ({ status, messages, onClick }) => {
  const isButton = ['REJECTED', 'UNDONE'].includes(status); // 제출 안한 상태 or 거절된 상태에서는 다시 제출 가능능
  const backgroundColor = isButton ? 'bg-focus hover:bg-blue-400' : 'bg-gray-300 hover:bg-gray-400';

  const content = messages[status];

  return isButton ? (
    <button onClick={onClick} className={`mt-4 w-full rounded-lg py-3 text-white transition ${backgroundColor}`}>
      {content}
    </button>
  ) : (
    <div className={`mt-4 w-full rounded-lg py-3 text-white transition ${backgroundColor}`}>{content}</div>
  );
};
