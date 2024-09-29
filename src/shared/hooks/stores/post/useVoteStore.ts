import { create } from 'zustand';


interface VoteState {
  vote: Post.VoteResponseDto;
  voteOptions: Post.VoteOptionDto[];
  totalVote: number; // 전체 투표수를 저장
  setVote: (voteData: Post.VoteResponseDto) => void;
  incrementVoteCount: (optionId: string) => void;
  decrementVoteCount: (optionId: string) => void;
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
    isEnd: false
  },
  voteOptions: [],
  totalVote: 0, // 초기값은 0

  // Vote 데이터를 받아와서 상태 설정 및 총 투표 수 계산
  setVote: (voteData: Post.VoteResponseDto) => {
    const totalVotes = voteData.options.reduce((total, option) => total + option.voteCount, 0);
    set({
      vote: voteData,
      voteOptions: voteData.options,
      totalVote: totalVotes, // 전체 투표수를 계산하여 저장
    });
  },

  // 특정 옵션에 대한 투표 수 증가
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

  /* // 특정 옵션에 투표한 사용자 추가
  addVoteUser: (optionId: string, user: VoteUserDto) =>
    set((state) => ({
      voteOptions: state.voteOptions.map((option) =>
        option.id === optionId
          ? { ...option, voteUsers: [...option.voteUsers, user] }
          : option
      ),
    })),

  // 특정 옵션에서 투표한 사용자 제거
  removeVoteUser: (optionId: string, userId: string) =>
    set((state) => ({
      voteOptions: state.voteOptions.map((option) =>
        option.id === optionId
          ? {
              ...option,
              voteUsers: option.voteUsers.filter(
                (user) => user.id !== userId
              ),
            }
          : option
      ),
    })), */
}));
