import { useBoardStore } from '@/shared';

export const BoardDetailForm = () => {
  const { boardName, isNameValid, boardDescription, setBoardName, setIsNameValid,setBoardDescription } = useBoardStore();

  return (
    <>
      <div className="text-[35px] mb-2 lg:mt-2 lg:mb-6">게시판 생성</div>
      <div className="relative mb-2 lg:mb-6">
        <div className="text-[28px] mb-2">게시판 이름</div>
        <input
          type="text"
          className="w-full border-b-post-title-input border-black bg-transparent text-[20px] text-black focus:outline-none"
          value={boardName}
          onChange={(e) => {
            setBoardName(e.target.value);
            setIsNameValid(true);
          }}
        />
        {!isNameValid && (
          <div className="absolute text-red-500 mt-1 right-0">게시판 이름은 필수입니다.</div>
        )}
      </div>

      <div className="mb-6">
        <div className="text-[28px] mb-2">게시판 설명</div>
        <textarea
          className="w-full border-b-post-title-input border-black bg-transparent text-[20px] text-black focus:outline-none"
          value={boardDescription}
          onChange={(e) => setBoardDescription(e.target.value)}
        />
      </div>
    </>
  );
  
};