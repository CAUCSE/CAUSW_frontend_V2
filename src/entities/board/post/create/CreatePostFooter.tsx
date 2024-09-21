import Image from 'next/image';

interface CreatePostFooterProps {
  isVote: boolean;
  handleSubmit: () => void;
  handleVoteToggle: () => void;
}

export const CreatePostFooter = ({ isVote, handleSubmit, handleVoteToggle }: CreatePostFooterProps) => {
  return (
    <div className="absolute left-10 bottom-2 flex space-x-24">
        <div className="flex space-x-4">
          <button className={`flex justify-center p-2 bg-comment-input rounded-full w-[80px]`}>
            <Image
              src="/images/post/camera.svg"
              alt="Upload Picture Icon"
              width={25}
              height={25}
            ></Image>
          </button>
          <button 
            className={`flex justify-center p-2 ${isVote ? 'bg-vote-btn' : 'bg-comment-input'} rounded-full w-[80px]`}
            onClick={handleVoteToggle}
          >
            <Image
              src="/images/post/vote.svg"
              alt="Vote Icon"
              width={25}
              height={25}
            ></Image>
          </button>
          <button className={`flex justify-center p-2 bg-comment-input rounded-full w-[80px]`}>
            <Image
              src="/images/post/application.svg"
              alt="Application Icon"
              width={25}
              height={25}
            ></Image>
          </button>
        </div>
        <button
          onClick= {handleSubmit}
          className="bg-confirm-btn text-white py-2 px-8 rounded-full shadow-md text-[16px] hover:bg-orange-600 focus:outline-none"
        >
          글작성
        </button>
      </div>
  );
};

