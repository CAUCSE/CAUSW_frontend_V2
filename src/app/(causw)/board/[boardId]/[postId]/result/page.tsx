"use client"
import { PreviousButton, useVoteStore } from "@/shared";
import { useVoteDetail } from "@/shared/hooks/stores/post/useVoteDetail";
import { LoadingComponent } from "@/entities";

const VoteStatusPage = () => {
  const {vote}=useVoteStore();
  const {loading}= useVoteDetail(vote.voteId);
  console.log(vote);

  if(loading) {
    return ( <LoadingComponent />);
  }
  return(
    <div className="h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton/>
      </div>
      <div className="h-full flex flex-col p-5 pt-14">
        <h1 className="text-[32px] mb-3">투표 현황</h1>
        {vote.options.map((option, index) => (
          <div key={index} className="mb-3">
            <h2 className="text-[28px] pb-3 border-b-comment-bw border-black">
              {`${option.optionName} - ${option.voteCount}명`}
            </h2>
            {!vote.allowAnonymous && (
              <div className="grid grid-cols-4 gap-2 border-b-comment-bw py-2 border-black border-dashed">
                {(option.voteUsers.length == 0) ? <div className="h-[50px]"></div>:''}
                {option.voteUsers.map((voter, voterIndex) => (
                  <span key={voterIndex} className="flex flex-row text-[20px]">
                    {`${voter.name}(${voter.studentId})`}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteStatusPage;