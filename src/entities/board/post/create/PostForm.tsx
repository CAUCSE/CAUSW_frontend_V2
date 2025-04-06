import Image from 'next/image';

interface PostFormProps {
  title: string;
  content: string;
  isQuestion: boolean;
  isAnonymous: boolean;
  isVote: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onQuestionToggle: () => void;
  onAnonymousToggle: () => void;
}

export const PostForm = ({
  title,
  content,
  isQuestion,
  isAnonymous,
  isVote,
  onTitleChange,
  onContentChange,
  onQuestionToggle,
  onAnonymousToggle,
}: PostFormProps) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex w-full items-center space-x-2 lg:space-x-4">
          <div className="mt-4 w-full">
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={e => onTitleChange(e.target.value)}
              className="mb-2 w-full border-b-post-title-input border-black bg-transparent pb-2 text-[24px] placeholder:text-create-post-text focus:outline-none lg:p-2"
            />
          </div>
          <div className="mt-4 flex w-[85px] items-center space-x-2">
            <span onClick={onQuestionToggle}>
              {isQuestion ? (
                <Image
                  src="/images/post/checked-checkbox.svg"
                  alt="Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              ) : (
                <Image
                  src="/images/post/non-checked-checkbox.svg"
                  alt="Non Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              )}
            </span>
            <span className={`text-[16px] ${isQuestion ? 'text-checked-text' : 'text-non-checked-text'} text-nowrap`}>
              질문
            </span>
          </div>
          <div className="mt-4 flex w-[85px] items-center space-x-2">
            <span onClick={onAnonymousToggle}>
              {isAnonymous ? (
                <Image
                  src="/images/post/checked-checkbox.svg"
                  alt="Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              ) : (
                <Image
                  src="/images/post/non-checked-checkbox.svg"
                  alt="Non Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              )}
            </span>
            <span className={`text-[16px] ${isAnonymous ? 'text-checked-text' : 'text-non-checked-text'} text-nowrap`}>
              익명
            </span>
          </div>
        </div>
      </div>
      <div className={`relative ${isVote ? 'h-60' : 'h-full'}`}>
        {content === '' && (
          <div className="pointer-events-none absolute inset-0 lg:p-2">
            <span className="bg-transparent text-[20px] text-create-post-text lg:text-[24px]">내용을 입력하세요!</span>
            <br />
            <span className="bg-transparent text-[16px] text-create-post-text lg:text-[20px]">
              {'(게시글과 댓글은 작성 후에는 수정할 수 없습니다.)'}{' '}
            </span>
          </div>
        )}
        <textarea
          value={content}
          onChange={e => onContentChange(e.target.value)}
          className="h-full w-full resize-none bg-transparent p-2 text-[24px] placeholder:text-create-post-text focus:outline-none"
        />
      </div>
    </>
  );
};

export default PostForm;
