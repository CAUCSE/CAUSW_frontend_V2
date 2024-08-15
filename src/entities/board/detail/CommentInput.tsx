import Image from "next/image";

export const CommentInput = () => {
  return (
    <div className="fixed flex items-center justify-center bottom-[100px] w-full px-3 md:bottom-0 md:left-40 md:right-72 md:w-auto">
      <div className="flex flex-grow items-center justify-between p-2 bg-comment-input rounded-comment-input-br">
        <div className="flex items-center space-x-2 pr-3">
          <input type="checkbox" className="form-checkbox h-5 w-5 border-gray-300 border-2" />
          <div className="text-gray-400 text-sm">
            익명
          </div>
        </div>
        <input
          type="text"
          placeholder="댓글을 입력해주새요!"
          className="flex flex-grow bg-comment-input border-none outline-none text-sm "
        />
        
        <button className="flex items-end">
          <Image src="/images/post/comment-input.svg"
            alt="Comment Input"
            width={20}
            height={20}></Image>
        </button>
      </div>
    </div>
  );
};
