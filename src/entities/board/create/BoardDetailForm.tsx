import { useBoardStore } from '@/shared';

export const BoardDetailForm = () => {
  const { boardName, isNameValid, boardDescription, setBoardName, setIsNameValid, setBoardDescription } =
    useBoardStore();

  return (
    <>
      <div className="mb-2 pt-2 text-2xl xl:mb-6 xl:text-3xl">게시판 생성</div>
      <div className="mb-2 xl:mb-6">
        <div className="mb-2 text-xl xl:text-2xl">게시판 이름</div>
        <input
          type="text"
          className="text-md w-full border-b-post-title-input border-black bg-transparent text-black focus:outline-none xl:text-lg"
          value={boardName}
          onChange={e => {
            setBoardName(e.target.value);
            setIsNameValid(true);
          }}
          placeholder="게시판 이름을 입력해주세요."
        />
        {!isNameValid && (
          <div className="absolute right-0 mt-1 pr-4 text-sm text-red-500">게시판 이름은 필수입니다.</div>
        )}
      </div>

      <div className="mb-6">
        <div className="py-2 text-xl xl:text-2xl">게시판 설명</div>
        <textarea
          className="text-md w-full border-b-post-title-input border-black bg-transparent text-black focus:outline-none xl:text-lg"
          value={boardDescription}
          onChange={e => setBoardDescription(e.target.value)}
          placeholder="게시판 설명을 입력해주세요."
        />
      </div>
    </>
  );
};
