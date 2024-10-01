import { create } from 'zustand';


interface VoteState {
  vote: Post.VoteResponseDto;
  voteOptions: Post.VoteOptionDto[];
  totalVote: number; // 전체 투표수를 저장
  setVote: (voteData: Post.VoteResponseDto) => void;
  incrementVoteCount: (optionId: string) => void;
  decrementVoteCount: (optionId: string) => void;
  endVote: () => void;
  //addVoteUser: (optionId: string, user: VoteUserDto) => void;
  //removeVoteUser: (optionId: string, userId: string) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  vote: {
    voteId: '',
    title: '',
    allowAnonymous: false,
    allowMultiple: false,
    options: [],
    postId: '',
    isOwner: false,
    isEnd: false,
    hasVoted: false
  },
  voteOptions: [],
  totalVote: 0, // 초기값은 0

  setVote: (voteData: Post.VoteResponseDto) => {
    const totalVotes = voteData.options.reduce((total, option) => total + option.voteCount, 0);
    set({
      vote: voteData,
      voteOptions: voteData.options,
      totalVote: totalVotes,
    });
  },

  incrementVoteCount: (optionId: string) =>
    set((state) => {
      const newOptions = state.voteOptions.map((option) =>
        option.id === optionId
          ? { ...option, voteCount: option.voteCount + 1 }
          : option
      );
      const newTotalVote = newOptions.reduce((total, option) => total + option.voteCount, 0);
      return {
        voteOptions: newOptions,
        totalVote: newTotalVote,
      };
    }),

  // 특정 옵션에 대한 투표 수 감소
  decrementVoteCount: (optionId: string) =>
    set((state) => {
      const newOptions = state.voteOptions.map((option) =>
        option.id === optionId && option.voteCount > 0
          ? { ...option, voteCount: option.voteCount - 1 }
          : option
      );
      const newTotalVote = newOptions.reduce((total, option) => total + option.voteCount, 0);
      return {
        voteOptions: newOptions,
        totalVote: newTotalVote,
      };
    }),

  endVote: () => 
    set((state) => {
      state.vote
    }),

  /* // 특정 옵션에 투표한 사용자 추가
  addVoteUser: (optionId: string, user: VoteUserDto) =>
    set((state) => ({
      voteOptions: state.voteOptions.map((option) =>
        option.id === optionId
          ? { ...option, voteUsers: [...option.voteUsers, user] }
          : option
      ),
    })),*/
}));
