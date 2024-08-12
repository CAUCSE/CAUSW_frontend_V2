export const CommentInput = () => {
  return (
    <div className="fixed bottom-0 flex items-center max-w-xl w-full bg-comment-input p-2 rounded-comment-input-br">
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="form-checkbox h-5 w-5 border-gray-300 border-2" />
        <div className="text-gray-400 text-sm">
          익명
        </div>
      </div>
      <input
        type="text"
        placeholder="댓글을 입력해주새요!"
        className="flex-grow bg-comment-input border-none outline-none px-3 text-sm"
      />
      <button className="flex items-center">
        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </button>
    </div>
  );
};
