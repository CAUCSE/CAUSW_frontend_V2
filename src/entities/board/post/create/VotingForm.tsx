interface VotingFormProps {
  voteTitle: string;
  options: string[];
  isMultipleChoice: boolean;
  allowAnonymous: boolean;
  onVoteTitleChange: (title: string) => void;
  onAddOption: () => void;
  onChangeOption: (index: number, value: string) => void;
  onRemoveOption: (index: number) => void;
  onSelectMultiple: () => void;
  onAllowAnonymous: () => void;
}

export const VotingForm = ({ voteTitle, options, isMultipleChoice, allowAnonymous, onVoteTitleChange, onChangeOption, onAddOption, onRemoveOption, onSelectMultiple, onAllowAnonymous }: VotingFormProps) => {
  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center lg:space-x-4 w-full">
          <div className="mt-4 w-full">
            <input
              type="text"
              placeholder="투표 이름"
              value={voteTitle}
              onChange={(e)=>onVoteTitleChange(e.target.value)}
              className="w-full p-1 lg:p-2 border-b-post-title-input border-black bg-transparent text-[24px] placeholder:text-create-post-text focus:outline-none"
            />
          </div>
          <div className="flex items-center lg:space-x-4 mt-4">
            <label className="flex items-center justify-center space-x-3 w-[120px]" onClick={onSelectMultiple}>
              <span className={`w-5 h-5 rounded-full ${isMultipleChoice ? 'bg-red-500' :'bg-gray-400'}`}></span>
              <span className="text-gray-700">복수 선택</span>
            </label>
            <label className="flex items-center justify-center space-x-3 w-[120px]" onClick={onAllowAnonymous}>
              <span className={`w-5 h-5 rounded-full ${allowAnonymous ? 'bg-red-500' :'bg-gray-400'}`}></span>
              <span className="text-gray-700">익명 투표</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 pr-2 mb-4 max-h-80 overflow-y-scroll overflow-x-hidden">
        {options.map((option, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              placeholder="항목 입력"
              className="h-14 pl-3 border-2 border-gray-300 rounded w-full focus:outline-none focus:border-gray-600"
              value={option}
              onChange={(e) => onChangeOption(index, e.target.value)}
            />
            <button
              onClick={() => onRemoveOption(index)}
              className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5"
            >
              -
            </button>
          </div>
        ))}
      
        <div 
          className="flex h-14 justify-center border-2 border-gray-300 rounded" 
          onClick={onAddOption}
        >
          <button
            className="text-[16pt]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingForm;


/* 
 */