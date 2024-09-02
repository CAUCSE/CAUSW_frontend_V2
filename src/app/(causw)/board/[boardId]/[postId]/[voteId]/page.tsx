import { PreviousButton } from "@/shared";

interface VoterProps {
  name: string;
  id: string;
}

interface OptionResultProps {
  option: string;
  voters: VoterProps[];
};

interface VotingStatusProps {
  results: OptionResultProps[];
}

const defaultVoterInfos: VoterProps = 
{
  name: "홍길동",
  id: "2020**34",
};

const defaultOptionResultInfos_1: OptionResultProps =
{
  option: "1등",
  voters: [
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
  ],
};
const defaultOptionResultInfos_2: OptionResultProps =
{
  option: "2등",
  voters: [
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
  ],
};
const defaultOptionResultInfos_3: OptionResultProps =
{
  option: "3등",
  voters: [
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
    defaultVoterInfos,
  ],
};


const defaultVotingStatusInfos: VotingStatusProps = 
{ results: [
    defaultOptionResultInfos_1,
    defaultOptionResultInfos_2,
    defaultOptionResultInfos_3,
  ],
};

const VoteStatusPage = async (props: any) => {
  console.log(props.params.voteId);
  return(
    <div className="h-full w-full">
      <div className="w-full flex-col items-center">
        <PreviousButton/>
      </div>
      <div className="h-full flex flex-col p-5 pt-14">
        <h1 className="text-[32px] mb-3">투표 현황</h1>
        {defaultVotingStatusInfos.results.map((result, index) => (
          <div key={index} className="mb-3">
            <h2 className="text-[28px] pb-3 border-b-comment-bw border-black">{result.option}</h2>
            <div className="grid grid-cols-4 gap-2 border-b-comment-bw py-2 border-black border-dashed">
              {result.voters.map((voter, voterIndex) => (
                <span key={voterIndex} className="flex flex-row text-[20px]">
                  {`${voter.name}(${voter.id})`}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteStatusPage;