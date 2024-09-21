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

export const PostForm = ({ title, content, isQuestion, isAnonymous, isVote, onTitleChange, onContentChange, onQuestionToggle, onAnonymousToggle }: PostFormProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4 w-full">
          <div className="mt-4 w-full">
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full pb-2 mb-2 p-2 border-b-post-title-input border-black bg-transparent text-[24px] placeholder:text-create-post-text focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 w-[85px] mt-4">
            <span onClick={onQuestionToggle}>
              {isQuestion ? 
                <Image
                  src="/images/post/checked-checkbox.svg"
                  alt="Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image> :
                <Image
                  src="/images/post/non-checked-checkbox.svg"
                  alt="Non Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              }
            </span>
            <span className={`text-[16px] ${isQuestion ? 'text-checked-text' : 'text-non-checked-text'}`}>질문</span>
          </div>
          <div className="flex items-center space-x-2 w-[85px] mt-4">
            <span onClick={onAnonymousToggle}>
              {isAnonymous ? 
                <Image
                  src="/images/post/checked-checkbox.svg"
                  alt="Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image> :
                <Image
                  src="/images/post/non-checked-checkbox.svg"
                  alt="Non Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              }
            </span>
            <span className={`text-[16px] ${isAnonymous ? 'text-checked-text' : 'text-non-checked-text'}`}>익명</span>
          </div>
        </div>
      </div>
      <div className={`relative ${isVote ? 'h-60' : 'h-full'}`}>
        {content === "" && (
          <div className="absolute inset-0 p-2 pointer-events-none">
            <span className="bg-transparent text-[24px] text-create-post-text ">내용을 입력하세요!</span>
            <br/>
            <span className="bg-transparent text-[20px] text-create-post-text ">{"(게시글과 댓글은 작성 후에는 수정할 수 없습니다.)"} </span>
          </div>
        )}
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full p-2 bg-transparent text-[24px] placeholder:text-create-post-text focus:outline-none resize-none"
        />
      </div>
    </>
  );
};

export default PostForm;
